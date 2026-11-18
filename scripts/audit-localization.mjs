import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const output = path.resolve('localization-preview.local');
fs.mkdirSync(output, { recursive: true });
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=9224', `--user-data-dir=${path.join(output, 'profile')}`, 'about:blank',
], { windowsHide: true, stdio: 'ignore' });
chrome.on('error', error => { console.error(error); process.exitCode = 1; });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let socket;
let id = 0;
const pending = new Map();
const errors = [];
const interactionsOnly = process.argv.includes('--interactions-only');
const report = interactionsOnly ? JSON.parse(fs.readFileSync(path.join(output, 'report.json'), 'utf8')).report : [];
const diagnose = process.argv.includes('--diagnose');
try {
  let targets;
  for (let attempt = 0; attempt < 40; attempt++) {
    try { targets = await (await fetch('http://127.0.0.1:9224/json')).json(); break; } catch { await delay(250); }
  }
  assert.ok(targets, 'Headless browser must start');
  socket = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener('open', resolve); socket.addEventListener('error', reject); });
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) {
      const response = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) response?.reject(new Error(message.error.message)); else response?.resolve(message.result);
    }
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') errors.push(message.params.args.map(arg => arg.description || arg.value).join(' '));
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const callId = ++id;
    pending.set(callId, { resolve, reject });
    socket.send(JSON.stringify({ id: callId, method, params }));
  });
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || 'Evaluation failed');
    return result.result.value;
  };
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  const navigate = async (route, language) => {
    await evaluate('window.__auditNavigating = true');
    await send('Page.navigate', { url: `http://127.0.0.1:5173${route}?lang=${language}` });
    for (let attempt = 0; attempt < 80; attempt++) {
      let ready = false;
      try { ready = await evaluate(`!window.__auditNavigating && !!document.querySelector('main h1') && document.documentElement.lang === '${language}' && !document.querySelector('.sb-page-loader')`); } catch { /* Wait for the new document's execution context. */ }
      if (ready) break;
      await delay(100);
      if (attempt === 79) throw new Error(`Page did not render: ${route} (${language}) ${JSON.stringify(await evaluate('({url:location.href, text:document.body.innerText.slice(0,1800)})'))}; errors: ${JSON.stringify(errors)}`);
    }
    await evaluate('document.fonts.ready.then(() => true)');
    await evaluate("document.documentElement.style.scrollBehavior = 'auto'");
    await delay(200);
  };
  const screenshot = async name => {
    const result = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    fs.writeFileSync(path.join(output, `${name}.png`), Buffer.from(result.data, 'base64'));
  };
  const inspect = async (route, language, width) => {
    const result = await evaluate(`(() => {
      const root = document.documentElement;
      const outside = [...document.querySelectorAll('main *, footer *')].filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width && (rect.right > innerWidth + 3 || rect.left < -3) && !el.closest('.swiper, [class*="shape"], .ab-service_thumb_hover');
      }).slice(0, 8).map(el => el.className?.baseVal ?? el.className);
      const foreign = [];
      const walker = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const text = walker.currentNode.textContent.trim();
        if (/[A-Za-z]{3}/.test(text) && !/ILogic|FlowMate|Webflow|HTML|JavaScript|WCAG|WordPress|Adobe|Google|EcoBrand Solutions|@/.test(text)) foreign.push(text);
      }
      return { lang: root.lang, dir: root.dir, viewport: innerWidth, scrollWidth:root.scrollWidth, scrollX, overflow: root.scrollWidth > innerWidth + 2, outside, foreign: [...new Set(foreign)], heading: document.querySelector('main h1').innerText, font: getComputedStyle(document.body).fontFamily, fontReady: document.fonts.check('400 16px "IBM Plex Sans Arabic"') };
    })()`);
    assert.equal(result.lang, language);
    if (!diagnose) assert.equal(result.viewport, width, 'Layout viewport matches the device width');
    assert.equal(result.dir, language === 'ar' ? 'rtl' : 'ltr');
    if (language === 'ar') assert.ok(result.fontReady, 'Arabic font is loaded');
    report.push({ route, language, width, ...result });
    fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify({ report, errors }, null, 2));
    if (diagnose) {
      console.log(JSON.stringify(result));
      console.log(await evaluate(`JSON.stringify([...document.querySelectorAll('body *')].filter(el=> {const r=el.getBoundingClientRect(), b=document.body.getBoundingClientRect();return (r.width>b.width+5 || r.left < b.left-3 || r.right>b.right+3) && getComputedStyle(el).visibility !== 'hidden' && !el.closest('.swiper, [class*="shape"], .ab-search-bar');}).slice(0,35).map(el=>({tag:el.tagName, cls:el.className, width:el.getBoundingClientRect().width,left:el.getBoundingClientRect().left,right:el.getBoundingClientRect().right})))`));
      console.log(await evaluate(`(() => { document.documentElement.style.overflowX = 'hidden'; document.body.style.overflowX='hidden'; return new Promise(resolve=>setTimeout(()=>resolve({viewport:innerWidth, scroll:scrollX, body:document.body.getBoundingClientRect().toJSON()}),500)); })()`));
    }
  };

  const routes = diagnose ? ['/'] : ['/', '/about', '/servicePage', '/serviceDetails', '/projectPage', '/projectDetails', '/blogPage', '/blogDetails', '/blogClasic', '/contact', '/teamPage', '/teamDetails', '/testimonialPage', '/unknown'];
  for (const width of interactionsOnly ? [] : diagnose ? [390] : [1440, 390]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 960, deviceScaleFactor: 1, mobile: width < 600 });
    for (const language of diagnose ? ['ar'] : ['ar', 'en']) {
      for (const route of routes) {
        await navigate(route, language);
        await inspect(route, language, width);
        if (route === '/' && !diagnose) {
          await screenshot(`home-${language}-${width}`);
          if (language === 'ar') {
            await evaluate("document.querySelector('footer').scrollIntoView()");
            await delay(200);
            await screenshot(`footer-${width}`);
          }
        }
        if (route === '/contact' && language === 'ar') await screenshot(`contact-${width}`);
      }
      console.log(`Checked ${routes.length} routes: ${language}, ${width}px`);
    }
  }

  if (diagnose) { chrome.kill(); process.exit(0); }

  // Exercise a live switch rather than relying solely on direct URL navigation.
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 960, deviceScaleFactor: 1, mobile: true });
  await navigate('/contact', 'ar');
  await evaluate(`(() => { const input = document.querySelector('#NAME'); const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set; setter.call(input, 'اسم تجريبي'); input.dispatchEvent(new Event('input', { bubbles: true })); document.querySelector('.header-actions .language-switcher').click(); })()`);
  await delay(350);
  assert.equal(await evaluate('document.documentElement.lang'), 'en');
  assert.equal(await evaluate("document.querySelector('#NAME').value"), 'اسم تجريبي', 'Form input survives language switch');
  assert.equal(await evaluate("localStorage.getItem('ilogic-language')"), 'en');
  await evaluate("document.querySelector('.header-actions .language-switcher').click()");
  await delay(250);
  await evaluate("document.querySelector('.header-menu button').click()");
  await delay(350);
  await screenshot('mobile-menu-ar');
  assert.ok((await evaluate("document.querySelector('.ab-offcanvas nav a').href")).includes('lang=ar'));
  await evaluate("document.querySelector('.ab-offcanvas nav a').click()");
  await delay(400);
  assert.equal(await evaluate('document.documentElement.lang'), 'ar');
  assert.equal(await evaluate('location.pathname'), '/');
  await navigate('/', 'ar');
  assert.equal(await evaluate('document.documentElement.lang'), 'ar');
  for (let i = 0; i < 4; i++) {
    if (!(await evaluate("!!document.querySelector('.header-actions .language-switcher')"))) throw new Error(`Language switcher missing at switch ${i}: ${JSON.stringify(errors)}`);
    const expected = i % 2 === 0 ? 'en' : 'ar';
    await evaluate("document.querySelector('.header-actions .language-switcher').click()");
    for (let attempt = 0; attempt < 60; attempt++) {
      if (await evaluate(`document.documentElement.lang === '${expected}' && new URLSearchParams(location.search).get('lang') === '${expected}'`)) break;
      await delay(50);
    }
    assert.equal(await evaluate('document.documentElement.lang'), expected);
    await delay(150);
  }
  assert.equal(await evaluate('document.documentElement.lang'), 'ar');
  assert.equal(await evaluate("document.querySelectorAll('.title-anim .char').length"), 0, 'Arabic stays connected');
  assert.equal(await evaluate("document.querySelector('.swiper').dir"), 'rtl');
  await send('Emulation.setDeviceMetricsOverride', { width: 1024, height: 900, deviceScaleFactor: 1, mobile: false });
  await navigate('/', 'ar');
  await screenshot('tablet-ar');
  await inspect('/', 'ar', 1024);

  const issues = report.filter(row => row.overflow || (row.language === 'ar' && row.foreign.length));
  fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify({ report, errors, issues }, null, 2));
  console.log(JSON.stringify({ pages: report.length, runtimeErrors: errors, issues }, null, 2));
  assert.equal(errors.length, 0, 'No browser runtime errors');
  assert.equal(issues.length, 0, 'No untranslated copy or horizontal overflow');
} finally {
  socket?.close();
  chrome.kill();
}

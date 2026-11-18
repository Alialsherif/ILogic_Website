// Reproducible rendering of authored SVG/CSS and smaller copies of existing artwork.
// No image-generation service, photographs, or external application data are used.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { spawn, spawnSync } from 'node:child_process';

if ((process.env.HTTPS_PROXY || process.env.HTTP_PROXY) && !process.execArgv.includes('--use-env-proxy')) {
  const child = spawnSync(process.execPath, ['--use-env-proxy', process.argv[1]], { stdio:'inherit', windowsHide:true, env:{ ...process.env, NO_PROXY:[process.env.NO_PROXY,'127.0.0.1','localhost'].filter(Boolean).join(',') } });
  process.exit(child.status ?? 1);
}

fs.mkdirSync('public/fonts/site',{recursive:true});
let css='';
for (const family of ['ibm-plex-sans-arabic','kanit','teko']) {
  const root=path.resolve('node_modules/@fontsource',family);
  for (const weight of [400,500,600,700]) {
    const source=fs.readFileSync(path.join(root,weight+'.css'),'utf8');
    css+=source.replace(/url\(['"]?\.\/files\/([^)'"\s]+)['"]?\)/g,(_,name)=>{
      fs.copyFileSync(path.join(root,'files',name),path.join('public/fonts/site',name));
      return `url('/fonts/site/${name}')`;
    })+'\n';
  }
  fs.copyFileSync(path.join(root,'LICENSE'),`public/fonts/site/${family}-OFL.txt`);
}
fs.writeFileSync('public/fonts/site/fonts.css',css);
fs.writeFileSync('src/scss/_local-fonts.scss',css);
const metadata=JSON.parse(fs.readFileSync('src/assets/img/identity/dimensions.json','utf8'));
const artworkSettings={'hero-bg':[960,.65],'hero-wave':[280,.68],planet:[140,.68],'story-glow':[360,.55],ribbon:[220,.65],'services-glow':[500,.5],'process-left':[360,.55],'process-right':[420,.5],'process-planet':[140,.68],'footer-bg':[960,.65]};
const svg=fs.readFileSync('src/visuals/og-partners.svg','utf8');
const assetRoot=path.resolve('src/assets/img');
const server=http.createServer((req,res)=>{
  const url=new URL(req.url,'http://localhost');res.setHeader('Access-Control-Allow-Origin','*');
  if(url.pathname==='/'){res.setHeader('Content-Type','text/html; charset=utf-8');res.end(`<!doctype html><html><head><meta charset="utf-8"><style>${css}html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#090a07}</style></head><body>${svg}</body></html>`);return;}
  const root=url.pathname.startsWith('/fonts/')?path.resolve('public'):assetRoot;
  const file=path.resolve(root,'.'+decodeURIComponent(url.pathname));if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type',file.endsWith('.woff2')?'font/woff2':'image/png');fs.createReadStream(file).pipe(res);
});
await new Promise(resolve=>server.listen(4193,'127.0.0.1',resolve));
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--disable-gpu','--hide-scrollbars','--no-first-run','--no-default-browser-check','--remote-debugging-port=9243',`--user-data-dir=${path.resolve('identity-preview.local/og-profile')}`,'about:blank'],{windowsHide:true,stdio:'ignore'});
let socket,id=0;const pending=new Map();const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
try{
  let targets;for(let n=0;n<60;n++){try{targets=await(await fetch('http://127.0.0.1:9243/json')).json();break;}catch{await delay(150);}}
  if(!targets)throw new Error('Browser unavailable');socket=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(resolve=>socket.addEventListener('open',resolve));
  socket.addEventListener('message',({data})=>{const result=JSON.parse(data);if(result.id){const p=pending.get(result.id);pending.delete(result.id);if(result.error)p?.reject(new Error(result.error.message));else p?.resolve(result.result);}});
  const send=(method,params={})=>new Promise((resolve,reject)=>{const call=++id;pending.set(call,{resolve,reject});socket.send(JSON.stringify({id:call,method,params}));});
  const evaluate=async expression=>{const result=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(result.exceptionDetails)throw new Error(result.exceptionDetails.exception?.description||'Rendering failed');return result.result.value;};
  await send('Page.enable');await send('Emulation.setDeviceMetricsOverride',{width:1200,height:630,deviceScaleFactor:1,mobile:false});await send('Page.navigate',{url:'http://127.0.0.1:4193/'});
  for(let n=0;n<80;n++){if(await evaluate('document.readyState==="complete"&&!!document.querySelector("svg")'))break;await delay(100);}
  await evaluate('Promise.all([document.fonts.load(\'600 72px "IBM Plex Sans Arabic"\',"برنامج شركاء"),document.fonts.load("600 56px Kanit","ILogic")]).then(()=>document.fonts.ready).then(()=>true)');
  const shot=await send('Page.captureScreenshot',{format:'png'});
  const og=await evaluate(`(async()=>{const img=new Image();img.src='data:image/png;base64,${shot.data}';await img.decode();const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=630;canvas.getContext('2d').drawImage(img,0,0);return canvas.toDataURL('image/webp',.9).split(',')[1];})()`);
  fs.mkdirSync('public/images',{recursive:true});fs.writeFileSync('public/images/og-partners.webp',Buffer.from(og,'base64'));
  fs.mkdirSync('src/assets/img/identity/compact',{recursive:true});const optimized={};
  for(const [name,[maxWidth,quality]]of Object.entries(artworkSettings)){
    const source=metadata[name].source;
    const result=await evaluate(`(async()=>{const img=new Image();img.src=${JSON.stringify('http://127.0.0.1:4193/'+source)};await img.decode();const scale=Math.min(1,${maxWidth}/img.naturalWidth);const canvas=document.createElement('canvas');canvas.width=Math.round(img.naturalWidth*scale);canvas.height=Math.round(img.naturalHeight*scale);canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);return{width:canvas.width,height:canvas.height,data:canvas.toDataURL('image/webp',${quality}).split(',')[1]};})()`);
    const bytes=Buffer.from(result.data,'base64');fs.writeFileSync(`src/assets/img/identity/compact/${name}.webp`,bytes);optimized[name]={width:result.width,height:result.height,bytes:bytes.length};
  }
  fs.writeFileSync('src/assets/img/identity/compact/manifest.json',JSON.stringify(optimized,null,2)+'\n');
  console.log(JSON.stringify({og:{width:1200,height:630,bytes:fs.statSync('public/images/og-partners.webp').size},compactArtworkBytes:Object.values(optimized).reduce((sum,item)=>sum+item.bytes,0),fontFiles:fs.readdirSync('public/fonts/site').filter(name=>name.endsWith('.woff2')).length}));
}finally{socket?.close();chrome.kill();await new Promise(resolve=>server.close(resolve));}

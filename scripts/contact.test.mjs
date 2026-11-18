import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createServer } from 'vite';
import ar from '../src/i18n/contact.ar.json' with {type:'json'};
import en from '../src/i18n/contact.en.json' with {type:'json'};
import { translate } from '../src/i18n/locale.js';
import { contactLocation, contactWhatsAppNumber, validateContactField, composeContactMessage, contactWhatsAppUrl } from '../src/data/contactDetails.js';
import { buildContactMetadata } from '../src/seo/contactSeo.js';

test('contact copy and metadata use the supplied Egyptian address in both languages',()=>{
  assert.deepEqual(Object.keys(ar).sort(),Object.keys(en).sort());
  for(const [language,copy] of [['ar',ar],['en',en]]) {
    for(const [key,value] of Object.entries(copy))assert.equal(translate(key,language),value);
    const meta=buildContactMetadata(language);assert(meta.title.length<=60&&meta.description.length<=160);
    assert(meta.canonical.endsWith('/contact'+(language==='en'?'?lang=en':'')));
    assert(meta.schema['@graph'].some(item=>item['@type']==='ContactPage'));
    assert(!meta.schema['@graph'].some(item=>item['@type']==='FAQPage'));
    assert.equal(meta.schema['@graph'][0].address.addressCountry,'EG');
  }
  assert(contactLocation.mapEmbed.includes('0x145855cfd0bffde1%3A0xf8b422053377b0f8'));
  assert(contactLocation.mapEmbed.includes('!2d30.9301785755495!3d29.93536207497871'));
  assert.equal(new URL(contactLocation.mapLink).searchParams.get('cid'),BigInt('0xf8b422053377b0f8').toString());
});

test('message validation and WhatsApp preparation do not imply delivery or require an email',()=>{
  assert(validateContactField('name',''));assert(validateContactField('message','short'));assert(validateContactField('email','wrong'));
  assert.equal(validateContactField('email',''),'');assert.equal(validateContactField('message','A project with clear requirements.'),'');
  const values={name:'Test Name',email:'test@example.com',message:'Question with & and ? and Arabic: مرحبًا'};
  const message=composeContactMessage(values,key=>ar[key],'أمان المواقع والأنظمة');
  const social=JSON.parse(fs.readFileSync('public/social-links.json','utf8'));
  const url=new URL(contactWhatsAppUrl(social.whatsapp,message));
  assert.equal(url.searchParams.get('text'),message);assert.equal(url.pathname,new URL(social.whatsapp).pathname);
  assert.equal(contactWhatsAppNumber(social.whatsapp),'+'+url.pathname.slice(1));
  assert.equal(contactWhatsAppUrl('javascript:alert(1)',message),'');
});

test('contact SSR contains the real map, working compose fields and configured contact without template data',async()=>{
  const server=await createServer({server:{middlewareMode:true},appType:'custom',logLevel:'error'});
  try {
    const {renderContact}=await server.ssrLoadModule('/src/entry-server.jsx');
    const social=JSON.parse(fs.readFileSync('public/social-links.json','utf8'));
    for(const language of ['ar','en']) {
      const html=renderContact(language,social),copy=language==='ar'?ar:en;
      assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1);
      assert(html.includes('id="contact-form"')&&html.includes('id="contact-map"'));
      assert(html.includes('referrerPolicy="strict-origin-when-cross-origin"')||html.includes('referrerpolicy="strict-origin-when-cross-origin"'));
      assert(html.includes(copy['contact.address.street'])&&html.includes(copy['contact.address.city']));
      assert(html.includes(social.whatsapp));assert.match(html,/autocomplete="name"/i);
      assert.doesNotMatch(html,/Envato|144\.953735|37\.817327|nited@|\(528\)|Initial text content|contact\.hero\./);
    }
  } finally {await server.close();}
});

import test from 'node:test';
import assert from 'node:assert/strict';
import ar from '../src/i18n/partner-form.ar.json' with { type: 'json' };
import en from '../src/i18n/partner-form.en.json' with { type: 'json' };
import { translate } from '../src/i18n/locale.js';
import { PARTNER_DRAFT_KEY, emptyPartnerForm, normalizeWhatsApp, isWebUrl, validatePartnerField, validatePartnerStep, validatePartnerFiles, restorePartnerDraft, persistPartnerDraft } from '../src/data/partnerForm.js';

test('form copy is complete and localized in both languages', () => {
  assert.deepEqual(Object.keys(ar).sort(),Object.keys(en).sort());
  for(const key of Object.keys(ar)) for(const language of ['ar','en']) assert.equal(translate(key,language),(language==='ar'?ar:en)[key]);
});
test('step validation requires real demo details and normalizes international phone formats', () => {
  assert.equal(Object.keys(validatePartnerStep(emptyPartnerForm,0)).length,4);
  assert.equal(normalizeWhatsApp('٠٠٢٠ (١٠٠) ١٢٣-٤٥٦٧'),'+201001234567');
  assert.equal(validatePartnerField('whatsapp','+20 100 123 4567'),'');
  assert(validatePartnerField('whatsapp','01001234567'));
  assert(validatePartnerField('email','nited@infor@gmail.com'));
  assert(validatePartnerField('fullName','A'));assert(validatePartnerField('systemName','a'.repeat(81)));
  for(const value of ['javascript:alert(1)','ftp://example.com','https://user:password@example.com']) assert(!isWebUrl(value));
  for(const value of ['http://example.com/demo','https://example.com/video']) assert(isWebUrl(value));
  assert.equal(validatePartnerField('problem','A'.repeat(30)),'');assert(validatePartnerField('problem','A'.repeat(29)));assert(validatePartnerField('differentiator','A'.repeat(801)));
  assert(validatePartnerField('systemStage','idea-only'));assert(validatePartnerField('consent',false));
  assert.equal(validatePartnerField('consent',true),'');
});
test('file selection rejects excessive count, size, empty and unsupported files', () => {
  const valid={name:'system.pdf',type:'application/pdf',size:1024};
  assert.equal(validatePartnerFiles([valid]),'');
  assert(validatePartnerFiles(Array(4).fill(valid)));
  assert(validatePartnerFiles([{...valid,size:10*1024*1024+1}]));
  assert(validatePartnerFiles([{...valid,size:0}]));
  assert(validatePartnerFiles([{...valid,name:'system.exe',type:'application/octet-stream'}]));
  assert(validatePartnerFiles([{...valid,name:'picture.jpg'}]));
});
test('session draft is bounded, retains steps and excludes honeypot and unrecognized data', () => {
  const data=new Map();const storage={getItem:key=>data.get(key),setItem:(key,value)=>data.set(key,value)};
  persistPartnerDraft(storage,{step:2,hadFiles:true,values:{...emptyPartnerForm,fullName:'Draft user',company_website:'bot',unknown:'not persisted'}});
  const saved=restorePartnerDraft(storage);
  assert.equal(saved.step,2);assert.equal(saved.values.fullName,'Draft user');assert(saved.hadFiles);
  assert(!data.get(PARTNER_DRAFT_KEY).includes('company_website'));assert(!data.get(PARTNER_DRAFT_KEY).includes('unknown'));
  data.set(PARTNER_DRAFT_KEY,'not json');assert.equal(restorePartnerDraft(storage).step,0);
  const blocked={getItem(){throw new Error('blocked');},setItem(){throw new Error('blocked');}};
  assert.deepEqual(restorePartnerDraft(blocked).values,emptyPartnerForm);
  assert.doesNotThrow(()=>persistPartnerDraft(blocked,{values:emptyPartnerForm,step:0}));
});

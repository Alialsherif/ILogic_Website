import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createServer } from 'vite';
import ar from '../src/i18n/projects.ar.json' with { type: 'json' };
import en from '../src/i18n/projects.en.json' with { type: 'json' };
import { buildProjectsMetadata } from '../src/seo/projectsSeo.js';
import { projects } from '../src/data/homeContent.js';
import { menuItems, navigationCurrent } from '../src/data/navigation.js';
import { translate } from '../src/i18n/locale.js';

test('projects copy, canonical and navigation are complete without publishing deferred pages', () => {
  assert.deepEqual(Object.keys(ar).sort(),Object.keys(en).sort());
  for(const [language,copy] of [['ar',ar],['en',en]]) {
    for(const [key,value] of Object.entries(copy)) assert.equal(translate(key,language),value);
    const meta=buildProjectsMetadata(language);
    assert(meta.title.length<=60&&meta.description.length<=160);
    assert.equal(meta.canonical,'https://ai-logika.web.app/projects'+(language==='en'?'?lang=en':''));
    assert(meta.schema['@graph'].some(item=>item['@type']==='CollectionPage'));
    assert(!meta.schema['@graph'].some(item=>['FAQPage','Offer','Review','AggregateRating'].includes(item['@type'])));
  }
  assert(!menuItems.some(item=>/blog|projectDetails/.test(item.link)));
  const entry=menuItems.find(item=>item.link==='/projects');assert(entry);
  assert.equal(navigationCurrent('/projects',entry),'page');assert.equal(navigationCurrent('/projectPage',entry),'location');
});

test('projects SSR shows actual projects and media with no template, blog or detail links', async () => {
  const server=await createServer({server:{middlewareMode:true},appType:'custom',logLevel:'error'});
  try {
    const {renderProjects}=await server.ssrLoadModule('/src/entry-server.jsx');
    const social=JSON.parse(fs.readFileSync('public/social-links.json','utf8'));
    for(const language of ['ar','en']) {
      const html=renderProjects(language,social);
      assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1);
      for(const project of projects) {assert(html.includes(`data-project="${project.key}"`));if(project.href)assert(html.includes(`href="${project.href}"`));}
      assert.equal((html.match(/class="home-laptop-screen"/g)||[]).length,3);
      assert(html.includes('/videos/home/laptop_transparent.webm'));
      assert(!html.includes('projects-filters'));
      assert.doesNotMatch(html, /FlowMate|Mobile App Interface Design|href="[^"<>]*(?:blogPage|blogDetails|projectDetails)|\bprojects\.[a-zA-Z]/);
    }
  } finally {await server.close();}
});

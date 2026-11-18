import test from 'node:test';
import assert from 'node:assert/strict';
import { translate, initialLanguage, localizedDestination, LANGUAGE_STORAGE_KEY } from '../src/i18n/locale.js';

test('Arabic copy is concise; inline whitespace and technical names survive', () => {
  assert.equal(translate('LET’S TALK', 'ar'), 'تواصل معنا');
  assert.equal(translate('  NEXT PROJECT ', 'ar'), ' مشروعك القادم ');
  assert.equal(translate('Webflow', 'ar'), 'Webflow');
  assert.equal(translate('CREATIVE', 'en'), 'CREATIVE');
  for (const value of [null, undefined, 4.3, { type: 'svg' }]) assert.equal(translate(value, 'ar'), value);
});

test('internal navigation retains language, existing parameters and hash', () => {
  assert.equal(localizedDestination('/about', 'ar'), '/about?lang=ar');
  assert.equal(localizedDestination('/contact?source=hero&lang=en#form', 'ar'), '/contact?source=hero&lang=ar#form');
  assert.equal(localizedDestination('servicePage', 'en'), 'servicePage?lang=en');
  assert.deepEqual(localizedDestination({ pathname: '/about', search: '?source=nav', hash: '#team' }, 'en'), { pathname: '/about', search: '?source=nav&lang=en', hash: '#team' });
  for (const to of ['#!', '#team', 'https://example.com', '//example.com', 'mailto:hello@example.com', 'tel:+201234']) assert.equal(localizedDestination(to, 'ar'), to);
});

test('URL language wins over saved preference; invalid inputs and blocked storage are safe', () => {
  globalThis.localStorage = { getItem: key => key === LANGUAGE_STORAGE_KEY ? 'en' : null };
  assert.equal(initialLanguage('?lang=ar'), 'ar');
  assert.equal(initialLanguage('?source=mail'), 'en');
  assert.equal(initialLanguage('?lang=unsupported'), 'en');
  globalThis.localStorage = { getItem() { throw new Error('Storage unavailable'); } };
  assert.equal(initialLanguage(''), 'ar');
  assert.equal(initialLanguage('?lang=en'), 'en');
  delete globalThis.localStorage;
});

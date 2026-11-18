import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// Keep every template rule; trim only unused generated numeric spacing utilities.
const spacingTokens = new Set(fs.readdirSync('src', { recursive:true }).filter(file => /\.(jsx?|json)$/.test(file) && !file.startsWith('assets')).flatMap(file => fs.readFileSync(path.join('src',file),'utf8').match(/\b(?:m[trblxy]?|p[trblxy]?)(?:-(?:sm|md|lg|xl|xxl))?-\d+\b/g) || []));
const trimUnusedSpacing = {
  postcssPlugin:'ilogic-unused-spacing',
  Once(root) { root.walkRules(rule => {
    const selectors = rule.selectors.filter(selector => { const match = selector.match(/^\.((?:m[trblxy]?|p[trblxy]?)(?:-(?:sm|md|lg|xl|xxl))?-\d+)$/); return !match || spacingTokens.has(match[1]); });
    if (!selectors.length) rule.remove(); else rule.selectors = selectors;
  }); },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: { postcss: { plugins:[trimUnusedSpacing] } },
  build: { manifest: true },
  server: {
    watch: { ignored: ['**/*.local/**'] },
  },
})

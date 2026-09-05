import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const read = relativePath => fs.readFileSync(path.join(ROOT_DIR, relativePath), 'utf8');

function walkTextFiles(directory) {
  const results = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkTextFiles(fullPath));
    } else if (/\.(?:html|css|js|mjs|json|jsonc|md|txt|xml)$/.test(entry.name) || entry.name === '_headers') {
      results.push(fullPath);
    }
  }
  return results;
}

describe('JAMTRAC website verification', () => {
  test('required deployment files exist and are non-empty', () => {
    const requiredFiles = [
      'public/index.html',
      'public/style.css',
      'public/script.js',
      'public/404.html',
      'public/_headers',
      'public/robots.txt',
      'public/sitemap.xml',
      'public/assets/favicon.svg',
      'README.md',
      'wrangler.jsonc'
    ];

    assert.ok(fs.statSync(PUBLIC_DIR).isDirectory(), 'public/ must be a directory');
    for (const relativePath of requiredFiles) {
      const fullPath = path.join(ROOT_DIR, relativePath);
      assert.ok(fs.existsSync(fullPath), `${relativePath} must exist`);
      assert.ok(fs.statSync(fullPath).size > 0, `${relativePath} must not be empty`);
    }
  });

  test('homepage contains confirmed identity, sections, services, and workflow', () => {
    const html = read('public/index.html');
    const requiredText = [
      'JAMTRAC Inc.',
      'We Are Doctors in Services',
      'Integrity',
      'Progress',
      'Innovation',
      'Remodeling',
      'Construction',
      'Finishing',
      'Repairs',
      'Property Services',
      'Project Management',
      'Request',
      'Assessment',
      'Estimate',
      'Approval',
      'Work',
      'Completion'
    ];
    const sectionIds = ['hero', 'about', 'services', 'how-we-work', 'values', 'gallery', 'request-service', 'contact'];

    for (const value of requiredText) assert.ok(html.includes(value), `homepage must include ${value}`);
    for (const id of sectionIds) assert.ok(html.includes(`id="${id}"`), `homepage must include #${id}`);
    assert.ok(html.includes('<header') && html.includes('<footer'), 'homepage must include header and footer');
  });

  test('canonical metadata and Organization JSON-LD are valid', () => {
    const html = read('public/index.html');
    assert.match(html, /<link rel="canonical" href="https:\/\/jamtracproperties\.us\/"\s*\/>/);
    assert.match(html, /<meta name="description" content="[^"]+"\s*\/>/);
    assert.ok(!/<meta[^>]+name="robots"[^>]+noindex/i.test(html), 'homepage must not use noindex');

    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert.ok(jsonLdMatch, 'Organization JSON-LD must exist');
    const data = JSON.parse(jsonLdMatch[1]);
    assert.equal(data['@type'], 'Organization');
    assert.equal(data.url, 'https://jamtracproperties.us/');
    assert.equal(data.name, 'JAMTRAC Inc.');
    assert.equal(data.address, undefined, 'unverified address must not be present');
    assert.equal(data.telephone, undefined, 'unverified telephone must not be present');
  });

  test('robots and sitemap use only the canonical homepage', () => {
    const robots = read('public/robots.txt');
    const sitemap = read('public/sitemap.xml');
    assert.match(robots, /User-agent: \*/);
    assert.match(robots, /Allow: \//);
    assert.match(robots, /Sitemap: https:\/\/jamtracproperties\.us\/sitemap\.xml/);
    assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]), [
      'https://jamtracproperties.us/'
    ]);
  });

  test('incorrect domains and unrelated branding are absent from repository text', () => {
    const combined = walkTextFiles(ROOT_DIR).map(file => fs.readFileSync(file, 'utf8')).join('\n');
    const incorrectDomain = ['jamtrac', 'properties', 'us'].join('.');
    assert.ok(!combined.includes(incorrectDomain), 'old domain must be absent');
    const unrelatedNames = [
      ['2', 'ks', 'grant', 'family'].join(''),
      ['2', 'ks', ' hos'].join('')
    ];
    for (const name of unrelatedNames) {
      assert.ok(!combined.toLowerCase().includes(name), 'family-system branding must be absent');
    }
  });

  test('unconnected request interface is visibly and technically disabled', () => {
    const html = read('public/index.html');
    const js = read('public/script.js');
    assert.match(html, /<fieldset disabled>/);
    assert.ok(html.includes('Information entered here cannot be sent or saved.'));
    const misleadingConfirmations = [
      ['details', 'have', 'been', 'received'].join(' '),
      ['request', 'has', 'been', 'received'].join(' ')
    ];
    for (const message of misleadingConfirmations) {
      assert.ok(!`${html}\n${js}`.toLowerCase().includes(message));
    }
    assert.ok(!/fetch\s*\(|XMLHttpRequest|localStorage|sessionStorage/i.test(js));
  });

  test('security headers allow local assets and do not block indexing', () => {
    const headers = read('public/_headers');
    assert.ok(headers.includes("default-src 'self'"));
    assert.ok(headers.includes("script-src 'self'"));
    assert.ok(headers.includes("style-src 'self'"));
    assert.ok(headers.includes("form-action 'none'"));
    assert.ok(!/X-Robots-Tag:\s*noindex/i.test(headers));
  });

  test('404 page is non-indexable and returns visitors to canonical paths', () => {
    const html = read('public/404.html');
    assert.ok(html.includes('Page Not Found'));
    assert.match(html, /<meta name="robots" content="noindex, follow"\s*\/>/);
    assert.ok(html.includes('href="/"'));
    assert.ok(html.includes('href="/#services"'));
  });

  test('Cloudflare Pages configuration points to public', () => {
    const config = JSON.parse(read('wrangler.jsonc'));
    assert.equal(config.name, 'jamtrac');
    assert.equal(config.pages_build_output_dir, './public');
  });

  test('temporary favicon is not represented as approved official artwork', () => {
    const readme = read('README.md');
    assert.ok(readme.includes('Temporary site favicon'));
    assert.ok(!/favicon\.svg\s+# Official/i.test(readme));
  });
});

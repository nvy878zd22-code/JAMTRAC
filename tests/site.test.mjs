import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

describe('JAMTRAC Inc. Website Verification', () => {
  test('Required directory and file structure exists', () => {
    assert.ok(fs.existsSync(PUBLIC_DIR), 'public/ directory must exist');
    assert.ok(fs.statSync(PUBLIC_DIR).isDirectory(), 'public/ must be a directory');

    const requiredFiles = [
      'public/index.html',
      'public/style.css',
      'public/script.js',
      'public/404.html',
      'public/_headers',
      'public/assets/favicon.svg',
      'README.md'
    ];

    for (const relPath of requiredFiles) {
      const fullPath = path.join(ROOT_DIR, relPath);
      assert.ok(fs.existsSync(fullPath), `File ${relPath} must exist`);
      assert.ok(fs.statSync(fullPath).size > 0, `File ${relPath} must not be empty`);
    }
  });

  test('public/index.html includes business identity and motto', () => {
    const html = fs.readFileSync(path.join(PUBLIC_DIR, 'index.html'), 'utf-8');

    assert.ok(html.includes('JAMTRAC Inc.'), 'Must contain company name "JAMTRAC Inc."');
    assert.ok(html.includes('We Are Doctors in Services'), 'Must contain public motto "We Are Doctors in Services"');
    assert.ok(html.includes('jamtrac.properties.us'), 'Must contain official domain "jamtrac.properties.us"');
    assert.ok(html.includes('Integrity'), 'Must contain core value "Integrity"');
    assert.ok(html.includes('Progress'), 'Must contain core value "Progress"');
    assert.ok(html.includes('Innovation'), 'Must contain core value "Innovation"');
  });

  test('public/index.html includes all 10 required sections', () => {
    const html = fs.readFileSync(path.join(PUBLIC_DIR, 'index.html'), 'utf-8');

    // 1. Header and navigation
    assert.ok(html.includes('<header') && html.includes('main-nav'), '1. Header and navigation must exist');
    // 2. Hero section
    assert.ok(html.includes('id="hero"'), '2. Hero section must exist');
    // 3. About JAMTRAC
    assert.ok(html.includes('id="about"'), '3. About section must exist');
    // 4. Services
    assert.ok(html.includes('id="services"'), '4. Services section must exist');
    // 5. How We Work
    assert.ok(html.includes('id="how-we-work"'), '5. How We Work section must exist');
    // 6. Core Values
    assert.ok(html.includes('id="values"'), '6. Core Values section must exist');
    // 7. Project Gallery placeholder
    assert.ok(html.includes('id="gallery"'), '7. Project Gallery placeholder must exist');
    // 8. Request Service section
    assert.ok(html.includes('id="request-service"') && html.includes('form'), '8. Request Service section must exist');
    // 9. Contact section
    assert.ok(html.includes('id="contact"'), '9. Contact section must exist');
    // 10. Footer
    assert.ok(html.includes('<footer'), '10. Footer must exist');
  });

  test('public/index.html includes all 6 core service areas', () => {
    const html = fs.readFileSync(path.join(PUBLIC_DIR, 'index.html'), 'utf-8');
    const services = [
      'Remodeling',
      'Construction',
      'Finishing',
      'Repairs',
      'Property Services',
      'Project Management'
    ];

    for (const service of services) {
      assert.ok(html.includes(service), `Service "${service}" must be present in index.html`);
    }
  });

  test('public/index.html includes all 6 steps in How We Work', () => {
    const html = fs.readFileSync(path.join(PUBLIC_DIR, 'index.html'), 'utf-8');
    const steps = [
      'Request',
      'Assessment',
      'Estimate',
      'Approval',
      'Work',
      'Completion'
    ];

    for (const step of steps) {
      assert.ok(html.includes(step), `Workflow step "${step}" must be present in index.html`);
    }
  });

  test('Branding compliance: No unrelated branding or fake contact details', () => {
    const html = fs.readFileSync(path.join(PUBLIC_DIR, 'index.html'), 'utf-8');
    const css = fs.readFileSync(path.join(PUBLIC_DIR, 'style.css'), 'utf-8');
    const js = fs.readFileSync(path.join(PUBLIC_DIR, 'script.js'), 'utf-8');
    const readme = fs.readFileSync(path.join(ROOT_DIR, 'README.md'), 'utf-8');

    const combined = `${html}\n${css}\n${js}\n${readme}`;

    assert.ok(!combined.toLowerCase().includes('2ks'), 'Must not contain 2Ks branding');
    assert.ok(!combined.toLowerCase().includes('2ksgrantfamily'), 'Must not contain 2KsGrantFamily branding');
    assert.ok(!combined.toLowerCase().includes('555-'), 'Must not contain fake 555- phone numbers');
    assert.ok(!combined.includes('example.com'), 'Must not contain fake placeholder emails');

    assert.ok(html.includes('Contact information coming soon.'), 'Must use neutral contact notice wording');
  });

  test('public/404.html contains proper 404 message and navigation links', () => {
    const errorHtml = fs.readFileSync(path.join(PUBLIC_DIR, '404.html'), 'utf-8');

    assert.ok(errorHtml.includes('404'), '404 page must display 404 code');
    assert.ok(errorHtml.includes('Page Not Found'), '404 page must display Page Not Found');
    assert.ok(errorHtml.includes('index.html'), '404 page must link back to home');
    assert.ok(errorHtml.includes('JAMTRAC Inc.'), '404 page must have JAMTRAC Inc. branding');
  });

  test('public/_headers contains required security headers', () => {
    const headers = fs.readFileSync(path.join(PUBLIC_DIR, '_headers'), 'utf-8');

    assert.ok(headers.includes('X-Frame-Options: DENY'), 'Must include X-Frame-Options');
    assert.ok(headers.includes('X-Content-Type-Options: nosniff'), 'Must include X-Content-Type-Options');
    assert.ok(headers.includes('Referrer-Policy: strict-origin-when-cross-origin'), 'Must include Referrer-Policy');
    assert.ok(headers.includes('Content-Security-Policy'), 'Must include Content-Security-Policy');
  });

  test('README.md includes local preview and Cloudflare deployment instructions', () => {
    const readme = fs.readFileSync(path.join(ROOT_DIR, 'README.md'), 'utf-8');

    assert.ok(readme.includes('Local Development & Preview') || readme.includes('preview'), 'Must include preview instructions');
    assert.ok(readme.includes('Cloudflare Pages Deployment') || readme.includes('Cloudflare'), 'Must include Cloudflare deployment instructions');
    assert.ok(readme.includes('jamtrac.properties.us'), 'Must include domain in README');
  });
});

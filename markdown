# JAMTRAC Deployment Guide

## Platform

JAMTRAC is designed to deploy through Cloudflare using Wrangler.

The public website is served from:

`./public`

The website entry point is:

`public/index.html`

---

## Repository Structure

The important deployment files at the repository root are:

- `package.json`
- `wrangler.jsonc`
- `public/`

The Wrangler configuration points Cloudflare to:

`./public`

---

## Install

From the JAMTRAC repository:

```bash
npm install
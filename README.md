# JAMTRAC Inc.

> **“We Are Doctors in Services”**

Official public website for **JAMTRAC Inc.**, providing professional solutions across remodeling, construction, finishing, repairs, property services, and project management.

- **Official Web Portal:** [jamtrac.properties.us](https://jamtrac.properties.us)
- **Core Values:** Integrity · Progress · Innovation

---

## Repository Structure

The website is architected as a clean, responsive static site ready for immediate deployment to **Cloudflare Pages**:

```text
JAMTRAC/
├── README.md              # Project overview and deployment guide
└── public/                # Cloudflare Pages publish directory
    ├── 404.html           # Branded 404 Not Found error page
    ├── _headers           # Security & caching headers for Cloudflare Pages
    ├── index.html         # Main single-page application entry point
    ├── script.js          # Interactive UI and form feedback scripts
    ├── style.css          # Responsive styling and CSS variables
    └── assets/            # Static assets and favicons
        └── favicon.svg    # Official JAMTRAC vector icon
```

---

## Local Development & Preview

You can preview the site locally using any lightweight static web server.

### Option 1: Python HTTP Server (Zero Dependencies)

```bash
# Serve the public directory on port 8080
python3 -m http.server 8080 --directory public
```
Open [http://localhost:8080](http://localhost:8080) in your web browser.

### Option 2: Node.js (npx serve)

```bash
npx serve public -p 8080
```
Open [http://localhost:8080](http://localhost:8080) in your web browser.

### Option 3: Cloudflare Wrangler CLI

```bash
npx wrangler pages dev public
```

---

## Cloudflare Pages Deployment

### Method A: Git Integration (Recommended)

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the `nvy878zd22-code/JAMTRAC` repository.
4. Set up the build configuration:
   - **Framework preset:** `None`
   - **Build command:** *(Leave empty)*
   - **Build output directory:** `public`
   - **Production branch:** `main`
5. Click **Save and Deploy**.

### Method B: Wrangler CLI Deployment

To deploy directly from your local terminal using Cloudflare Wrangler:

```bash
# Deploy to Cloudflare Pages
npx wrangler pages deploy public --project-name=jamtrac
```

### Custom Domain Configuration

To link the official domain `jamtrac.properties.us`:
1. In the Cloudflare Pages project settings, go to **Custom domains**.
2. Add `jamtrac.properties.us`.
3. Follow the DNS verification steps to route traffic to the Pages deployment.

---

## Branding & Content Guidelines

- **Company Name:** JAMTRAC Inc.
- **Motto:** “We Are Doctors in Services”
- **Business Areas:** Remodeling, Construction, Finishing, Repairs, Property Services, Project Management.
- **Brand Separation:** JAMTRAC is maintained independently with dedicated branding and identity.
- **Contact Inquiries:** Contact information is provided via the official portal and request forms; where specific direct channels are not yet active, neutral status notices are used.
 

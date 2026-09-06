JAMTRAC — COMPLETE STATIC WEBSITE / 6 SEPTEMBER 2026

CONTENTS
Home, About, Services, Photos, Contact, a 404 page, responsive CSS,
vanilla JavaScript, all three original brand images, Pages headers and redirects.
No dependencies, build step, Worker runtime, credentials or external asset URLs.
Photos and public contact details remain unpublished because no verified project
photos, telephone number or public email were available. No submission form or
login claims to work. This is the public static foundation.

CLOUDFLARE DIRECT UPLOAD
Use JAMTRAC-Cloudflare-Upload.zip (inside this package). Its index.html is at the
ZIP root, alongside every asset. Upload that ZIP to a Pages Direct Upload project.
Do not upload this outer complete-package ZIP to Pages.

EXISTING GITHUB-CONNECTED PAGES PROJECT
Upload the included public folder and README.md to the repository root.
Production branch: main. Framework preset: None. Build command: blank.
Build output directory: public. The ZIP itself must not be used as the GitHub
website source; GitHub needs the extracted public files.
Cloudflare's dashboard cannot drag-and-drop into an existing Git-integrated
Pages project. Updating the linked repository triggers its configured deployment.
An authenticated CLI alternative is:
npx wrangler pages deploy public --project-name YOUR_EXISTING_PAGES_PROJECT
Replace the project name with its exact Cloudflare value.

DOMAIN
Earlier DNS records identify jamtracproperties.us (no k). The current request
spells jamtrackproperties.us. All site links are relative, so either host works
when attached to the correct Pages project. No DNS or redirect changes were made.
Confirm the domain in Pages > Custom domains before adding canonical URLs and
a sitemap. Keep existing email DNS records intact.

SOURCE AND STATUS
Rebuilt the public foundation using the recovered JAMTRAC brand assets and
confirmed service categories. Older demo management files are not part of this
public release. The live GitHub main source could not be recovered from the
expected public/index.html or README.md paths at initial inspection.
This package is prepared locally; successful Cloudflare deployment is not implied.

VERIFICATION
All local HTML asset/link references and fragment targets checked; JavaScript
syntax checked; ZIP root and archive integrity checked. Browser rendering and
live-domain behavior have not been tested.

Cloudflare reference:
https://developers.cloudflare.com/pages/get-started/direct-upload/

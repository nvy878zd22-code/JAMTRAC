JAMTRAC GitHub upload package

This folder contains the current JAMTRAC website files ready for GitHub.

Upload these files into the root of the GitHub repository:

- index.html
- about.html
- services.html
- photos.html
- contact.html
- 404.html
- CNAME
- robots.txt
- _headers
- assets/

If you are using Cloudflare Pages connected to GitHub:

1. Put all files from this folder in the repository.
2. In Cloudflare Pages, set the build command to blank.
3. Set the output directory to /.
4. Connect the domain jamtracproperties.us in Cloudflare Pages.

If you are using GitHub Pages:

1. Put all files from this folder in the repository root.
2. In GitHub, go to Settings > Pages.
3. Select Deploy from a branch.
4. Choose main and root.
5. The CNAME file is already set to jamtracproperties.us.

Important: connecting the domain still has to be done in the hosting account.
The website files are ready, but DNS/hosting activation is separate.

# Theo Kiosk — GitHub Pages edition

This folder contains the complete website source and all original artwork.

## Publish on GitHub Pages

1. Create a new GitHub repository and keep the default branch named `main`.
2. Upload **all contents of this folder**, including the hidden `.github` folder.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Open the **Actions** tab and wait for “Deploy to GitHub Pages” to finish.
6. Return to **Settings → Pages** and click **Visit site**.

The included workflow automatically handles both repository URLs such as
`username.github.io/my-gacha` and root URLs from repositories named
`username.github.io`.

## Run locally

Install Node.js 22, then run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Edit the prize links

The five capsule colors and destinations are stored near the top of
`app/page.tsx` in the `PRIZES` list.

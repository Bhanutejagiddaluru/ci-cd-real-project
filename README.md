# We Will Be Learning GitHub Actions — Basic CI/CD with a Simple Project

A beginner-friendly CI/CD starter that auto-deploys a static site (HTML + CSS + JS) with GitHub Actions and GitHub Pages. Includes optional image optimization, rollback workflow, and JS/CSS linting.

---

## Table of Contents
1. [What You Get](#what-you-get)
2. [Project Structure](#project-structure)
3. [Try It Locally](#try-it-locally)
4. [Use This in *Your* GitHub Repo](#use-this-in-your-github-repo)
5. [How the CI/CD Works](#how-the-cicd-works)
6. [Workflows Explained](#workflows-explained)
7. [Linters & Code Quality](#linters--code-quality)
8. [App Files Explained (HTML/CSS/JS)](#app-files-explained-htmlcssjs)
9. [Common Tweaks](#common-tweaks)
10. [FAQ](#faq)

---

## What You Get

- **Zero-build static site** (HTML, CSS, JS) that deploys automatically
- **GitHub Actions** workflows:
  - Deploy to **GitHub Pages**
  - Optional **image optimization**
  - **Rollback** to a last good build
- **Linters** ready to run:
  - **ESLint** for JS (flat config)
  - **Stylelint** for CSS

---

## Project Structure

```
main/
├─ index.html
└─ assets/
   ├─ css/
   │  └─ style.css
   └─ js/
      └─ script.js

.github/
└─ workflows/
   ├─ deploy.yml
   ├─ pages.yml
   ├─ images-optimize.yml
   └─ rollback.yml

eslint.config.js
.stylelintrc.json
```

> If your workflows expect a different publish directory, set it to `main/` (see **Workflows Explained**).

---

## Try It Locally

No build tools needed—open the HTML file.

**Option A (double-click):**
- Open `main/index.html` in your browser.

**Option B (simple local server):**
```bash
# from repo root
cd main
python3 -m http.server 8000
# visit http://localhost:8000
```

---

## Use This in *Your* GitHub Repo

**Option 1 — Use as Template (recommended):**
1. Click **Use this template** on GitHub (or **Fork**).
2. In your new repo, keep the same structure.
3. Push changes to your `main` (or `default`) branch.

**Option 2 — Copy into an existing repo:**
1. Copy the `main/` directory and `.github/workflows/` files into your repo.
2. Commit & push.

**Enable GitHub Pages** (if your `pages.yml` needs it):
- Go to **Settings → Pages**.
- Set **Branch** to the one your workflow publishes from (often `gh-pages` or the action’s default).
- Save.

> Most setups use the built-in `GITHUB_TOKEN`. You usually **do not** need extra secrets for GitHub Pages.

---

## How the CI/CD Works

1. **You push changes** to the repo.
2. **GitHub Actions** triggers:
   - Lint (JS/CSS) (optional depending on your workflow)
   - Deploy static files in `main/` to GitHub Pages
   - (Optional) optimize images before deploy
3. If deploy fails, you can trigger **rollback** workflow to restore a previous version.

---

## Workflows Explained

> Exact triggers/paths come from your `.yml` files. Below is what each is for.

### `deploy.yml`
- Purpose: Core CI/CD that publishes `main/` (static site) to your Pages branch (commonly `gh-pages`) or via `pages` action.
- Typical steps:
  - `actions/checkout` → get code
  - (Optional) lint/validate
  - Upload or push the `main/` directory to Pages

### `pages.yml`
- Purpose: Alternative or official **GitHub Pages** deployment workflow.
- Often uses `actions/upload-pages-artifact` + `actions/deploy-pages`.
- Ensure the **publish directory** is set to `main/`.

### `images-optimize.yml`
- Purpose: Optimize images (PNG/JPG/WebP) before or during deploy to reduce size.
- Usually runs on PRs/commits that touch image files, or as part of deploy.

### `rollback.yml`
- Purpose: Roll back the live site to a previous successful artifact/commit if a bad deploy happens.
- Often a manual workflow dispatch (`workflow_dispatch`) you can trigger from the Actions tab.

> If your site doesn’t appear, confirm the Pages branch is correct in **Settings → Pages**, and that the workflow’s **publish_dir** points to `main/`.

---

## Linters & Code Quality

### ESLint — `eslint.config.js`
Flat config targeting files under `assets/js/**/*.js`, sets browser globals, and enforces basic rules:
- `no-undef`: error
- `no-unused-vars`: warn
- `no-extra-semi`: warn

### Stylelint — `.stylelintrc.json`
Extends `stylelint-config-standard` and relaxes some formatting/notation rules (hex length, zero units, etc.) to keep beginner CSS friction low.

**How to run locally (optional):**
```bash
# ESLint (if you have node installed)
npx eslint "main/assets/js/**/*.js"

# Stylelint
npx stylelint "main/assets/css/**/*.css"
```

---

## App Files Explained (HTML/CSS/JS)

### `main/index.html`
- The static page your visitors see.
- Loads styles from `assets/css/style.css` and logic from `assets/js/script.js`.

**Example:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>CI/CD Demo Website</title>
  <link rel="stylesheet" href="assets/css/style.css"/>
</head>
<body>
  <div class="container">
    <h1>CI/CD Demo Website</h1>
    <p>This page is deployed automatically using <strong>GitHub Actions</strong>.</p>
    <button id="demo-btn">Click Me</button>
    <p id="output"></p>
  </div>
  <script src="assets/js/script.js"></script>
</body>
</html>
```

### `main/assets/css/style.css`
- Basic layout & theming; centered card; hover state on the button; success message color.

### `main/assets/js/script.js`
- Minimal interactivity: clicking the button confirms the page you’re seeing was deployed by CI/CD.

---

## Common Tweaks

- **Change publish directory**: If your workflow deploys the repo root, set it to `main/` (e.g., `publish_dir: ./main` or equivalent for your action).
- **Custom domain**: Add `CNAME` file into the published output if you use a custom domain.
- **Add analytics or forms**: You can drop scripts into `index.html`—no CI changes required.
- **Protect main branch**: Turn on **Branch Protection Rules** for safer merges.

---

## FAQ

**Q: My Pages site is 404.**  
A: Verify **Settings → Pages** points to the branch your workflow publishes and that the job succeeded. Give it a minute to propagate.

**Q: Do I need secrets for Pages?**  
A: Usually **no**. GitHub’s `GITHUB_TOKEN` is enough for standard Pages deploys.

**Q: Can I use this with frameworks (React/Vue/etc.)?**  
A: Yes, but you’ll add a build step before deploy and publish the framework’s **build output** directory.

---

Happy shipping!

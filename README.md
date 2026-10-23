# ademjlassi.dev — portfolio

Personal portfolio of **Adem Jlassi** — Big Data & Data Analytics student (ISAMM Tunis),
built to sit alongside [the CV](Adem-Jlassi-CV.pdf) and [the GitHub profile](https://github.com/Adem-jlassi).

Plain HTML, CSS and 4 KB of JavaScript. No framework, no build step, no trackers.

```
.
├── index.html            # the whole page
├── styles.css            # design system + responsive rules
├── script.js             # clock, nav, scroll reveal, copy e-mail
├── assets/portrait.jpg   # profile photo (synced from GitHub, Oct 2026)
├── Adem-Jlassi-CV.pdf    # downloadable CV
├── .nojekyll             # tell GitHub Pages not to run Jekyll
└── README.md             # this file
```

## Preview locally

Double-click `index.html`, or run a tiny server:

```bash
npx serve .
# or
python -m http.server 8000
```

## Live site

Hosted on GitHub Pages, built straight from the `main` branch — no build step,
no Actions workflow:

**https://adem-jlassi.github.io**

## Updating it

Edit the files, then push:

```bash
git add -A
git commit -m "Describe the change"
git push
```

Pages rebuilds and the new version goes live in about 30 seconds. The setting
lives under **Settings → Pages → Build and deployment → Source: Deploy from a
branch → `main` / root**.

## Editing content

Everything readable lives in `index.html`. Numbers, links and stack tags are plain
markup — search for the text you want to change. Colours are CSS variables at the
top of `styles.css` (`--acid` is the accent, `--bg` the background).

## Re-syncing the profile photo

`assets/portrait.jpg` is a local copy of the GitHub avatar, so the site never
depends on GitHub's CDN. If you change your photo on GitHub, refresh it:

```powershell
Invoke-WebRequest "https://avatars.githubusercontent.com/u/189667074?s=800&v=4" -OutFile assets\portrait.jpg
```

Keep it square (1:1) — the frame crops to a square. 460 px is the largest GitHub
will serve; a sharper photo dropped in manually also works.

## Colophon

Typeface: IBM Plex Sans + IBM Plex Mono. Palette: near-black, hairline greys,
one acid-lime signal. Designed and hand-built by Adem Jlassi, October 2026.

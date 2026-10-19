# Academic Portfolio

A responsive, single-page academic portfolio built with plain HTML, CSS and JavaScript (no frameworks, no build step).

## Folder structure

```
your-repo/
├── index.html
├── style.css
├── script.js
├── assets/
│   └── profile.jpg        <- your photo (square, ~600x600 works well)
└── cv/
    └── Your-Name-CV.pdf   <- your CV
```

## Deploy on GitHub Pages

1. Create a repository named `yourusername.github.io` (or any name).
2. Upload all files, keeping the folder structure above.
3. Go to **Settings -> Pages -> Build and deployment**.
4. Source: **Deploy from a branch**, Branch: **main**, Folder: **/ (root)**, then Save.
5. After about a minute your site is live at `https://yourusername.github.io`.

## What to customize

- Search `index.html` for: `Your Name`, `Your University`, `you@email.com`, `yourusername`, and every `[...]` placeholder.
- Change the email in `script.js` (`YOUR_EMAIL`).
- Edit the rotating titles in `script.js` (`phrases`).
- Colors: edit the variables at the top of `style.css`.
- Add or remove sections (and the matching nav link) as needed.

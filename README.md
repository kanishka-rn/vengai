# bday ♡
### A romantic birthday + first anniversary website for VENGAI

---

## Quick start (local)

```bash
# From the project folder:
python3 -m http.server 5500
# Then open: http://localhost:5500
```

Or just double-click `index.html` — it works without a server too.

---

## Project structure

```
vengai/
├── index.html          ← main page (don't edit for content)
├── style.css           ← all styles
├── script.js           ← all logic
├── config.js           ← ★ EDIT THIS to personalise everything ★
└── assets/
    ├── song.mp3        ← drop your MP3 here (rename to song.mp3)
    └── photos/
        ├── photo-01.jpg  ← replace with your real photos
        ├── photo-02.jpg
        ├── photo-03.jpg
        ├── photo-04.jpg
        ├── photo-05.jpg
        ├── photo-06.jpg
        ├── photo-07.jpg
        └── photo-08.jpg
```

---

## Adding photos

Your 6 photos are already assigned in `config.js`. You just need to save them into the right folder with the right filenames.

**Step 1** — Open `assets/photos/` in your file explorer

**Step 2** — Save each photo with this exact filename:

| # | Description | Filename |
|---|---|---|
| 1 | Instax selfie (close-up, both faces) | `photo-01.jpg` |
| 2 | Night shot outside (blue sweatshirt + black tee) | `photo-02.jpg` |
| 3 | Selfie at chairs (Barcelona jersey) | `photo-03.jpg` |
| 4 | Rooftop café — she looks up at him ⭐ | `photo-04.jpg` |
| 5 | Rooftop café — both face camera | `photo-05.jpg` |
| 6 | Any extra photo you like | `photo-06.jpg` |

⭐ `photo-04.jpg` is also used as the **final screen hero photo**.  
To change it, update `finalPhoto` in `config.js`.

**Step 3** — Refresh the browser. Done.

---

## Adding the song

1. Copy your MP3 into the `assets/` folder
2. Rename it to `song.mp3`  
   (or put any filename and update `songPath` in `config.js`)
3. Open `config.js` and change:
   ```js
   songEnabled: false,   // ← change this to  true
   ```
4. Optionally update `songTitle` and `songArtist`
5. Refresh the browser.

The website will not break if `song.mp3` is missing — the button is  
simply disabled with a "song coming soon ♡" hint.

**Audio does not autoplay.** VENGAI must press the ▶ button.

---

## Editing the content

Everything personal lives in **`config.js`** — names, the birthday letter,  
memories, messages, photo paths, song path.  
You never need to touch `index.html` or `script.js` to change content.

---

## Hidden Easter egg 🥚

On the final screen there is a faint `♡` at the bottom.  
**Tap it 3 times** to reveal the hidden message:  
> *i love u moree ♡*

---

## Deploying to Vercel

The website is a fully static site — no server needed.

### Option A — Vercel CLI

```bash
npm i -g vercel
vercel
# Follow the prompts. Select "No framework".
```

### Option B — Vercel Dashboard (easiest)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Drag the entire project folder into the upload area  
   (or connect your GitHub repo)
4. Framework preset: **Other**
5. Output directory: leave blank (root)
6. Click **Deploy**

That's it. Your site will be live at a `*.vercel.app` URL.

> **No `vercel.json` is required** for a plain static site.  
> If you want a custom domain, set it up in the Vercel project settings.

---

## Customising further

| What to change | Where |
|---|---|
| His name, nickname | `config.js` → `displayName`, `nickname` |
| Birthday letter | `config.js` → `letterBody` |
| Anniversary story | `config.js` → `story`, `memories` |
| Final message | `config.js` → `finalMessage` |
| Hidden message | `config.js` → `hiddenMessage` |
| Song | `assets/song.mp3` + `config.js` → `songEnabled: true` |
| Photos | `assets/photos/` folder |

---

Made with ♡

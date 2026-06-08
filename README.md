# Interactive Resume Template

A force-directed knowledge graph resume site. Click a node, see a detail card.
Built as a single static HTML page, hosted free on GitHub Pages.

This is a sanitised template - all personal content is replaced with
`[PLACEHOLDER]` markers. Open this folder in a new Claude Code session and
paste the contents of `STARTER_PROMPT.md` to walk through filling it in.

## Files

| File                       | What it is                                                  |
|----------------------------|-------------------------------------------------------------|
| `index.html`               | Single-page shell that loads everything else.               |
| `styles.css`               | All visual styling.                                         |
| `app.js`                   | Modal/UI logic - clicking nodes, opening cards, lightbox.   |
| `graph.js`                 | Force-directed layout engine (uses D3.js from CDN).         |
| `data.js`                  | **All resume content lives here.** Nodes, edges, detail cards. |
| `ipod.js` / `ipod.css`     | Optional retro iPod player widget. Delete if not wanted.    |
| `assets/generate_cv.py`    | Python script that builds the downloadable CV PDF.          |
| `.gitignore`               | Excludes video files by default - force-add intentionally.  |
| `.nojekyll`                | Tells GitHub Pages not to run Jekyll on the folder.         |

## Quick start

```bash
# Preview locally
python3 -m http.server 8000
# Open http://localhost:8000

# Generate the CV PDF (once you've filled in generate_cv.py)
pip install reportlab
python3 assets/generate_cv.py
```

## Deploy to GitHub Pages

```bash
git init && git add -A && git commit -m "Initial commit"
gh repo create [REPO-NAME] --public --source=. --push
```

Then in the repo's Settings -> Pages, set Source to `main` branch, root path.
Live at `https://[USER].github.io/[REPO-NAME]/` within ~1 minute.

## Where to start customising

1. **`data.js`** is 80% of the work. Replace every `[PLACEHOLDER]`. Add or
   remove role nodes by editing the `nodes` array, the `edges` array, and the
   matching entry in `details`.
2. **Profile photo**: drop into `assets/profile.jpg`.
3. **Per-role assets**: create folders like `assets/role-1/` and add images
   or compressed videos. Videos need a poster JPG (use ffmpeg to grab a
   frame) - the existing template shows the pattern.
4. **CV PDF**: edit `assets/generate_cv.py`, run it, the output file `CV.pdf`
   is what the website's Download CV button serves.

## Compressing videos

Videos are gitignored by default - GitHub Pages has a 100MB per-file cap, so
anything bigger should be compressed:

```bash
# 1080p H.264, ~3 Mbps - good for short reels
ffmpeg -i input.mov -vcodec libx264 -preset medium -crf 24 \
  -movflags +faststart -acodec aac -b:a 128k -vf "scale=1920:-2" output.mp4

# 720p for longer films
ffmpeg -i input.mov -vcodec libx264 -preset medium -crf 26 \
  -movflags +faststart -acodec aac -b:a 128k -vf "scale=-2:720" output.mp4

# Poster thumbnail
ffmpeg -ss 5 -i video.mp4 -vframes 1 -q:v 3 thumb.jpg
```

Force-add the resulting `.mp4` since gitignore would otherwise skip it:

```bash
git add -f assets/role-1/video.mp4 assets/thumbs/role-1-thumb.jpg
```

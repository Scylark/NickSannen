# Starter prompt for a new Claude Code session

Open this folder in Claude Code. Paste everything between the lines below
as your first message. Claude will then walk you through filling in the
resume for the person you're building it for.

---

I'm building an interactive resume for a friend. This folder is a template
- a force-directed knowledge graph resume site with placeholder content.
The structure works as-is. Your job is to replace the placeholders with
the person's real content.

**Read these files first to understand the structure:**

- `README.md` for the file map and the deploy story
- `data.js` for the content schema (this is where 80% of the work is)
- `assets/generate_cv.py` for the printable CV template
- `index.html`, `styles.css`, `app.js`, `graph.js` if you need to debug
  rendering, but you probably won't need to touch them

**Then please:**

1. Ask me for a CV, LinkedIn URL, or any combination of:
   - Full name and any credentials (e.g. MCIM, MBA)
   - Current role(s) and company
   - Full job history with dates, scope and 3-5 achievements per role
     (numbers are worth chasing for - "grew users 100 to 450,000" beats
     "scaled the user base")
   - Skills, grouped (Strategy, Brand, Digital, Industries, Languages, etc.)
   - Education and qualifications
   - Personal context for the About card (background, lifestyle, why they
     do this work)
   - Contact details (email, phone, location, travel availability)
   - A profile photo (drop into `assets/profile.jpg`)
   - Any per-role media (videos, images, decks) and what folder they
     should live in
   - Industry / sector for each role (gets used as a colour-coded badge)

2. Fill in `data.js`. Every `[PLACEHOLDER]` should be replaced with real
   content. Add or remove `role-N` blocks as needed - the `nodes`, `edges`
   and `details` sections all need to be kept in sync. The role colours
   in the `nodes` array should match the `role-badge` background colour
   in the matching detail card.

3. Fill in `assets/generate_cv.py` with the same content, then run it
   (`python3 assets/generate_cv.py`) to produce `assets/CV.pdf`. This is
   what the website's Download CV button serves.

4. For media galleries, follow the pattern already in `data.js`:
   - Compress videos to MP4 with ffmpeg before adding (commands in README)
   - Generate a poster JPG for every video and save to `assets/thumbs/`
     so the gallery shows a still before play
   - Force-add videos with `git add -f` because `.gitignore` excludes
     them by default

5. Voice and style guidance:
   - Editorial, marketer-first, direct prose. Not breathless.
   - No em dashes. Use commas, full stops, "and", "but".
   - No colons or semicolons unless absolutely necessary. Fold into
     flowing sentences with commas.
   - No "Not X, it's Y" contrast patterns.
   - No setup-punchline two-sentence beats. Connect related ideas.
   - Don't use AI tells like "in today's fast-paced world",
     "revolutionised", "vibe-coded", "operator-grade", etc.
   - Specific numbers beat adjectives. "+45% coverage" not "huge growth".

6. When ready to deploy:
   - `git init && git add -A && git commit -m "Initial commit"`
   - `gh repo create [REPO-NAME] --public --source=. --push`
   - In GitHub repo Settings -> Pages, set Source to `main` branch / root
   - Site goes live at `https://[USER].github.io/[REPO-NAME]/` in ~1 min

**Important:** do not invent biographical facts. If something I give you
is ambiguous or missing, ask. The whole point of this is that it
represents the person accurately.

Start by reading the four key files (`README.md`, `data.js`,
`assets/generate_cv.py`, and a quick scan of `index.html`), then ask me
for the CV / LinkedIn or whatever source material the person has given me.

---

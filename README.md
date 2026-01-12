# polinkasam portfolio

Minimal portfolio site with writings, reading list, and photography.

## Quick Start

### Adding a New Article

**Easy way** (recommended):
```bash
./add-article.sh
```
Follow the prompts, then edit the created file in `writings/` folder.

**Manual way:**
1. Create `writings/your-article.md`
2. Add entry to `writings/index.json`:
   ```json
   {
     "title": "Your Title",
     "date": "2026-01-08",
     "file": "your-article.md"
   }
   ```

### Adding to Reading List

Edit `authors/index.json`:
```json
{
  "name": "Author Name",
  "notes": "Key concepts, ideas, what resonated"
}
```

### Adding Photos

**Portrait photos:** Add to `photos/portrait/`
**Chiaroscuros:** Add to `photos/chiaroscuros/`
**3D work:** Add to `photos/3d-work/`

Then update the HTML in `index.html` to reference your images.

## Publishing to GitHub Pages

First time setup:
```bash
cd portfolio-site
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/polinkasam/polinkasam.github.io.git
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in repo settings: Settings → Pages → Source: main branch

**After adding new content:**
```bash
git add .
git commit -m "Add new article"
git push
```

Site will be live at: https://polinkasam.github.io

## Structure

```
portfolio-site/
├── index.html          # Main site
├── style.css           # Minimal black design
├── script.js           # Content loading
├── add-article.sh      # Quick article creator
├── writings/           # Blog articles
│   ├── index.json
│   └── *.md
├── authors/            # Reading list
│   └── index.json
└── photos/             # Photography
    ├── portrait/
    ├── chiaroscuros/
    └── 3d-work/
```

## Design Notes

- Black background with subtle paper texture
- Elegant serif typography (Georgia)
- Minimal borders and spacing
- Content speaks for itself
- No decorative elements

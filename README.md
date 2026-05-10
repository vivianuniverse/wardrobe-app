# My Capsule Wardrobe

A personal wardrobe inventory and capsule wardrobe planner built with React + TypeScript + Vite.

## Getting Started

```bash
# Install dependencies
npm install

# Run locally
npm run dev
# → Open http://localhost:5173
```

## Deploy to Vercel

1. Push this folder to a GitHub repository
2. Go to vercel.com → New Project → Import your repo
3. Vercel auto-detects Vite — just click Deploy
4. You'll get a shareable URL like `your-wardrobe.vercel.app`

## Adding Photos for New Items

1. Open `src/data/wardrobe.ts`
2. Find the item you want to add photos to
3. Convert your images to base64 (use an online converter or run the helper below)
4. Add them to the `images` array like the blazers

```bash
# Quick base64 converter (run in terminal)
python3 -c "
import base64
with open('your-photo.jpg', 'rb') as f:
    print('data:image/jpeg;base64,' + base64.b64encode(f.read()).decode())
" | pbcopy   # copies to clipboard on Mac
```

## Planned Features
- [ ] Wear frequency tracker ("worn today" button)
- [ ] Outfit combination builder
- [ ] Shopping list with budget tracker
- [ ] Seasonal view toggle
- [ ] Cost-per-wear calculator
- [ ] Export to PDF lookbook

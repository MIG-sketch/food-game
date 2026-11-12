[README.md](https://github.com/user-attachments/files/34738153/README.md)
# FOOD? — Play · Discover · Order

A bilingual (Italian / English) browser-based food trivia game. This repository contains a **static website** ready for GitHub Pages.

## Features
- Solo and local party mode (up to 8 players sharing a device)
- Five dishes per game, 60 seconds per player per dish
- Secret answers until everyone finishes each dish
- Origin country, century, calories, protein, fat and carbs
- 7 / 3 / 0 nutrition scoring; exact century 10, adjacent century 7
- Live score banner, round results and final answer history
- Wikipedia-hosted food photographs (require internet access)
- Post-game dish discovery: search for restaurants in a typed city using Google Maps links
- Italian and English interface

## Publish with GitHub Pages
1. Create a **public** GitHub repository (for example `food-game`).
2. Upload `index.html`, `.nojekyll`, and `README.md` to the repository root.
3. Open **Settings → Pages → Build and deployment**.
4. Set **Source: Deploy from a branch**, branch **main**, folder **/(root)**, then Save.
5. After deployment, the site should be available at `https://YOUR_USERNAME.github.io/food-game/` (use your actual username and repository name).

## Important limitations
- **Online multiplayer is not implemented.** GitHub Pages serves static files and cannot synchronize real-time rooms by itself. Use a backend (e.g. Supabase/Firebase) in a later phase.
- Restaurant discovery opens **Google Maps search results**, not a verified list of restaurants serving a dish. No Glovo partnership or integration exists yet.
- The nutrition values are **illustrative**; recipe standards and historical origin dates require verification before production.
- Wikipedia image fetching may fail in restricted file previews (e.g. WhatsApp on iOS); the public HTTPS GitHub Pages site should be used for mobile testing.

## Local testing
Open `index.html` in a desktop browser. For the most reliable image loading, test the published HTTPS site.

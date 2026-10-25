# Instant Virtuals — Inspired Starter Template

This is an original, responsive starter template inspired by the general layout patterns of a virtual-football analysis landing page. It does not copy the referenced site's source code, logo, testimonials, or proprietary assets.

## Included
- Responsive dark landing page for mobile and desktop
- Screenshot upload and preview
- Browser-side OCR with Tesseract.js (internet required for the CDN and language data)
- Manual 1X2 decimal odds entry
- Normalized implied probability calculation
- Plain-language responsible-use notice

## Run it
Open `index.html` in a browser with an internet connection, or deploy the folder to a static host such as Vercel or GitHub Pages.

## Important limitations
- This starter has no live SportyBet feed.
- It has no AI server endpoint yet; OCR and the odds calculator run in the browser.
- The displayed probabilities are calculated from user-entered odds, not predicted virtual match outcomes.
- Do not put API keys in `index.html` or `app.js`. Add AI through a server-side function and store credentials in hosting environment variables.
- Use only authorized data sources and do not represent estimates as guaranteed wins.

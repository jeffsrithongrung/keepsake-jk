# Proposal site

A scrapbook-style keepsake — a private webpage showing the 12 video messages from her friends.

## What's where

```
docs/           Static site (deployed to GitHub Pages)
  index.html        Landing screen with the handwritten note
  gallery.html      11 friend cards
  styles.css        All styling
  app.js            Gallery logic + lazy video loading
  friends.js        EDIT THIS — names, note text, video URL base
  robots.txt        Keep it off search engines
videos/           (Local only) Renamed copies of the Zoom recordings
scripts/
  rename-videos.ps1   Copies Zoom recordings → videos/friend-N.mp4
  upload-release.ps1  Uploads videos/ to a GitHub Release
```

## One-time setup

1. Install GitHub CLI: `winget install GitHub.cli`, then `gh auth login`.
2. Create a new GitHub repo with an unguessable name (e.g. `velvet-bubble-7q`). Must be **public** for GitHub Pages on the free tier — privacy comes from the unguessable name + `noindex`.
3. Push this folder to that repo:
   ```powershell
   git init
   git add .
   git commit -m "site"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
4. On GitHub, go to **Settings → Pages**, set **Source: Deploy from a branch**, **Branch: main**, **Folder: /docs**. Save.
5. Wait ~1 minute. Your site is live at `https://<you>.github.io/<repo>/` (the URL appears on the Pages settings page).

## Uploading the videos

```powershell
./scripts/rename-videos.ps1
./scripts/upload-release.ps1 -Repo "Jeffy/<repo>"
```

The second command prints the `VIDEO_BASE_URL` to paste into `docs/friends.js`. Commit + push the change and GitHub Pages will redeploy in ~30 seconds.

## Updating names / note text

Edit `docs/friends.js`:

- `window.SITE.herName` — her name as displayed.
- `window.SITE.noteLines` — array of lines on the landing screen.
- `window.SITE.petPhotos` — array of `{ src, alt, caption }` for the polaroids on the landing.
- `window.FRIENDS[].name` — the handwritten name shown on each card.
- `window.FRIENDS[].startAt` — seconds into the video to start playback at (skips intro).
- `window.FRIENDS[].relationship` — optional small italic subtitle ("college roommate", etc.).
- `window.FRIENDS[].color` — card background hex; pick whatever feels right per friend.

Commit + push to update.

## Local preview

```powershell
python -m http.server 5173 --directory public
# then open http://localhost:5173/
```

## If you want to give her an offline copy

Once the videos are uploaded to GitHub Releases, you can also zip the `docs/` folder + the `videos/` folder together, edit `friends.js` to point `VIDEO_BASE_URL` at the relative path `./videos`, and she has a self-contained folder she can keep forever.

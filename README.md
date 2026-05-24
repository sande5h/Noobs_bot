# Noobsbot

Next.js 15 app with dark design system. Includes a Nepali land unit converter, profile pages, and tools.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to DirectAdmin (shared hosting)

DirectAdmin uses **Nginx Unit** as the app server. Never run `npm run build` on the server — shared hosting process limits will cause `spawn EAGAIN` errors during Next.js static generation.

### One-time setup on the server

1. Upload `package.json` and `package-lock.json` to your app root.
2. In DirectAdmin → Node.js → Create Application:
   - **Startup file:** `server.js`
   - **Node version:** 18+ recommended

### Deploy workflow (every release)

```bash
# 1. Build and package locally
bash deploy.sh

# 2. Upload deploy.zip to your server (via DirectAdmin File Manager or SCP)
# 3. Extract deploy.zip into your app root (replace all files)
# 4. In DirectAdmin → Node.js → Restart the app
```

`deploy.sh` does the following:
- Runs `npm run build` locally
- Copies `.next/static/` and `public/` into `.next/standalone/`
- Zips the standalone output into `deploy.zip`

The zip contains bundled `node_modules` — **no `npm install` needed on the server**.

### What to upload

The `deploy.zip` contains the contents of `.next/standalone/`:

```
server.js
package.json
node_modules/      ← bundled, no install needed
.next/
  standalone/
  static/
public/
```

### Troubleshooting

| Issue | Fix |
|---|---|
| "Can't acquire lock" in DA UI | UI bug — site is still running. SSH in and `pkill -f "node server.js"` then restart. |
| `ENOENT: prerender-manifest.json` | Build is missing or incomplete. Run `bash deploy.sh` locally and re-upload. |
| `spawn EAGAIN` | You tried to build on the server. Always build locally with `deploy.sh`. |

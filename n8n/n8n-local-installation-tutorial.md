# n8n Local Installation — Complete Step-by-Step Tutorial

> **Verified against:** n8n `v2.30.8` (latest on npm as of July 2026) · Requires **Node.js >= 22.22**
> **Audience:** Beginners to intermediate developers on Windows (native or WSL), macOS, or Linux

---

## What is n8n?

n8n (pronounced "n-eight-n", short for *nodemation*) is a **source-available workflow automation platform**. Think of it as a self-hosted alternative to Zapier or Make — but with:

- A visual drag-and-drop workflow editor
- 400+ built-in integrations (Google Sheets, Telegram, Slack, GitHub, OpenAI, Anthropic, webhooks, databases, etc.)
- Native **AI Agent nodes** (LangChain-based) for building agentic workflows
- Full JavaScript/Python code nodes when you need custom logic
- Your data stays on **your machine** — nothing runs in someone else's cloud

Running it locally is free and gives you unlimited workflow executions.

---

## Choose Your Installation Method

| Method | Best For | Difficulty | Persistence |
|--------|----------|------------|-------------|
| **1. npx (quick try)** | Testing n8n in 60 seconds | ⭐ Easy | Yes (user folder) |
| **2. npm global install** | Daily local use, tutorials | ⭐⭐ Easy | Yes (user folder) |
| **3. Docker** | Clean setup, closest to production | ⭐⭐⭐ Medium | Yes (named volume) |

All three are covered below. If unsure, use **Method 2 (npm)**.

---

## Prerequisites (All Methods Except Docker)

### Step 1 — Install Node.js 22 LTS

n8n `2.x` requires **Node.js 22.22 or newer**. Check what you have:

```bash
node --version
```

If you see `v22.22.x` or higher, skip ahead. Otherwise:

**Windows (native):**
1. Download the Node.js 22 LTS installer from https://nodejs.org
2. Run the `.msi` installer → accept defaults → it also installs `npm`
3. Close and reopen your terminal, then re-check `node --version`

**Windows (WSL / Ubuntu) or Linux — recommended via nvm:**
```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Reload your shell
source ~/.bashrc

# Install and activate Node 22
nvm install 22
nvm use 22
nvm alias default 22

# Verify
node --version   # should print v22.22.x or newer
npm --version
```

**macOS:**
```bash
brew install node@22
```

> 💡 **Why nvm?** It lets you switch Node versions per project without breaking other tools (useful if you also run Claude Code, OpenCode, or older projects pinned to Node 18/20).

---

## Method 1 — Instant Trial with npx (No Install)

The fastest way to see n8n running:

```bash
npx n8n
```

**What happens:**
1. npx downloads n8n to a temporary cache (first run takes 2–5 minutes — it's a large package, ~1 GB with dependencies, so be patient)
2. n8n starts a local server
3. You'll see output ending with:

```
Editor is now accessible via:
http://localhost:5678
```

**Step 2 — Open the editor:** Go to `http://localhost:5678` in your browser.

**Step 3 — Stop the server:** Press `Ctrl + C` in the terminal.

> ⚠️ npx re-resolves the package each time. For regular use, install it properly (Method 2).

---

## Method 2 — npm Global Install (Recommended for Local Dev)

### Step 1 — Install n8n globally

```bash
npm install -g n8n
```

- Download size is large (~1 GB unpacked). On a typical connection expect **3–10 minutes**.
- On Linux/WSL, if you get `EACCES` permission errors, do **not** use `sudo`. Fix npm's prefix instead:

```bash
mkdir -p ~/.npm-global
npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g n8n
```

### Step 2 — Verify the install

```bash
n8n --version
# 2.30.8 (or newer)
```

### Step 3 — Start n8n

```bash
n8n
```
(or equivalently `n8n start`)

Wait for:
```
Editor is now accessible via:
http://localhost:5678
```

### Step 4 — Create your owner account

1. Open **http://localhost:5678** in your browser
2. First launch shows a **setup screen** — enter email, first/last name, and a password
3. This is a **local account** stored on your machine only (it does not create a cloud account)

### Step 5 — Where your data lives

Everything (workflows, credentials, execution logs) is stored in an SQLite database at:

| OS | Path |
|----|------|
| Linux / WSL / macOS | `~/.n8n/` |
| Windows (native) | `C:\Users\<you>\.n8n\` |

Back up this folder and you've backed up your entire n8n instance.

### Step 6 — Stop and restart

- Stop: `Ctrl + C` in the terminal
- Restart anytime: `n8n`
- Your workflows persist between restarts automatically

---

## Method 3 — Docker Install (Cleanest, Production-Like)

### Step 1 — Install Docker

- **Windows:** Install **Docker Desktop** (uses WSL 2 backend — enable it when prompted)
- **Linux:** `sudo apt install docker.io` or follow the official Docker Engine docs
- Verify: `docker --version`

### Step 2 — Create a persistent volume

This keeps your workflows safe even if the container is deleted:

```bash
docker volume create n8n_data
```

### Step 3 — Run n8n

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n
```

**Flag breakdown:**
- `-p 5678:5678` → maps container port to your machine
- `-v n8n_data:/home/node/.n8n` → persists data in the named volume
- `--rm` → removes the container on stop (data survives in the volume)

### Step 4 — Run it in the background instead (daemon mode)

```bash
docker run -d \
  --name n8n \
  --restart unless-stopped \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n
```

Manage it with:
```bash
docker logs -f n8n     # watch logs
docker stop n8n        # stop
docker start n8n       # start again
```

### Step 5 — Open the editor

Go to **http://localhost:5678** and complete the owner-account setup.

---

## Windows + WSL Notes (Important If You Work in WSL)

Since n8n binds to `localhost` inside WSL:

1. Recent Windows 11 / WSL 2 versions **auto-forward localhost**, so `http://localhost:5678` in your Windows browser usually just works.
2. If it doesn't, find your WSL IP and use it instead:
   ```bash
   hostname -I
   # e.g. 172.29.155.10 → open http://172.29.155.10:5678
   ```
3. Keep the WSL terminal open while n8n runs, or use `tmux`/Docker daemon mode so it survives closing the window.

---

## Your First Workflow (5-Minute Walkthrough)

Let's build a classic "Hello World": a webhook that returns a JSON response.

1. **Create workflow:** Click **"+ Create Workflow"** (top right)
2. **Add a trigger:** Click the **+** on the canvas → search **"Webhook"** → select it
3. **Configure it:**
   - HTTP Method: `GET`
   - Path: `hello`
4. **Add a second node:** Click the **+** after the webhook → search **"Edit Fields (Set)"**
   - Add a field: name = `message`, value = `Assalam-o-Alaikum from n8n!`
5. **Test it:** Click **"Execute Workflow"** (bottom), then open the **Test URL** shown in the Webhook node — something like:
   ```
   http://localhost:5678/webhook-test/hello
   ```
6. You'll see your JSON response in the browser and the execution light up green on the canvas. 🎉
7. **Activate:** Toggle the workflow **Active** (top right) to switch from the test URL to the production URL (`/webhook/hello`).

---

## Updating n8n

**npm install:**
```bash
npm update -g n8n
n8n --version
```

**Docker:**
```bash
docker pull docker.n8n.io/n8nio/n8n
docker stop n8n && docker rm n8n
# re-run the docker run command from Step 4 — your volume keeps all data
```

> 🛡️ **Before major version upgrades**, back up `~/.n8n/` (or export the Docker volume). n8n runs DB migrations automatically on startup, but backups make rollback painless.

---

## Useful Environment Variables (Optional Tuning)

Set these before launching (`export VAR=value` on Linux/WSL, `set VAR=value` on Windows CMD):

| Variable | Purpose | Example |
|----------|---------|---------|
| `N8N_PORT` | Change the port | `N8N_PORT=8080` |
| `N8N_SECURE_COOKIE` | Set `false` if accessing over plain HTTP from another device | `N8N_SECURE_COOKIE=false` |
| `GENERIC_TIMEZONE` | Correct scheduling for Cron/Schedule nodes | `GENERIC_TIMEZONE=Asia/Karachi` |
| `N8N_ENCRYPTION_KEY` | Pin the credentials encryption key (important for backups/migration) | any long random string |
| `WEBHOOK_URL` | Public URL when using a tunnel/reverse proxy | `https://yourdomain.com/` |

Example launch with Karachi timezone:
```bash
GENERIC_TIMEZONE="Asia/Karachi" TZ="Asia/Karachi" n8n
```

---

## Troubleshooting — Common Errors

| Problem | Cause | Fix |
|---------|-------|-----|
| `Your Node.js version X is currently not supported` | Node too old | Install Node 22 LTS (`nvm install 22 && nvm use 22`) |
| `EACCES` during `npm install -g` | npm global dir owned by root | Use the `~/.npm-global` prefix fix shown in Method 2, never `sudo` |
| Port 5678 already in use | Another n8n or app running | `N8N_PORT=5679 n8n` or kill the other process |
| Browser shows "Secure Cookie" error | Accessing via IP over HTTP | Launch with `N8N_SECURE_COOKIE=false n8n` |
| Install extremely slow / seems stuck | Package is ~1 GB | Wait it out, or prefer the Docker method |
| Workflows disappeared after Docker restart | No volume mounted | Always use `-v n8n_data:/home/node/.n8n` |
| Webhook works locally but not from the internet | localhost isn't public | Use `n8n start --tunnel` for dev testing only, or a reverse proxy for real use |

---

## Quick Reference Card

```bash
# Install
npm install -g n8n

# Start
n8n

# Start on a different port with Karachi timezone
N8N_PORT=8080 GENERIC_TIMEZONE="Asia/Karachi" n8n

# Version check
n8n --version

# Update
npm update -g n8n

# Data location
~/.n8n/            # workflows, credentials, SQLite DB

# Editor URL
http://localhost:5678
```

---

## What's Next?

- **Connect AI:** Add an **AI Agent** node and plug in an Anthropic API key to build agentic workflows visually
- **Self-host properly:** Move from SQLite to PostgreSQL + reverse proxy (nginx/Caddy) when you outgrow local use
- **Templates:** Browse 1,000+ ready-made workflows at https://n8n.io/workflows
- **Docs:** https://docs.n8n.io

*Tutorial prepared July 2026 · n8n v2.30.8 · Node.js 22 LTS*

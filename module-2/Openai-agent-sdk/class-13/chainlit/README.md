# Nova — advanced Chainlit chat interface

A streaming assistant built on the OpenAI Agents SDK and Chainlit, with persistent
chat history in the sidebar, generated images rendered inline, and a bluish
"minimal 3D" interface.

## Run it

```bash
uv sync
uv run chainlit run chatbot.py -w
```

Then open http://localhost:8000. There is no login screen — every visitor is
signed in automatically as a single `guest` user.

### Environment

`.env` needs two values:

| Variable | Why |
| --- | --- |
| `OPENAI_API_KEY` | The agent and image generation |
| `CHAINLIT_AUTH_SECRET` | Signs the session JWT. **Chainlit refuses to start without it** whenever any auth callback is registered, and the sidebar needs auth. |

Generate a secret with `uv run chainlit create-secret` (or any random string) if
you are setting this up on a new machine.

## How the pieces fit

| File | Responsibility |
| --- | --- |
| `chatbot.py` | Chainlit lifecycle handlers and the streaming loop |
| `agent_setup.py` | The agent, its system prompt, and the image tool |
| `auth_db.py` | Guest auth, the SQLite data layer, and local file storage |
| `schema.sql` | Table definitions for Chainlit's five tables |
| `public/theme.json` | The bluish palette, light and dark |
| `public/style.css` | Glass surfaces, cursor tilt, thinking animation |
| `public/scene.js` | Canvas orb field and the parallax variables |

Three things are worth knowing before changing any of it:

**The sidebar requires authentication.** Chainlit's `/project/threads` endpoint
returns "unauthorized" without a logged-in user, so thread history genuinely
cannot work without an auth callback. `auth_db.py` uses `@cl.header_auth_callback`,
which the frontend calls automatically on load — that is why no login page appears.

**Elements need a storage client.** `SQLAlchemyDataLayer` drops every image on
reload unless a storage provider is configured, and Chainlit only ships S3, GCS,
and Azure clients. `LocalStorageClient` in `auth_db.py` writes to `public/uploads`
and returns `/public/uploads/...` URLs, which Chainlit already serves.

**The palette is applied as inline styles.** Chainlit reads `public/theme.json`
and sets each variable directly on `<html>`, so a `:root { --primary: ... }` rule
in `style.css` would silently lose. Change colors in `theme.json`; use `--nova-*`
variables in the stylesheet for anything new.

## Runtime state

`chat_history.db` and `public/uploads/` are generated at runtime and gitignored.
Delete both to start from a clean slate.

# Native AI reliability fixture

This opt-in Nuxt layer runs the real provider adapters, router, streaming logic,
native SQLite storage, and UI in a Tauri webview. It replaces credentials and the
AI HTTP boundary with deterministic fixtures. It does not verify live provider
availability, native HTTP, the vault, or production deployment.

Run these commands from the repository root in separate terminals:

```sh
VITE_SUPABASE_URL='' VITE_SUPABASE_PUBLISHABLE_KEY='' TRACER_BUILD_DIR=.nuxt-native-ai-test bun --bun node_modules/nuxt/bin/nuxt.mjs dev --extends ./tests/e2e/desktop/ai-fixture --host 127.0.0.1 --port 3102
bun --bun run tauri dev --no-watch --config tests/e2e/desktop/ai-fixture/tauri.conf.json
```

The test identifier isolates the app's data from Tracer. The seed refuses to run
with another identifier. Never add this layer to the production configuration.

Use the fixture toolbar to select a scenario, then open the indicated page:

1. **recover**: In Settings, Ollama's connection test must fail with a rate-limit
   error; Gemini's must verify a response. Set Chat must display the fallback
   answer after Ollama returns 429.
2. **empty**: Set Chat and Edit's Fact Check must show a retryable empty-answer
   error. Fact Check must not claim there are no suggestions.
3. **partial**: Set Chat and the floating page chat must retain “Partial answer
   preserved.” and report an interruption. No fallback answer should be appended.
4. **error**: Both providers return 503; the UI must recover its controls and
   display an error.

Equivalent production web checks run with:

```sh
bun --bun run build
TRACER_TEST_PRODUCTION=1 bun --bun x playwright test --config playwright.web-app.config.ts tests/e2e/web-app/ai-reliability.spec.ts
```

Set `TRACER_TEST_ENGINE=webkit` to repeat the web checks with WebKit.

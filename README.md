<div align="center">
    <img src="/src-tauri/icons/128x128.png" alt="Tracer logo" width="120" />
    <h1>Tracer</h1>
</div>

## Supabase authentication

Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and
`VITE_SUPABASE_PUBLISHABLE_KEY` from the Supabase project Connect dialog.
Only use a publishable key in the desktop client; never add a secret/service-role
key or Google OAuth client secret to this repository.

Google and email confirmation redirects must allow Tracer's loopback callback:
`http://127.0.0.1:*/callback`.

For GitHub Actions distribution builds, create repository variables named
`VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` under **Settings →
Secrets and variables → Actions → Variables**. The platform build workflows pass
these values to Vite, which embeds them in the packaged desktop client. Builds fail
before packaging if either variable is missing.

## What is Tracer?
**Tracer** is a free flashcard app to help you study. It strives to provide many of the features of proprietary flashcard software such as Quizlet or Knowt, while being easier to use than Anki.

Its main features are:
- 3 modes for flashcard creation: basic (manual creation), synthesis (combining existing sets), and generate (using AI to generate sets from provided PDFs and images)
- 3 study modes: flashcards, learn (multiple choice and true or false questions), and match
- Integrated AI chat that supports OpenAI, Anthropic, Google, and OpenAI Compatible (OAuth providers such as GitHub Copilot is not supported yet)

## Installation
Go to the latest [release](https://github.com/3icecreamsandwich/Tracer/releases) to install. Windows, macOS, and Linux are the only supported platforms.

Note: for macOS, please run in Terminal:
```zsh
codesign --force --deep --sign - /Applications/Tracer.app
xattr -dr com.apple.quarantine /Applications/Tracer.app
```
This is to override macOS's requirement for a developer certificate, which we do not have yet 😅.

## How to Use
On first startup, create or open a Tracer account with Google or verified email.
Google accounts use a random device key protected by the operating system keychain,
so no local password is required and the vault can open offline. Email accounts use
a separate local app password. The account identifies you to Tracer's Supabase
backend; either local vault mode encrypts provider keys and other secrets on this
device. A Google device-key vault has no password recovery if its keychain entry is
lost and must be reset in that case.

Once you signed up, you'll see the homepage. Your future flashcards are on the left and the create modes are on the right.

Email-account vaults may require your password to unlock for subsequent sessions.
You can disable this with the "Require password on startup" toggle in Settings.
Google device-key vaults always use seamless keychain unlock, so that toggle is not
available. Settings is also where you provide API keys for AI features, toggle Dark
mode, and manage the connected account.

## Credits
- **Tauri**, as the app framework Tracer uses
- **Nuxt/Vue** for frontend
- **TailwindCSS** for UI styling
- And other open source projects...

## License
Tracer is licensed under [GPL-3.0](LICENSE).

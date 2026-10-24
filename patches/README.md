# Dependency patches

## Zod 4.3.6

The AI SDK imports Zod's v3 compatibility entry point. Its `errorUtil` initializer
assigns `toString` on an ordinary object. With Tauri's `freezePrototype` enabled,
the inherited `Object.prototype.toString` is non-writable, so this assignment
throws before the creation pages can load.

The patch defines an own property with the same value and ordinary assignment
descriptors in both ESM and CommonJS builds. Tauri's protection remains enabled.
Bun applies it through `patchedDependencies` during installation.

When upgrading Zod, check whether this initializer still needs the patch. The
`zod-frozen-prototype` unit tests cover import and validation with a frozen
prototype, and the creation-link browser test uses the same protection.

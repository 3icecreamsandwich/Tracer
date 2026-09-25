This is the unmodified crates.io `glib` 0.18.5 source archive except for the
two-line fix in `src/variant_iter.rs` from gtk-rs/gtk-rs-core#1343:

- Declare the C out-parameter pointer mutable.
- Pass `&mut p` to `g_variant_get_child`.

The source archive checksum is
`233daaf6e83ae6a12a52055f568f9d7cf4671dabb78ff9560ab6da230ce00ee5`.
It is licensed under MIT; see `LICENSE` and `COPYRIGHT`.

Remove this patch when Tauri's Linux GTK dependency chain supports `glib`
0.20 or later.

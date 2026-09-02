# Global JA Test

Live review deploy for the Kakao Business global intro hero prototype
(mirrored from `global-business-page.devel.kakao.com`), used to test
EN/JA copy, spacing against the design redline, and hero video swaps
without touching the devel deployment.

**Live URL:** https://pennylane-git.github.io/Global-JA-test/

Not indexed by search engines (`robots.txt` + `noindex` meta) — link-only.
Defaults to Japanese on load; use the language switcher (top right) to
compare against English.

This is the only repo for this project — it doubles as both the working
source and the GitHub Pages deploy (paths are relative throughout, so it
works the same served from `/` locally or from the `/Global-JA-test/`
Pages subpath).

## Run it locally

```bash
python3 serve.py
```

Then open `http://localhost:8747/` (desktop) or add `?view=mobile` for
the mobile layout.

## What's been tested here

- **EN/JA language toggle** — hover-opens a dropdown (top right on desktop,
  same trigger in the mobile header), swaps headline/description/CTA copy
  and the hero background video for both breakpoints
- **Desktop hero spacing/type** — matched against the EN_PC/JA_PC design
  redline (gaps, headline line-height/letter-spacing, description width)
- **Mobile hero** — matched against the EN_MO/JA_MO redline; has its own
  dedicated background video per language
- **Responsive breakpoint** — resizing the window across ~900px switches
  between the desktop and mobile layouts automatically (no `?view=mobile`
  query param needed)
- **Hero video** — the white gradient wash over the desktop video has been
  removed so uploaded footage renders at its true brightness

## Notes

- `assets/index-DuQq82ST.js` / `assets/index-Dps4L0yt.css` are the
  compiled build output from the devel prototype (minified), not editable
  component source — everything else in `assets/` (the `overrides.css`,
  the small `*.js` behavior patches, and the media files) is what's
  actually maintained here.
- `default-lang-ja.js` is specific to this deploy (defaults the language
  switcher to JA on load); it's the only file here that wouldn't belong
  in a plain 1:1 mirror of the devel site.

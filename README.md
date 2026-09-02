# Global JA Test

Live review deploy for the Kakao Business global intro hero prototype
(mirrored from `global-business-page.devel.kakao.com`), used to test
EN/JA copy, spacing against the design redline, and hero video swaps
without touching the devel deployment.

**Live URL:** https://pennylane-git.github.io/Global-JA-test/

Not indexed by search engines (`robots.txt` + `noindex` meta) — link-only.
Defaults to Japanese on load; use the language switcher (top right) to
compare against English.

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

## Source

The private working repo (source code, asset originals, commit history)
is [`bridge-visual-clone`](https://github.com/pennylane-git/bridge-visual-clone).
This repo is a deploy-only mirror of it with paths rewritten to work from
a GitHub Pages project subpath.

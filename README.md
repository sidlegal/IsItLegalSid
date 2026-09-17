# Is It Legal Sid? — plain HTML/CSS/JS site

Five-page site (Home, About, Blog, Need Assistant, Contact Us) with your
real logo and color scheme. No framework, no build step — static HTML, one
shared stylesheet, a little vanilla JS. Any static host works.

## Running it locally

Browsers block `fetch()` and some relative paths under `file://`, so serve
the folder instead of double-clicking `index.html`:

```bash
cd isitlegalsid-html
python3 -m http.server 8000
# then open http://localhost:8000
```

## What changed in this revision

1. **Hero graphic** — I didn't see an animation file attached anywhere in
   the conversation (only the two PNGs: the color-scheme screenshot and
   the logo). If you had one in mind, send it over and I'll wire it in
   directly. In the meantime I rebuilt the hero into an animated
   "evidence board" illustration — a pinned document, handcuffs, a scale
   of justice and a note gently float, and the gavel rocks — done in pure
   CSS inside the SVG (`images/hero-illustration.svg`), so no JS or
   external library is needed. It respects `prefers-reduced-motion`.
2. **Nav bar** — rebuilt as a floating rounded "pill" bar with a blurred
   glass background, pill-shaped hover/active states on each link, and a
   restyled mobile menu. See `.nav-shell` in `css/style.css`.
3. **Buttons** — `.btn-solid` / `.btn-outline` are now fully rounded
   (pill-shaped) with a subtle lift-and-shadow on hover instead of the old
   sharp rectangles.
4. **Team section** — now an auto-scrolling marquee (`.team-marquee` /
   `.team-track` in `css/style.css`, on the homepage). It pauses on
   hover, and falls back to a plain scrollable row if the visitor has
   "reduce motion" turned on.
5. **About page** — new `about/index.html`, built from Siddhant's LinkedIn
   profile: bio, 2024 impact stat, what-we-do-best list, education,
   location, and contact/LinkedIn links. The avatar is an initials badge
   rather than a photo — same reasoning as the team section, I won't
   fabricate a headshot; drop in a real photo whenever you have one
   (swap the `.about-avatar` div for an `<img>`).
6. **Footer logo** — was rendering as near-invisible black linework on
   the navy footer background. Fixed with a recolored light variant,
   `images/logo-mark-light.png` (used only in the footer; the header
   still uses the original dark `images/logo-mark.png` since it sits on
   a light background there).

## Brand system

Colors sampled from your reference screenshot:

| Token | Hex | Used for |
|---|---|---|
| `--color-brass` (amber) | `#F3A916` | Headline accent, buttons, numbers, icons |
| `--color-ink` (navy) | `#141D2E` | Dark sections, headings, avatars |
| `--color-paper` | `#FFFFFF` | Main background |
| `--color-paper-dim` (cream) | `#FAF8F5` | Alternating section background |
| `--color-muted` | `#676F7E` | Body copy |

Headings use Fraunces (serif), body text uses Public Sans, both loaded
from Google Fonts.

## What's on each page

- **Home** — animated hero, **Cases Solved** stats band, **Area of
  Expertise** grid (all 16 practice areas), a "how we work" band,
  **Meet the Team** marquee (9 members), 3 recent blog posts, final CTA.
- **About** — Siddhant Pandey's bio, credentials, and what-the-firm-does
  best.
- **Blog** — listing with thumbnails; 4 posts, each with a full-width
  illustrated banner.
- **Need Assistant** — intake form → reveals an embedded Calendly widget
  pre-filled with the person's details. "Matter type" is populated from
  all 16 practice areas via `js/site-config.js`.
- **Contact Us** — contact form plus email/phone/office with icons.

## Before you go live — fill these in

Open **`js/site-config.js`**:

1. **`calendlyUrl`** — your real Calendly event link.
2. **`formEndpoint`** — this is a static site with no backend, so both
   forms POST as JSON to whatever URL you put here. Point it at
   [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com).
   Leave blank and submissions just log to the browser console.
3. **`email`**, **`phone`**.

Also worth replacing:

- **Team & founder photos** — currently initials-in-a-circle avatars.
- **Blog content** — 4 placeholder posts in `blog/<slug>/index.html`.
- **Site URL** — replace `https://www.isitlegalsid.com` throughout if
  your real domain differs.

## Project structure

```
index.html                Home
about/index.html          About (Siddhant Pandey)
blog/
  index.html               Blog listing
  <slug>/index.html          One folder per post (4 included)
need-assistant/index.html Intake form + Calendly booking
contact/index.html        Contact form
404.html                  Custom not-found page
css/style.css             All styles — brand tokens at the top
js/
  site-config.js            ← edit this: Calendly link, form endpoint, 16 practice areas
  main.js                   Active nav link, mobile menu, footer year
  need-assistant.js         Intake form → Calendly reveal logic
  contact.js                 Contact form submit logic
images/
  logo-mark.png               Logo — header (dark, for light backgrounds)
  logo-mark-light.png         Logo — footer (light, for the navy background)
  logo-mark-512.png, favicon.png, og-image.png
  hero-illustration.svg       Animated homepage hero graphic
  blog-*.svg                  4 blog post banner illustrations
  icon-assistant.svg, icon-contact.svg
sitemap.xml, robots.txt   Static SEO files
```

## Why this still fixes the original SEO problem

Every page is real, complete, server-free HTML — unique title/description/
canonical + Open Graph/Twitter tags per page, `LegalService` JSON-LD
site-wide and `Article` JSON-LD per post, a real `sitemap.xml` and
`robots.txt`, and it degrades gracefully with JavaScript off.

# Design of the site

One scrolling page built from screens: each screen has its own composition, and each coloured band breaks into mosaic tiles along its top edge. The look follows the LinkedIn cover: light, calm, Soviet-modernist mosaics and nature.

## Palette and type
- Colours are CSS variables at the top of `src/scss/_base.scss`. The bands (`--sky`, `--sand`, `--deep`, `--sun`) come from the mosaic palette.
- Headings: Big Shoulders Display 700. Text: Golos Text 400 and 500. Both are served with the site from `@fontsource` packages, Latin only (the site is in English only).
- The fonts of the first screen are preloaded by a small Vite plugin (`scripts/preloadFonts.js`), and `font-display: block` hides text for the moment until its font arrives. Without this the first screen flashes a fallback of another width and the menu jumps.

## The mosaic
`src/components/Mosaic/`:

| File | What |
|---|---|
| `figures.js` | The pictures, one per interest, painted on a 48 by 48 canvas with simple shapes |
| `mosaicEngine.js` | Lays out the tiles, reads each picture tile by tile and flies tiles between pictures |
| `Mosaic.jsx` | The React wrapper: a button with a canvas |

Behaviour:
- The picture changes in place. The first time the mosaic comes into view, the tiles assemble.
- Hover changes the picture. A click always changes it, even while tiles are flying; the click that ends the same mouse approach as the hover does not change it twice.
- The mosaic on the first screen also changes by itself every 9 seconds, but only when it is in view, not hovered and left alone.
- With "reduce motion" in the system settings, the picture changes at once and nothing changes by itself.
- Nothing is scheduled while tiles rest, so a still page costs no CPU.

To add a picture, add a draw function and an entry to `FIGURES` in `figures.js`. The word next to the mosaic in Interests comes from its `name`.

Small mosaics take `gap` and `boost`: with the same 1 px gap as a big one, the page shows through between the small tiles and the picture looks washed out.

## Cards that swap
Experience and Projects show one card at a time. All the cards stay on the page in one grid cell (`.stack`), so the tallest holds the height and nothing moves when another is picked.

## Content
All of it is in `src/editable-stuff/config.js`:
- Experience lists the highlights of each job; the resume has the full list.
- A project's `preview` is `{ image, alt }`, `{ code }` or `{ chat }`. A site screenshot must have the proportions of `.stage-box` (1280 by 770) to show whole.
- Project texts avoid what goes stale: no versions and no counts that change. Figures like downloads are rounded down with a plus.
- `interests.trip` is the featured trip. Photos in `interests.images` keep their portrait proportions and change order on every visit.
- A new photo in Interests: name it `interests_<name>.webp`, about 600 px wide, run `npm run placeholders` (needs Python with Pillow) and set its `blur` from `photo-placeholders.json`. The blurred preview shows until the photo has loaded and faded in.

## Why rides are not loaded from Strava
The [Strava API agreement](https://www.strava.com/legal/api) allows showing a user's data only to that same user, so a public feed does not fit it, even for one's own rides. Trips are curated in `config.js`, with links to Strava.

# CLAUDE.md

Guidance for working in this repo.

## What this is

`bento-games` is a small SvelteKit site: a single "bento box" grid of tiles, each
linking out to a daily/weekly web puzzle game (Connections, The Mini, Bandle, etc.).
There is no backend, database, or game logic here — every tile is just a styled
external link.

## Stack

- SvelteKit 2 + Svelte 4
- Tailwind CSS 3 (config in `tailwind.config.js`; custom colors like `connections-purple`)
- TypeScript
- Vite

## Key files

- `src/routes/+page.svelte` — the grid. **This is where games are added.** Each game
  is one `<GameWidget .../>` element.
- `src/lib/components/GameWidget.svelte` — the tile component (props below).
- `src/lib/components/Greeting.svelte` — the "Good Morning/Evening" header.
- `static/` — locally-hosted images, referenced with a root-absolute path
  (e.g. `imgRef={"/time-guessr-text-logo.svg"}`).

## Adding a game

Add a `<GameWidget>` to the grid `<div class="flex flex-wrap">` in
`src/routes/+page.svelte`. Props (see `GameWidget.svelte`):

| Prop         | Required | Purpose |
|--------------|----------|---------|
| `href`       | yes      | External URL the tile links to (opens in a new tab). |
| `color`      | yes      | Tile background — a Tailwind class, e.g. `"bg-black"`, `"bg-[#f4ecdd]"`, or a `bg-gradient-to-r ...`. |
| `imgRef`     | yes      | The game's icon/emblem. A remote URL or a `/foo.png` file in `static/`. |
| `gameName`   | yes      | Display name. |
| `frequency`  | yes      | Tag text, typically `"Daily"` or `"Weekly"`. |
| `logo`       | no       | Publisher logo shown in a white badge in the top-left corner (e.g. NYT, WaPo, Atlantic). Omit for indie games. |
| `nameColor`  | no       | Tailwind text color for the name; default `text-black`. Use `text-white` on dark tiles. |
| `inverseTag` | no       | `true` = black tag with white text (use on light tiles); default = white tag with black text (use on dark/colored tiles). |
| `smallText`  | no       | `true` shrinks the name for long titles. |
| `darkColor`  | no       | Tile background in dark mode. Must be written with the `dark:` prefix, e.g. `"dark:bg-[#26241f]"` (gradients: `"dark:from-... dark:via-... dark:to-..."`), so Tailwind sees the class. |
| `darkNameColor` | no    | Name colour in dark mode; default `dark:text-white`. |
| `darkImgInvert` | no    | `true` applies `dark:invert` to the icon. Use for monochrome black-on-transparent icons that would vanish on a dark tile. |

Tips for picking assets/colors:

- Pull the icon and publisher logo from the game's own site
  (`apple-touch-icon` / favicon / `og:image` links in the page `<head>`).
- Choose `color` so the icon has contrast. A dark/transparent icon needs a light
  tile (and `inverseTag={true}`); a light icon needs a dark tile (`nameColor="text-white"`).
- The site background is `#f0ebe6` (light) / `#14120f` (dark), so tiles read best in
  warm/saturated tones.

## Dark mode

The site follows the system/browser preference only — there is no toggle. Tailwind is
set to `darkMode: 'media'`, so everything is plain `dark:` variants.

Every tile needs a `darkColor`. The rule of thumb: a deep, desaturated version of the
brand colour, dark enough to sit on `#14120f` but light enough to still read as a tile
(roughly `#22`–`#3b` lightness). The name goes white and the frequency tag becomes a
translucent white pill automatically.

Then check the icon against the new tile:

- Icon has its own background (a photo or a solid app icon) → nothing to do.
- Icon is monochrome black on transparent → set `darkImgInvert={true}`.
- Icon is coloured on transparent → pick a `darkColor` it still contrasts against.

Two icons are hosted locally because the upstream URLs are dead:
`static/crossword-grid.svg` (both WaPo crosswords) and `static/cinequote-reel.svg`.

## Verify a change

```bash
npm run check   # svelte-check: types + template diagnostics
npm run dev     # local server (default http://localhost:5173) to eyeball the grid
```

`.claude/launch.json` defines a `dev` config for the preview tooling.

## Conventions

- Commit style is short and descriptive, e.g. "Added timeguessr, remove some others".
- Retired games are kept as commented-out `<GameWidget>` blocks at the bottom of the
  grid rather than deleted, so they can be re-enabled easily.
- Only commit or push when explicitly asked.

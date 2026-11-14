# Cosmic Footprints

**The machines may be silent. Their discoveries aren't.**

Cosmic Footprints is an interactive space-heritage atlas for school-age space enthusiasts. Visitors begin at Earth, travel to the Moon or Mars, and explore the stories of the human-made spacecraft and scientific equipment left on those worlds.

> An independent educational project created for the 2026 NASA Space Apps Challenge — **“Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars.”** NASA does not endorse this project.

## Explore the experience

1. Begin at Earth and choose the Moon or Mars.
2. Follow a cinematic, illustrative travel transition.
3. Explore the rotating planetary globe and its mission markers, or use the mission register.
4. Open a story to learn why an object was sent, what it discovered, how its mission ended, and where it remains.
5. Follow the original mission references and NASA data source.

The travel sequence is a visual metaphor, not a scale model of interplanetary distances or a real trajectory. Planetary surface markers are illustrative placements, not surveyed landing coordinates.

## Stories in this release

| Destination | Object | What the story explores |
| --- | --- | --- |
| Moon | Surveyor 3 | Robotic lunar landing, soil investigation, and the Apollo 12 visit |
| Moon | Lunar Roving Vehicle | Human-operated electric mobility and the three Apollo rover traverses |
| Moon | ALSEP | Long-running lunar science experiments and their 1977 shutdown |
| Mars | Sojourner | The first wheeled rover on another planet |
| Mars | Spirit & Opportunity | Twin rover discoveries and their different mission endings |
| Mars | InSight | Marsquakes and the planet's interior |
| Mars | Ingenuity | The first powered, controlled flight on another planet |

## NASA data used in the experience

### NSSDCA — Apollo Lunar Roving Vehicle record

Cosmic Footprints meaningfully incorporates mission-level traverse-distance data from NASA's Space Science Data Coordinated Archive (NSSDCA) record, [The Apollo Lunar Roving Vehicle](https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html).

The Lunar Roving Vehicle story turns the values reported by that NASA record into an in-app comparison:

| Mission | Total distance driven |
| --- | ---: |
| Apollo 15 | 27.8 km |
| Apollo 16 | 26.7 km |
| Apollo 17 | 35.9 km |
| **Combined total** | **90.4 km** |

The combined total is calculated by adding the three mission totals. The application displays the figures as a comparative data visualization and links directly to the NASA source. These are historical mission totals, not generated estimates or live telemetry.

Other NASA mission pages and historical references support the narrative content. Their direct links are available in each artifact story and in the asset-credit files.

## Data, imagery and attribution

- NASA mission photographs and artist concepts are credited in the interface and in [public/artifacts/ASSET-CREDITS.md](public/artifacts/ASSET-CREDITS.md).
- The InSight illustration is identified as an artist's concept.
- Planetary texture sources and the Mars texture's CC BY 4.0 license are documented in [public/textures/ASSET-CREDITS.md](public/textures/ASSET-CREDITS.md).
- NSSDCA is explicitly identified beside the lunar rover data visualization.
- The globe's marker positions are educational illustrations; they must not be interpreted as verified coordinates.

This project is an independent educational experience and is not affiliated with or endorsed by NASA.

## Technology

- React 19 and TypeScript
- Vite
- React Router v7 Data Router
- Three.js for the planetary scenes and interactive surface markers
- GSAP and @gsap/react for cinematic transitions
- Tailwind CSS v4 and DaisyUI v5 for styling

There is no backend or account system. Mission content is curated and stored locally in typed TypeScript data so the experience does not depend on a live API.

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Create and inspect a production build:

```bash
npm run lint
npm run build
npm run preview
```

Vite writes the production site to `dist/`.

## Deploy to Vercel

1. Import this public GitHub repository into Vercel.
2. Select **Vite** as the framework preset.
3. Use `npm run build` as the build command and `dist` as the output directory.
4. Deploy. No environment variables are required.

The included `vercel.json` keeps the single-page application working when a visitor opens or refreshes a URL directly.

## Accessibility and performance notes

- The mission register provides a non-canvas way to open every story.
- Buttons are native keyboard-operable controls.
- The application respects the user's reduced-motion preference.
- Three.js scenes are lazy-loaded and their renderers, animation frames, event listeners, textures, materials and geometries are cleaned up.
- Renderer pixel ratio is capped to reduce GPU load.
- When WebGL cannot initialize, destination navigation continues to the archive so the mission register remains usable.

## AI assistance disclosure

AI assistance was used during development for research organization, drafting and editing explanatory copy, code generation, debugging suggestions and submission preparation. The project team remains responsible for checking mission facts, source attribution, code and final content. The current application uses credited NASA imagery and programmatically rendered planetary scenes; it does not include AI-generated images or video.

## License and reuse

NASA imagery and third-party planetary textures retain their respective source terms and credits. See the asset-credit files before reusing any image or texture. The project code is provided for educational and hackathon review; third-party assets are not relicensed by this repository.

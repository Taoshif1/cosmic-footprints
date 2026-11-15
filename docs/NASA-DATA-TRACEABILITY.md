# NASA data and educational-content traceability

## Challenge alignment

Challenge: **Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars**.

The experience is designed for school-age space enthusiasts. Each object story explains:
- what the hardware was and why it was sent;
- what it did and what science it made possible;
- how its mission ended and what is known about its present location;
- where readers can inspect the original NASA records.

The NASA Space Apps Global Organizing Team clarified that Global Award eligibility requires meaningful use of at least one NASA data source included in the selected challenge's Resources section. Merely citing NASA photographs or general mission facts is not sufficient. See the official challenge Resources tab and the GO Team clarification:
- https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/?tab=resources
- https://github.com/nasa/spaceapps/discussions/1849

## NASA challenge resource used in the application

**NASA Space Science Data Coordinated Archive (NSSDCA)**

The challenge resource listing identifies the NSSDCA as NASA's public spacecraft and instrument catalog. Cosmic Footprints uses the NSSDCA Apollo Lunar Roving Vehicle mission record as a structured source for a data visualization and an educational data-investigation exercise.

Primary NASA record:
- https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html

Values displayed from the record:
| Apollo mission | Total distance driven |
| --- | ---: |
| Apollo 15 | 27.8 km |
| Apollo 16 | 26.7 km |
| Apollo 17 | 35.9 km |

The application calculates the combined value from those three source values:
**27.8 + 26.7 + 35.9 = 90.4 km**.

The UI labels these as historical mission totals, links directly to the NSSDCA record, and explicitly says they are not live telemetry. The values are shown in the Lunar Roving Vehicle story and in the Mission Detective data investigation.

## Additional NASA mission references

The artifact records link directly to NASA mission pages, NASA historical publications, NSSDCA records and NASA image resources. The image credits are maintained separately in `public/artifacts/ASSET-CREDITS.md`.

The educational quiz in `src/components/learning/MissionLearningLab.tsx` is based on the facts already presented in each artifact record. Every quiz session links back to a NASA source record. It does not present generated facts as NASA telemetry.

## Scientific and visual limitations

- The 3D travel animation is a storytelling device, not a real spacecraft trajectory or scale model.
- Planetary marker coordinates are illustrative placements, not verified landing coordinates.
- Artist concepts are labelled as artist concepts in the story interface.
- Where a spacecraft's exact resting place is unknown, the content says so instead of inventing a location.
- Historical mission values are distinguished from live data.

## AI assistance disclosure

AI assistance was used for code generation, debugging support, research organization and editing explanatory text. The team must review all factual statements and final submissions. No AI-generated NASA logo, mission insignia, flag or NASA-branded artwork is used. The project does not contain AI-generated images or video.

Before submission, list all data, resources, tools, code and image assets actually used in the NASA project form, with their source links and required credits.

## Mission fate and final-signal references

The **The Last Signal** panels distinguish a last confirmed communication or final operational event from a later formal mission-end or recovery-termination date. The data is curated in `src/data/missionDetails.ts`; no missing transmission date is invented.

| Artifact | NASA / mission-owner reference |
| --- | --- |
| Surveyor 3 | https://science.nasa.gov/mission/surveyor-3/ |
| Lunar Roving Vehicle / Apollo 17 final surface EVA | https://www.nasa.gov/missions/apollo/apollo-17-mission-details/ |
| ALSEP shutdown | https://ntrs.nasa.gov/api/citations/19790014808/downloads/19790014808.pdf |
| Mars Pathfinder / Sojourner last data transmission and mission conclusion | https://science.nasa.gov/resource/pathfinder-on-mars-2/ |
| Spirit and Opportunity | https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/ |
| Spirit final communication and recovery report | https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20160001767.pdf |
| InSight last communication and retirement | https://www.nasa.gov/missions/insight/nasa-retires-insight-mars-lander-mission-after-years-of-science/ |
| Mars Polar Lander / Deep Space 2 | https://science.nasa.gov/mission/mars-polar-lander-deep-space-2/ |
| Ingenuity final flight and mission announcement | https://www.nasa.gov/news-release/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/ |

## Endurance comparisons and interactive replay

- Sojourner: NASA states 83 sols of a planned seven-sol mission. https://science.nasa.gov/resource/pathfinder-on-mars-2/
- Ingenuity: NASA states the original demonstration was up to five flights and that the helicopter completed 72 flights. https://www.nasa.gov/news-release/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/

The Ingenuity flight selector uses verified total flight count and verified first/final flight milestone dates. The plotted arc is explicitly illustrative and must not be interpreted as flight telemetry.

## Archive location integrity

Mars Polar Lander / Deep Space 2 is intentionally excluded from `src/data/planetMarkers.ts`: NASA never confirmed the spacecrafts' final resting places. A separate lost-signal record in the Mars archive provides access to its story without implying an invented coordinate.

The archive search/category state is lifted to `src/App.tsx` and passed to both `ArtifactExplorer` and `ArchivePlanetScene`. The globe hides markers outside the active filtered result set; the non-canvas mission register remains available for every record.


## Mars Mission Control: live-feed and location policy

The Mars Mission Control dashboard is backed by NASA's public raw-image feeds for Perseverance and Curiosity. It refreshes the browser feed every 15 minutes while visible and keeps the last successful response in browser storage as a clearly labelled cache fallback.

| Resource | Official source | What the application uses |
| --- | --- | --- |
| Perseverance raw images | https://mars.nasa.gov/rss/api/?ver=1.2&feed=raw_images&feedtype=json&category=mars2020&num=12&page=0&order=sol%20desc | Latest publicly released image records, sol, camera, capture/receipt timestamps when provided |
| Curiosity raw images | https://mars.nasa.gov/api/v1/raw_image_items/?order=sol%20desc,instrument_sort%20desc,sample_type_sort%20desc,date_taken%20desc&per_page=12&page=0&extended=thumbnail::sample_type::noteq | Latest publicly released image records and metadata when provided |
| Perseverance location | https://science.nasa.gov/mission/mars-2020-perseverance/location-map/ | Official latest traverse map opened from the dashboard |
| Curiosity location | https://science.nasa.gov/mission/msl-curiosity/location-map/ | Official latest traverse map opened from the dashboard |
| Ingenuity mission history | https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/ | Historical flight record only; no live flight telemetry is claimed |

NASA describes the Perseverance and Curiosity maps as showing the rovers' latest locations and traverse paths, with each point marking the end of a drive and its Martian sol. The maps are updated when new drive data is published; they are not continuous GPS feeds. The application therefore links to NASA's maps and does not invent coordinates or present a simulated moving marker as a live rover position.

The dashboard separately labels:
- image capture time on Mars;
- image receipt time on Earth, when the NASA record supplies it;
- browser fetch time (the time this visitor checked the feed).

NASA's legacy Mars Rover Photos API is marked archived in the NASA Open APIs portal. The application does not use that archived endpoint. The raw-image feeds are served by NASA's Mars mission websites but are not advertised as a guaranteed, versioned public API. A failed request results in a clearly labelled cached copy or unavailable state with a link to the official NASA image gallery.

NASA references:
- https://api.nasa.gov/
- https://science.nasa.gov/mission/mars-2020-perseverance/location-map/
- https://science.nasa.gov/mission/msl-curiosity/location-map/
- https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/

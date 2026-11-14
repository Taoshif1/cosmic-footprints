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

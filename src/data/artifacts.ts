export type Destination = "moon" | "mars";

export interface ArtifactSource {
    label: string;
    url: string;
}

export interface MissionMilestone {
    date: string;
    title: string;
    description: string;
}

export interface Artifact {
    id: string;
    destination: Destination;
    name: string;
    mission: string;
    year: string;
    category: string;
    tagline: string;
    description: string;
    image: string;
    imageAlt: string;
    imageCaption: string;
    imageCredit: string;
    imageType: "photograph" | "artist-concept";
    status: string;
    statusDetail: string;
    purpose: string;
    story: string;
    discoveries: string[];
    finalChapter: string;
    currentLocation: string;
    highlights: string[];
    timeline: MissionMilestone[];
    sources: ArtifactSource[];
}

export const artifacts: Artifact[] = [
    // ========================================
    // THE MOON
    // ========================================

    {
        id: "surveyor-3",
        destination: "moon",
        name: "Surveyor 3",
        mission: "Surveyor Program",
        year: "1967",
        category: "Robotic Lander",
        tagline: "The robot that humans came back to visit.",
        description: "NASA's Surveyor 3 robotic lander touched down on the Moon in April 1967 to test soft-landing techniques and analyze lunar soil before the Apollo missions.",
        image: "/artifacts/surveyor-3.jpg",
        imageAlt:
            "Apollo 12 astronaut examining Surveyor 3's television camera on the Moon.",
        imageCaption:
            "Apollo 12 astronauts visited Surveyor 3 and recovered parts of the spacecraft.",
        imageCredit: "NASA",
        imageType: "photograph",
        status: "Silent on the lunar surface",
        statusDetail:
            "Surveyor 3 no longer operates. Its remaining hardware is still on the Moon.",
        purpose:
            "Before astronauts could safely explore the Moon, NASA needed to understand its surface. Surveyor 3 was sent to test a soft lunar landing, examine the soil and photograph the landscape.",
        story:
            "Surveyor 3 arrived in April 1967 and became part of an important series of robotic missions that prepared the way for Apollo. It used a television camera and a surface sampler to examine lunar soil.\n\nIts story became even more extraordinary in November 1969. Apollo 12 landed approximately 180 metres away. Astronauts Pete Conrad and Alan Bean walked to the little lander, photographed it and brought back its television camera and other components for examination on Earth.",
        discoveries: [
            "Tested lunar surface soil with a mechanical sampler.",
            "Returned photographs of the lunar landscape.",
            "Helped scientists understand surface conditions ahead of crewed landings.",
            "Its returned hardware provided material for studying long-term lunar exposure.",
        ],
        finalChapter:
            "Surveyor 3's last communication came in May 1967. Two and a half years later, Apollo 12 astronauts visited it and returned selected components to Earth.",
        currentLocation:
            "Ocean of Storms (Oceanus Procellarum), near the Apollo 12 landing site.",
        highlights: [
            "Launched in April 1967",
            "First landed before Apollo 12",
            "Visited by astronauts",
            "Camera returned to Earth",
        ],
        timeline: [
            {
                date: "April 1967",
                title: "Launch and landing",
                description:
                    "Surveyor 3 travels to the Moon and successfully reaches its surface.",
            },
            {
                date: "May 1967",
                title: "Last communication",
                description:
                    "The spacecraft's communications with Earth come to an end.",
            },
            {
                date: "November 1969",
                title: "An unexpected visitor",
                description:
                    "Apollo 12 astronauts land nearby and retrieve parts of Surveyor 3.",
            },
        ],
        sources: [
            {
                label: "NASA — Apollo 12 and Surveyor 3",
                url: "https://science.nasa.gov/resource/apollo-12-and-surveyor-3/",
            },
            {
                label: "NASA — Surveyor 3",
                url: "https://science.nasa.gov/mission/surveyor-3/",
            },
        ],
    },

    {
        id: "lunar-roving-vehicle",
        destination: "moon",
        name: "Lunar Roving Vehicle",
        mission: "Apollo 15, 16 and 17",
        year: "1971–1972",
        category: "Electric Exploration Vehicle",
        tagline: "The first crewed cars on another world.",
        description: "The battery-powered Lunar Roving Vehicle (LRV) used on Apollo 15, 16, and 17, enabling astronauts to travel farther and transport more equipment across the lunar surface.",
        image: "/artifacts/lunar-rover.jpg",
        imageAlt:
            "Apollo 15 astronaut David Scott operating the Lunar Roving Vehicle on the Moon.",
        imageCaption:
            "Apollo 15 astronaut David Scott with the Lunar Roving Vehicle and scientific equipment.",
        imageCredit: "NASA/JSC",
        imageType: "photograph",
        status: "Parked on the Moon",
        statusDetail:
            "Three battery-powered rovers remain at their respective Apollo landing sites.",
        purpose:
            "Walking limited how far astronauts could explore. NASA developed the Lunar Roving Vehicle to transport astronauts and scientific equipment across larger areas of the lunar surface.",
        story:
            "Imagine trying to explore a world wearing a spacesuit, carrying scientific equipment and walking in low gravity. That was the challenge Apollo astronauts faced.\n\nThe Lunar Roving Vehicle changed the experience. These electric vehicles carried two astronauts, allowed them to travel farther from the Lunar Module and helped them collect more samples. Three rovers were used during Apollo 15, Apollo 16 and Apollo 17. At the end of each mission, the rover stayed behind on the lunar surface.",
        discoveries: [
            "Extended the distance astronauts could explore.",
            "Made it easier to transport lunar samples and equipment.",
            "Helped astronauts investigate geological features farther from their landing sites.",
            "Demonstrated human-operated electric mobility on another world.",
        ],
        finalChapter:
            "After the final lunar excursions, each rover was left at its Apollo landing site. There was no need to return the vehicles to Earth.",
        currentLocation:
            "Three separate Apollo landing sites: Hadley–Apennine, Descartes Highlands and Taurus–Littrow.",
        highlights: [
            "Three lunar rovers built",
            "Two astronauts per vehicle",
            "Battery-powered electric drive",
            "Used across three Apollo missions",
        ],
        timeline: [
            {
                date: "1971",
                title: "Apollo 15",
                description:
                    "The first Lunar Roving Vehicle is used on the lunar surface.",
            },
            {
                date: "1972",
                title: "Apollo 16",
                description:
                    "The second rover helps astronauts investigate the lunar highlands.",
            },
            {
                date: "1972",
                title: "Apollo 17",
                description:
                    "The third and final Lunar Roving Vehicle supports the last Apollo lunar surface mission.",
            },
        ],
        sources: [
            {
                label: "NSSDCA — Apollo Lunar Roving Vehicle",
                url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html",
            },
            {
                label: "NASA — Apollo 15 on the Moon",
                url: "https://science.nasa.gov/resource/apollo-15-on-the-moon/",
            },
        ],
    },

    {
        id: "alsep",
        destination: "moon",
        name: "ALSEP",
        mission: "Apollo Lunar Surface Experiments Package",
        year: "1969–1977",
        category: "Scientific Instrument Package",
        tagline: "The astronauts left. The science continued.",
        description: "The Apollo Lunar Surface Experiments Package (ALSEP) consisted of long-term scientific instruments deployed by astronauts during five Apollo missions to study moonquakes and the lunar environment.",
        image: "/artifacts/alsep.jpg",
        imageAlt:
            "Apollo 14 ALSEP central station and active seismic experiment equipment.",
        imageCaption:
            "Apollo 14 astronauts deployed scientific instruments on the lunar surface.",
        imageCredit: "NASA/JSC",
        imageType: "photograph",
        status: "Powered down in 1977",
        statusDetail:
            "Mission Control ended the powered ALSEP experiment operations on September 30, 1977.",
        purpose:
            "Astronauts could only remain on the Moon for a limited time. ALSEP allowed scientific experiments to continue gathering measurements after the crews returned to Earth.",
        story:
            "An astronaut's visit to the Moon lasted only a few days. Scientists wanted to study the lunar environment for months and years.\n\nNASA's solution was ALSEP: a collection of scientific instruments deployed by astronauts during Apollo 12, 14, 15, 16 and 17. The instruments studied moonquakes, heat flow, magnetic fields and other properties of the lunar environment. Some continued working much longer than their original planned lifetimes.",
        discoveries: [
            "Recorded lunar seismic activity.",
            "Provided measurements of heat flowing from the Moon's interior.",
            "Helped investigate the lunar magnetic environment.",
            "Created long-running datasets for lunar geophysics.",
        ],
        finalChapter:
            "Designed for approximately one to two years of operation, the ALSEP experiments continued for years. Mission Control permanently shut down the powered experiment packages on September 30, 1977.",
        currentLocation:
            "Experiment packages remain at their respective Apollo landing sites on the Moon.",
        highlights: [
            "Five Apollo missions deployed ALSEP",
            "Designed for long-term science",
            "Powered by radioisotope generators",
            "Operations ended in 1977",
        ],
        timeline: [
            {
                date: "1969",
                title: "First full ALSEP deployment",
                description:
                    "Apollo 12 astronauts deploy the first full ALSEP station.",
            },
            {
                date: "1971–1972",
                title: "More lunar science stations",
                description:
                    "Apollo 14, 15, 16 and 17 crews install additional experiment packages.",
            },
            {
                date: "September 30, 1977",
                title: "Final shutdown",
                description:
                    "Mission Control ends powered ALSEP experiment operations.",
            },
        ],
        sources: [
            {
                label: "NASA — ALSEP History",
                url: "https://www.nasa.gov/wp-content/uploads/static/history/alsj/HamishALSEP.html",
            },
            {
                label: "NASA — Apollo Expeditions to the Moon: ALSEP",
                url: "https://www.nasa.gov/wp-content/uploads/static/history/SP-350/ch-12-7.html",
            },
            {
                label: "NASA — Lunar Data Project",
                url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_data/",
            },
        ],
    },

    // ========================================
    // MARS
    // ========================================

    {
        id: "sojourner",
        destination: "mars",
        name: "Sojourner",
        mission: "Mars Pathfinder",
        year: "1997",
        category: "Microrover",
        tagline: "A tiny rover with a much bigger mission.",
        description: "NASA's Sojourner was a tiny microrover and the first wheeled vehicle to operate on another planet, exploring the Martian surface during the 1997 Mars Pathfinder mission.",
        image: "/artifacts/sojourner.jpg",
        imageAlt:
            "NASA Mars Pathfinder mission image showing the Sojourner rover on Mars.",
        imageCaption:
            "Sojourner explored the Martian surface after deployment from Pathfinder.",
        imageCredit: "NASA/JPL-Caltech",
        imageType: "photograph",
        status: "Silent on Mars",
        statusDetail:
            "Sojourner remains at its Mars Pathfinder landing location.",
        purpose:
            "NASA wanted to demonstrate that a smaller, lower-cost robotic rover could successfully explore another planet and investigate rocks and soil at close range.",
        story:
            "Sojourner arrived on Mars with the Pathfinder lander on July 4, 1997. It was the first wheeled rover to operate on another planet.\n\nThe mission was designed around a short seven-day rover operation. But Sojourner kept exploring for 83 Martian days, moving around rocks and examining the surrounding terrain. It demonstrated technologies and operations that helped shape future Mars rover missions.",
        discoveries: [
            "Investigated Martian rocks and soil up close.",
            "Returned images of the Martian surface.",
            "Performed chemical and other measurements.",
            "Demonstrated practical rover mobility and remote operations on Mars.",
        ],
        finalChapter:
            "The final Pathfinder data transmission was received on September 27, 1997. After months of recovery attempts, NASA terminated the successful mission in March 1998.",
        currentLocation:
            "Ares Vallis, at the Mars Pathfinder landing site, later named Carl Sagan Memorial Station.",
        highlights: [
            "First wheeled rover on another planet",
            "Planned: 7 days",
            "Actual rover operations: 83 sols",
            "Pathfinder landed July 4, 1997",
        ],
        timeline: [
            {
                date: "July 4, 1997",
                title: "Arrival on Mars",
                description:
                    "Pathfinder lands and begins its surface exploration mission.",
            },
            {
                date: "July 1997",
                title: "Sojourner rolls onto Mars",
                description:
                    "The tiny rover leaves its lander and begins exploring nearby terrain.",
            },
            {
                date: "September 27, 1997",
                title: "Last data transmission",
                description:
                    "The final Pathfinder transmission reaches Earth.",
            },
        ],
        sources: [
            {
                label: "NASA — Mars Pathfinder",
                url: "https://science.nasa.gov/mission/mars-pathfinder/",
            },
            {
                label: "NASA — Sojourner Rover",
                url: "https://science.nasa.gov/resource/sojourner-rover/",
            },
            {
                label: "NASA — Sojourner's First Images",
                url: "https://science.nasa.gov/resource/sojourners-first-images-from-mars/",
            },
        ],
    },

    {
        id: "spirit-opportunity",
        destination: "mars",
        name: "Spirit & Opportunity",
        mission: "Mars Exploration Rover Mission",
        year: "2004–2019",
        category: "Twin Exploration Rovers",
        tagline: "Two explorers. Two different endings. One lasting legacy.",
        description: "Twin Mars Exploration Rovers that investigated Martian rocks and soils for geological evidence of ancient water, operating far beyond their planned 90-day lifespans.",
        image: "/artifacts/spirit-opportunity.jpg",
        imageAlt:
            "Opportunity rover's final panorama of Perseverance Valley on Mars.",
        imageCaption:
            "Opportunity's final panorama, captured before a planet-wide dust storm ended communications.",
        imageCredit: "NASA/JPL-Caltech/Cornell/ASU",
        imageType: "photograph",
        status: "Both missions ended",
        statusDetail:
            "Spirit and Opportunity are no longer operational and remain on the Martian surface.",
        purpose:
            "NASA sent two robotic geologists to different Martian locations to investigate rocks and soils for evidence that liquid water had once existed on Mars.",
        story:
            "Spirit and Opportunity were twin robotic explorers that arrived on Mars in January 2004. Their primary missions were designed to last around 90 Martian days.\n\nInstead, both rovers worked for years. Their investigations revealed geological evidence that ancient Mars had environments where liquid water had persisted.\n\nBut their endings were different. Spirit became trapped in soft soil and eventually lost communication. Opportunity kept travelling until a planet-wide dust storm blocked sunlight from its solar panels.",
        discoveries: [
            "Found geological evidence of ancient water activity.",
            "Investigated rocks, soil and craters at two different landing regions.",
            "Demonstrated that Mars rovers could operate far beyond their planned lifetimes.",
            "Returned extensive panoramic imagery and geological measurements.",
        ],
        finalChapter:
            "Spirit's final communication was received in March 2010, and NASA ended recovery efforts in May 2011. Opportunity's last communication came on June 10, 2018, during a major dust storm. NASA declared its mission over in February 2019.",
        currentLocation:
            "Spirit remains in Gusev Crater. Opportunity remains in Perseverance Valley within Endeavour Crater.",
        highlights: [
            "Two twin rovers",
            "Original primary missions: 90 sols",
            "Spirit operated for more than six years",
            "Opportunity travelled 45.16 km",
        ],
        timeline: [
            {
                date: "January 2004",
                title: "Twin landings",
                description:
                    "Spirit and Opportunity arrive at separate Martian locations.",
            },
            {
                date: "2004–2009",
                title: "Years of discovery",
                description:
                    "Both rovers explore craters, rocks and terrain containing evidence of ancient water.",
            },
            {
                date: "March 2010",
                title: "Spirit goes silent",
                description:
                    "Spirit's final communication is received.",
            },
            {
                date: "June 10, 2018",
                title: "Opportunity's final signal",
                description:
                    "A major dust storm blocks solar power and communication.",
            },
            {
                date: "February 2019",
                title: "Opportunity mission ends",
                description:
                    "NASA officially concludes the mission after recovery attempts.",
            },
        ],
        sources: [
            {
                label: "NASA — Spirit and Opportunity",
                url: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/",
            },
            {
                label: "NASA — Opportunity's Final Mars Images",
                url: "https://science.nasa.gov/resource/opportunity-rovers-final-mars-images/",
            },
        ],
    },

    {
        id: "insight",
        destination: "mars",
        name: "InSight",
        mission: "Interior Exploration using Seismic Investigations, Geodesy and Heat Transport",
        year: "2018–2022",
        category: "Scientific Lander",
        tagline: "The lander that listened to the heartbeat of Mars.",
        description: "NASA's InSight stationary lander designed to study the deep interior of Mars, detecting over a thousand marsquakes and measuring internal heat flow.",
        image: "/artifacts/insight.jpg",
        imageAlt:
            "NASA artist's concept of the InSight lander operating scientific instruments on Mars.",
        imageCaption:
            "Artist's concept of InSight with its instruments deployed on the Martian surface.",
        imageCredit: "NASA/JPL-Caltech",
        imageType: "artist-concept",
        status: "Mission retired",
        statusDetail:
            "InSight stopped communicating as its solar power declined due to accumulated dust.",
        purpose:
            "Unlike rovers that explored the surface, InSight was designed to investigate the planet's interior by studying marsquakes, heat flow and the motion of Mars.",
        story:
            "InSight arrived on Mars in November 2018 with a very different mission from the rovers. It stayed in one place and listened.\n\nUsing its seismometer, the lander detected more than a thousand seismic events, giving scientists information about the Martian crust, mantle and core. It helped turn Mars into a world whose internal structure could be investigated from its surface.\n\nOver time, dust accumulated on its solar panels and power levels declined.",
        discoveries: [
            "Detected 1,319 marsquakes.",
            "Provided information about Mars' crust and mantle.",
            "Helped scientists investigate the planet's core.",
            "Advanced understanding of how rocky planets formed and evolved.",
        ],
        finalChapter:
            "As dust accumulated on its solar panels, InSight gradually lost the energy needed to operate and communicate. Its final successful communication was received in December 2022. NASA retired the mission on December 21, 2022.",
        currentLocation:
            "Elysium Planitia, near the Martian equator.",
        highlights: [
            "Landed November 26, 2018",
            "1,319 detected marsquakes",
            "Studied Mars' interior",
            "Mission retired in December 2022",
        ],
        timeline: [
            {
                date: "November 26, 2018",
                title: "Landing on Mars",
                description:
                    "InSight reaches Elysium Planitia and begins commissioning its instruments.",
            },
            {
                date: "2019",
                title: "Listening begins",
                description:
                    "The seismometer begins returning data about the planet's internal activity.",
            },
            {
                date: "2021–2022",
                title: "A changing power supply",
                description:
                    "Dust gradually covers the solar panels, reducing available energy.",
            },
            {
                date: "December 21, 2022",
                title: "Mission retirement",
                description:
                    "NASA officially retires the lander after communication is lost.",
            },
        ],
        sources: [
            {
                label: "NASA — InSight Mission",
                url: "https://science.nasa.gov/mission/insight/",
            },
            {
                label: "NASA — InSight First Image",
                url: "https://science.nasa.gov/resource/insights-first-image-from-mars/",
            },
            {
                label: "NASA — InSight Mission Retirement",
                url: "https://www.nasa.gov/missions/insight/nasa-retires-insight-mars-lander-mission-after-years-of-science/",
            },
        ],
    },

    {
        id: "ingenuity",
        destination: "mars",
        name: "Ingenuity",
        mission: "Mars Helicopter Technology Demonstration",
        year: "2021–2024",
        category: "Robotic Helicopter",
        tagline: "Five planned flights. Seventy-two flights achieved.",
        description: "The NASA Mars Helicopter that achieved the first powered, controlled flight on another world, far exceeding its initial five-flight demonstration to complete 72 flights.",
        image: "/artifacts/ingenuity.jpg",
        imageAlt:
            "NASA's Ingenuity helicopter deployed on the Martian surface, viewed by Perseverance.",
        imageCaption:
            "Ingenuity on Mars, photographed by Perseverance's rear Hazard Camera.",
        imageCredit: "NASA/JPL-Caltech",
        imageType: "photograph",
        status: "Grounded on Mars",
        statusDetail:
            "Rotor-blade damage during its final flight ended Ingenuity's flying career.",
        purpose:
            "NASA wanted to demonstrate that a powered aircraft could fly in the extremely thin atmosphere of Mars, opening possibilities for future aerial exploration.",
        story:
            "Ingenuity travelled to Mars attached to the Perseverance rover. It was a technology demonstration, not a long-term scientific rover.\n\nIts original plan was to complete up to five test flights within about 30 days. But the small helicopter exceeded every expectation. It completed 72 flights, helping demonstrate that aerial scouting could be possible on another planet.\n\nDuring its 72nd flight in January 2024, Ingenuity sustained rotor damage and could no longer fly.",
        discoveries: [
            "Achieved the first powered, controlled flight on another planet.",
            "Demonstrated autonomous flight in the thin Martian atmosphere.",
            "Helped demonstrate the potential for aerial scouting of planetary terrain.",
            "Completed 72 flights instead of the original five-flight demonstration.",
        ],
        finalChapter:
            "Ingenuity made its final flight on January 18, 2024. Damage to its rotor blades during the landing left it unable to fly. NASA announced the end of the helicopter's mission on January 25, 2024.",
        currentLocation:
            "Neretva Vallis, Jezero Crater, at its final airfield on Mars.",
        highlights: [
            "First powered aircraft flight on another planet",
            "Planned: 5 flights",
            "Completed: 72 flights",
            "Final flight: January 18, 2024",
        ],
        timeline: [
            {
                date: "February 18, 2021",
                title: "Arrival on Mars",
                description:
                    "Ingenuity lands with the Perseverance rover.",
            },
            {
                date: "April 19, 2021",
                title: "First powered flight",
                description:
                    "Ingenuity achieves the first controlled powered flight on another planet.",
            },
            {
                date: "April 2021–2024",
                title: "Mission expands",
                description:
                    "The helicopter completes 72 flights and supports exploration from the air.",
            },
            {
                date: "January 18, 2024",
                title: "Final flight",
                description:
                    "Rotor damage during the landing ends its ability to fly.",
            },
            {
                date: "January 25, 2024",
                title: "Mission ends",
                description:
                    "NASA announces the end of Ingenuity's flight mission.",
            },
        ],
        sources: [
            {
                label: "NASA — Ingenuity Mars Helicopter",
                url: "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/",
            },
            {
                label: "NASA — Ingenuity Deployed on Mars",
                url: "https://science.nasa.gov/resource/ingenuity-deployed-on-mars/",
            },
            {
                label: "NASA — Ingenuity Mission Ends",
                url: "https://www.nasa.gov/news-release/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/",
            },
        ],
    },
];

export const getArtifactsByDestination = (
    destination: Destination,
) => {
    return artifacts.filter(
        (artifact) => artifact.destination === destination,
    );
};

export const getArtifactById = (id: string) => {
    return artifacts.find(
        (artifact) => artifact.id === id,
    );
};
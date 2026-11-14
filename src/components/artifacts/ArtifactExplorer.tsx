
import {
    getArtifactsByDestination,
    type Destination,
    type Artifact,
} from "../../data/artifacts";

interface ArtifactExplorerProps {
    destination: Destination;
    onSelect: (artifact: Artifact) => void;
    onChangeDestination: () => void;
}

const destinationCopy = {
    moon: {
        eyebrow: "LUNAR EXPLORATION ARCHIVE",
        title: "THE MOON",
        subtitle:
            "Humanity's earliest footsteps left more than footprints. Discover the machines that prepared the way, explored the surface and continued science after the astronauts went home.",
        accent: "LUNAR RECORDS",
    },
    mars: {
        eyebrow: "MARTIAN EXPLORATION ARCHIVE",
        title: "MARS",
        subtitle:
            "From tiny robotic explorers to machines that changed how we understand another planet, discover the stories behind humanity's Martian legacy.",
        description:
            "Explore the history of Mars exploration and the remarkable achievements of our robotic emissaries.",
        accent: "MARTIAN RECORDS",
    },
};

export function ArtifactExplorer({
    destination,
    onSelect,
    onChangeDestination,
}: ArtifactExplorerProps) {
    const items = getArtifactsByDestination(destination);
    const copy = destinationCopy[destination];

    return (
        <section className="artifact-explorer">
            <div className="archive-heading">
                <div>
                    <p className="archive-eyebrow">
                        <span className="kicker-line" />
                        {copy.eyebrow}
                    </p>

                    <h1>{copy.title}</h1>

                    <p className="archive-description">
                        {copy.subtitle}
                    </p>
                </div>

                <button
                    type="button"
                    className="archive-back"
                    onClick={onChangeDestination}
                >
                    ← CHANGE DESTINATION
                </button>
            </div>

            <div className="archive-summary">
                <div>
                    <span>COLLECTION</span>
                    <strong>{copy.accent}</strong>
                </div>

                <div>
                    <span>ARTIFACTS</span>
                    <strong>{String(items.length).padStart(2, "0")}</strong>
                </div>

                <div>
                    <span>EXPLORE</span>
                    <strong>MISSION STORIES</strong>
                </div>
            </div>

            <div className="artifact-grid">
                {items.map((artifact, index) => (
                    <button
                        type="button"
                        key={artifact.id}
                        className="artifact-card"
                        onClick={() => onSelect(artifact)}
                        aria-label={`Explore the story of ${artifact.name}`}
                    >
                        <div className="artifact-image">
                            <img
                                src={artifact.image}
                                alt={artifact.imageAlt}
                                loading={index < 3 ? "eager" : "lazy"}
                            />

                            <span className="artifact-index">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <span className="artifact-open">
                                EXPLORE ↗
                            </span>
                        </div>

                        <div className="artifact-card-content">
                            <div className="artifact-meta">
                                <span>{artifact.year}</span>
                                <span>{artifact.category}</span>
                            </div>

                            <h2>{artifact.name}</h2>

                            <p>{artifact.tagline}</p>

                            <div className="artifact-card-footer">
                                <span className="artifact-status">
                                    <span />
                                    {artifact.status}
                                </span>

                                <span className="artifact-arrow">↗</span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <footer className="archive-footer">
                <span>COSMIC FOOTPRINTS / HISTORICAL COLLECTION</span>
                <span>NASA MISSIONS & SCIENTIFIC LEGACY</span>
            </footer>
        </section>
    );
}

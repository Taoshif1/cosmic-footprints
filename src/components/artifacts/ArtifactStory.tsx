import type { Artifact } from "../../data/artifacts";

interface ArtifactStoryProps {
    artifact: Artifact;
    onBack: () => void;
}

export function ArtifactStory({
    artifact,
    onBack,
}: ArtifactStoryProps) {
    return (
        <article className="artifact-story">
            <div className="story-topbar">
                <button
                    type="button"
                    className="archive-back"
                    onClick={onBack}
                >
                    ← BACK TO ARCHIVE
                </button>

                <span className="story-edition">
                    COSMIC FOOTPRINTS / FIELD RECORD
                </span>
            </div>

            <section className="story-hero">
                <img
                    src={artifact.image}
                    alt={artifact.imageAlt}
                    className="story-hero-image"
                />

                <div className="story-hero-shade" />

                <div className="story-hero-content">
                    <p className="archive-eyebrow">
                        {artifact.destination.toUpperCase()} / {artifact.category.toUpperCase()}
                    </p>

                    <h1>{artifact.name}</h1>

                    <p className="story-tagline">
                        {artifact.tagline}
                    </p>

                    <div className="story-identifiers">
                        <span>{artifact.year}</span>
                        <span>{artifact.mission}</span>
                    </div>
                </div>
            </section>

            <p className="story-image-caption">
                {artifact.imageCaption}
                {" "}Credit: {artifact.imageCredit}.
                {artifact.imageType === "artist-concept" && (
                    <strong> Artist's concept.</strong>
                )}
            </p>

            <div className="story-body">
                <aside className="story-sidebar">
                    <div className="story-status">
                        <span className="status-indicator" />
                        <span>MISSION STATUS</span>

                        <strong>{artifact.status}</strong>

                        <p>{artifact.statusDetail}</p>
                    </div>

                    <div className="story-location">
                        <span>CURRENT LOCATION</span>
                        <strong>{artifact.currentLocation}</strong>
                    </div>

                    <div className="story-highlights">
                        <span>MISSION HIGHLIGHTS</span>

                        <ul>
                            {artifact.highlights.map((highlight) => (
                                <li key={highlight}>{highlight}</li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <div className="story-main">
                    <section className="story-section">
                        <p className="story-section-index">01 / THE BEGINNING</p>

                        <h2>Why was it sent?</h2>

                        <p>{artifact.purpose}</p>
                    </section>

                    <section className="story-section">
                        <p className="story-section-index">02 / THE JOURNEY</p>

                        <h2>Its story</h2>

                        {artifact.story.split("\n\n").map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </section>

                    <section className="story-section">
                        <p className="story-section-index">03 / SCIENCE LEGACY</p>

                        <h2>What did it teach us?</h2>

                        <ul className="discovery-list">
                            {artifact.discoveries.map((discovery) => (
                                <li key={discovery}>
                                    <span>✦</span>
                                    {discovery}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="story-section final-chapter">
                        <p className="story-section-index">04 / THE FINAL CHAPTER</p>

                        <h2>What happened next?</h2>

                        <p>{artifact.finalChapter}</p>

                        <div className="final-status">
                            <span>WHERE IT RESTS</span>
                            <strong>{artifact.currentLocation}</strong>
                        </div>
                    </section>

                    <section className="story-section">
                        <p className="story-section-index">05 / MISSION TIMELINE</p>

                        <h2>A journey through time.</h2>

                        <div className="mission-timeline">
                            {artifact.timeline.map((milestone, index) => (
                                <div
                                    className="timeline-event"
                                    key={`${milestone.date}-${index}`}
                                >
                                    <div className="timeline-marker">
                                        <span />
                                    </div>

                                    <div className="timeline-content">
                                        <span>{milestone.date}</span>

                                        <h3>{milestone.title}</h3>

                                        <p>{milestone.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="story-sources">
                        <p className="story-section-index">06 / VERIFIED SOURCES</p>

                        <h2>Explore further.</h2>

                        <p>
                            Discover the original mission records and scientific
                            information from NASA.
                        </p>

                        <div className="source-links">
                            {artifact.sources.map((source) => (
                                <a
                                    key={source.url}
                                    href={source.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {source.label}
                                    <span>↗</span>
                                </a>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <footer className="story-footer">
                <span>COSMIC FOOTPRINTS</span>
                <span>THE MACHINES MAY BE SILENT. THEIR DISCOVERIES AREN'T.</span>
            </footer>
        </article>
    );
}

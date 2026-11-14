import {
  getArtifactsByDestination,
  type Artifact,
  type Destination,
} from "../../data/artifacts";
import { getPlanetMarkers } from "../../data/planetMarkers";

interface ArtifactExplorerProps {
  destination: Destination;
  onSelect: (artifact: Artifact) => void;
  onChangeDestination: () => void;
}

const destinationCopy = {
  moon: {
    eyebrow: "LUNAR SURFACE / ARCHIVE CONTROL",
    title: "THE MOON",
    subtitle:
      "A world marked by landers, rovers and experiments that kept working long after the astronauts returned home.",
    descriptor: "LUNAR FIELD RECORDS",
  },
  mars: {
    eyebrow: "MARTIAN SURFACE / ARCHIVE CONTROL",
    title: "MARS",
    subtitle:
      "Meet the robotic explorers that crossed the red terrain, listened to the planet and changed what we know about its past.",
    descriptor: "MARTIAN FIELD RECORDS",
  },
};

export function ArtifactExplorer({
  destination,
  onSelect,
  onChangeDestination,
}: ArtifactExplorerProps) {
  const artifacts = getArtifactsByDestination(destination);
  const markers = getPlanetMarkers(destination);
  const copy = destinationCopy[destination];

  return (
    <section className="archive-explorer-layout">
      <div className="archive-panel archive-explorer-panel">
        <div className="archive-panel-topline">
          <p className="archive-eyebrow">
            <span className="kicker-line" />
            {copy.eyebrow}
          </p>

          <button
            type="button"
            className="archive-back"
            onClick={onChangeDestination}
          >
            CHANGE WORLD
          </button>
        </div>

        <h1 className="archive-world-title">{copy.title}</h1>

        <p className="archive-world-description">{copy.subtitle}</p>

        <div className="archive-world-stats">
          <div>
            <span>ARTIFACT RECORDS</span>
            <strong>{String(artifacts.length).padStart(2, "0")}</strong>
          </div>
          <div>
            <span>SURFACE SIGNALS</span>
            <strong>{String(markers.length).padStart(2, "0")}</strong>
          </div>
          <div>
            <span>COLLECTION</span>
            <strong>{copy.descriptor}</strong>
          </div>
        </div>

        <div className="archive-list-heading">
          <span>EXPLORER REGISTER</span>
          <span>SELECT A RECORD</span>
        </div>

        <div className="archive-signal-list">
          {artifacts.map((artifact, index) => {
            const artifactMarkers = markers.filter(
              (marker) => marker.artifactId === artifact.id,
            );

            return (
              <button
                type="button"
                key={artifact.id}
                className="archive-list-item"
                onClick={() => onSelect(artifact)}
              >
                <span className="archive-list-index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="archive-list-copy">
                  <strong>{artifact.name}</strong>
                  <small>{artifact.category} / {artifact.year}</small>
                  <span className="archive-list-marker-labels">
                    {artifactMarkers.map((marker) => marker.code).join("  ·  ")}
                  </span>
                </span>

                <span className="archive-list-count">
                  {String(artifactMarkers.length).padStart(2, "0")}
                  <small>SIGNALS</small>
                </span>

                <span className="archive-list-arrow">↗</span>
              </button>
            );
          })}
        </div>

        <div className="archive-map-note">
          <span className="map-note-dot" />
          <p>
            Glowing markers identify mission records. Their positions on this
            rotating globe are illustrative, not precise landing coordinates.
          </p>
        </div>
      </div>

      <div className="archive-globe-instruction" aria-hidden="true">
        <span className="globe-instruction-dot" />
        SELECT A GLOWING SURFACE MARKER
      </div>

      <div className="archive-globe-caption" aria-hidden="true">
        <span>PLANETARY SURFACE / ROTATING VIEW</span>
        <span>MISSION MARKERS ARE NOT TO SCALE</span>
      </div>
    </section>
  );
}

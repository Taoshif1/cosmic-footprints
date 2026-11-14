import { useMemo, useState } from "react";

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
    searchHint: "Search lunar missions, equipment or years...",
  },
  mars: {
    eyebrow: "MARTIAN SURFACE / ARCHIVE CONTROL",
    title: "MARS",
    subtitle:
      "Meet the robotic explorers that crossed the red terrain, listened to the planet and changed what we know about its past.",
    descriptor: "MARTIAN FIELD RECORDS",
    searchHint: "Search Mars missions, equipment or years...",
  },
} satisfies Record<Destination, {
  eyebrow: string;
  title: string;
  subtitle: string;
  descriptor: string;
  searchHint: string;
}>;

export function ArtifactExplorer({
  destination,
  onSelect,
  onChangeDestination,
}: ArtifactExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const artifacts = getArtifactsByDestination(destination);
  const markers = getPlanetMarkers(destination);
  const copy = destinationCopy[destination];

  const categories = useMemo(
    () => ["ALL", ...Array.from(new Set(artifacts.map((artifact) => artifact.category))).sort()],
    [artifacts],
  );

  const filteredArtifacts = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();

    return artifacts.filter((artifact) => {
      const matchesCategory =
        activeCategory === "ALL" || artifact.category === activeCategory;
      const searchableText = [
        artifact.name,
        artifact.mission,
        artifact.year,
        artifact.category,
        artifact.tagline,
        artifact.description,
        ...artifact.highlights,
      ]
        .join(" ")
        .toLocaleLowerCase();

      return matchesCategory && (!query || searchableText.includes(query));
    });
  }, [activeCategory, artifacts, searchQuery]);

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("ALL");
  };

  return (
    <section className="archive-explorer-layout" aria-label={`${copy.title} mission archive`}>
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
          <span>{String(filteredArtifacts.length).padStart(2, "0")} MATCHING RECORDS</span>
        </div>

        <div className="archive-discovery-tools">
          <label className="archive-search" htmlFor="archive-search">
            <span aria-hidden="true">⌕</span>
            <input
              id="archive-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={copy.searchHint}
              autoComplete="off"
            />
            {searchQuery && (
              <button
                type="button"
                className="archive-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </label>

          <div className="archive-category-filters" aria-label="Filter missions by category">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={`archive-filter-chip${activeCategory === category ? " is-active" : ""}`}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category === "ALL" ? "ALL RECORDS" : category}
              </button>
            ))}
          </div>
        </div>

        <div className="archive-signal-list" aria-live="polite" aria-busy="false">
          {filteredArtifacts.length > 0 ? (
            filteredArtifacts.map((artifact) => {
              const originalIndex = artifacts.findIndex((item) => item.id === artifact.id);
              const artifactMarkers = markers.filter(
                (marker) => marker.artifactId === artifact.id,
              );

              return (
                <button
                  type="button"
                  key={artifact.id}
                  className="archive-list-item"
                  onClick={() => onSelect(artifact)}
                  aria-label={`Explore ${artifact.name}, ${artifact.category}, ${artifact.year}`}
                >
                  <span className="archive-list-index">
                    {String(originalIndex + 1).padStart(2, "0")}
                  </span>

                  <span className="archive-list-copy">
                    <strong>{artifact.name}</strong>
                    <small>{artifact.category} / {artifact.year}</small>
                    <span className="archive-list-marker-labels">
                      {artifactMarkers.map((marker) => marker.code).join("  ·  ") || "MISSION RECORD"}
                    </span>
                  </span>

                  <span className="archive-list-count">
                    {String(artifactMarkers.length).padStart(2, "0")}
                    <small>SIGNALS</small>
                  </span>

                  <span className="archive-list-arrow" aria-hidden="true">↗</span>
                </button>
              );
            })
          ) : (
            <div className="archive-empty-state" role="status">
              <span className="archive-empty-icon" aria-hidden="true">⌕</span>
              <strong>NO MATCHING MISSION RECORDS</strong>
              <p>Try another keyword or choose a different category to continue exploring.</p>
              <button type="button" onClick={clearFilters}>CLEAR ALL FILTERS</button>
            </div>
          )}
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
        DRAG TO ROTATE  /  SELECT A GLOWING SURFACE MARKER
      </div>

      <div className="archive-globe-caption" aria-hidden="true">
        <span>PLANETARY SURFACE / ROTATING VIEW</span>
        <span>MISSION MARKERS ARE NOT TO SCALE</span>
      </div>
    </section>
  );
}

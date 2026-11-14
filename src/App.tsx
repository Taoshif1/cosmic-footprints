
import { useCallback, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import {
  SpaceScene,
  type Destination,
  type SceneMode,
} from "./components/experience/SpaceScene";

import { useReducedMotion } from "./hooks/useReducedMotion";

import "./App.css";

gsap.registerPlugin(useGSAP);

function App() {
  const rootRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();

  const [mode, setMode] = useState<SceneMode>("intro");

  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  const handleDestinationSelect = useCallback(
    (destination: Destination) => {
      if (mode !== "destinations") return;

      setSelectedDestination(destination);
      setMode("traveling");
    },
    [mode],
  );

  const handleArrival = useCallback(
    (_destination: Destination) => {
      setMode("archive");
    },
    [],
  );

  const beginExploration = () => {
    setMode("destinations");
  };

  const returnToDestinations = () => {
    setSelectedDestination(null);
    setMode("destinations");
  };

  const returnToEarth = () => {
    setSelectedDestination(null);
    setMode("intro");
  };

  useGSAP(
    () => {
      if (reducedMotion) return;

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      if (mode === "intro") {
        timeline
          .fromTo(
            ".site-header",
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.9 },
          )
          .fromTo(
            ".intro-kicker",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.75 },
            "-=0.4",
          )
          .fromTo(
            ".intro-title-line",
            {
              opacity: 0,
              y: 55,
              rotateX: -15,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 1.1,
              stagger: 0.14,
            },
            "-=0.4",
          )
          .fromTo(
            ".intro-description",
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.6",
          )
          .fromTo(
            ".hero-actions",
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.5",
          )
          .fromTo(
            ".hero-meta",
            { opacity: 0 },
            { opacity: 1, duration: 0.8 },
          );
      }

      if (mode === "destinations") {
        timeline
          .fromTo(
            ".destination-heading",
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.85 },
          )
          .fromTo(
            ".destination-controls",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.85 },
            "-=0.35",
          )
          .fromTo(
            ".destination-hint",
            { opacity: 0 },
            { opacity: 1, duration: 0.7 },
            "-=0.3",
          );
      }

      if (mode === "traveling") {
        timeline.fromTo(
          ".travel-overlay",
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.7 },
        );
      }

      if (mode === "archive") {
        timeline
          .fromTo(
            ".archive-copy",
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.9 },
          );
      }

      return () => timeline.kill();
    },
    {
      scope: rootRef,
      dependencies: [mode, reducedMotion],
      revertOnUpdate: true,
    },
  );

  const destinationName =
    selectedDestination === "moon"
      ? "THE MOON"
      : "MARS";

  return (
    <div ref={rootRef} className={`experience-shell experience-${mode}`}>
      <SpaceScene
        mode={mode}
        selectedDestination={selectedDestination}
        reducedMotion={reducedMotion}
        onDestinationSelect={handleDestinationSelect}
        onArrival={handleArrival}
      />

      <div className="space-vignette" aria-hidden="true" />

      <header className="site-header">
        <a
          href="/"
          className="brand"
          onClick={(event) => {
            event.preventDefault();
            returnToEarth();
          }}
        >
          <span className="brand-symbol">✦</span>
          <span>COSMIC FOOTPRINTS</span>
        </a>

        <p className="header-caption">
          AN INTERACTIVE SPACE HERITAGE ATLAS
        </p>

        {mode !== "intro" && (
          <button
            type="button"
            className="earth-return"
            onClick={returnToEarth}
            disabled={mode === "traveling"}
          >
            RETURN TO EARTH
          </button>
        )}
      </header>

      <main className="experience-main">
        {mode === "intro" && (
          <section className="hero-copy">
            <p className="intro-kicker">
              <span className="kicker-line" />
              A JOURNEY THROUGH HUMANITY'S SPACE LEGACY
            </p>

            <h1 className="intro-title">
              <span className="intro-title-line">
                COSMIC
              </span>

              <span className="intro-title-line title-outline">
                FOOTPRINTS
              </span>
            </h1>

            <p className="intro-description">
              The machines may be silent. Their discoveries
              aren't.

              <span>
                Journey across the Solar System and discover
                the explorers humanity left behind.
              </span>
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="launch-button"
                onClick={beginExploration}
              >
                BEGIN EXPLORATION
                <span aria-hidden="true">↗</span>
              </button>

              <span className="action-caption">
                YOUR JOURNEY STARTS HERE
              </span>
            </div>
          </section>
        )}

        {mode === "destinations" && (
          <section className="destination-interface">
            <div className="destination-heading">
              <p className="intro-kicker">
                <span className="kicker-line" />
                MISSION CONTROL / DEPARTURE POINT: EARTH
              </p>

              <h1>
                CHOOSE YOUR <span>DESTINATION.</span>
              </h1>

              <p className="destination-hint">
                SELECT A PLANET TO BEGIN YOUR JOURNEY
              </p>
            </div>

            <div className="destination-controls">
              <button
                type="button"
                className="destination-control moon-control"
                onClick={() => handleDestinationSelect("moon")}
              >
                <span className="control-number">01</span>

                <span className="control-details">
                  <strong>THE MOON</strong>
                  <small>LUNAR EXPLORATION</small>
                </span>

                <span className="control-status">AVAILABLE ↗</span>
              </button>

              <button
                type="button"
                className="destination-control mars-control"
                onClick={() => handleDestinationSelect("mars")}
              >
                <span className="control-number">02</span>

                <span className="control-details">
                  <strong>MARS</strong>
                  <small>THE RED PLANET</small>
                </span>

                <span className="control-status">AVAILABLE ↗</span>
              </button>

              <button
                type="button"
                className="destination-control beyond-control"
                disabled
                aria-label="Beyond: locked, coming soon"
              >
                <span className="control-number">03</span>

                <span className="control-details">
                  <strong>BEYOND</strong>
                  <small>DEEP SPACE EXPLORATION</small>
                </span>

                <span className="control-status">
                  <span aria-hidden="true">▣</span> LOCKED
                </span>
              </button>
            </div>

            <p className="destination-footnote">
              CLICK ON A PLANET OR SELECT A DESTINATION ABOVE
            </p>
          </section>
        )}

        {mode === "traveling" && (
          <section className="travel-overlay" aria-live="polite">
            <span className="travel-indicator">
              <span />
              COURSE INITIATED
            </span>

            <h1>
              TRAVELLING TO
              <span>{destinationName}</span>
            </h1>

            <p>
              Preparing for arrival. The journey beyond Earth
              begins here.
            </p>
          </section>
        )}

        {mode === "archive" && (
          <section className="archive-copy">
            <p className="intro-kicker">
              <span className="kicker-line" />
              DESTINATION REACHED / MISSION ARCHIVE
            </p>

            <h1 className="archive-title">
              {destinationName}
            </h1>

            <p>
              Every machine left behind has a story.
              Explore the explorers, their discoveries,
              and the legacy they left beyond Earth.
            </p>

            <div className="archive-actions">
              <button
                type="button"
                className="launch-button"
                onClick={returnToDestinations}
              >
                CHOOSE ANOTHER DESTINATION
                <span aria-hidden="true">↗</span>
              </button>
            </div>

            <p className="archive-coming-soon">
              ARTIFACT EXPLORER / UNDER DEVELOPMENT
            </p>
          </section>
        )}
      </main>

      {mode === "intro" && (
        <footer className="hero-meta">
          <span>ORIGIN POINT / EARTH</span>
          <span>HUMANITY'S OFFWORLD LEGACY / 001</span>
        </footer>
      )}
    </div>
  );
}

export default App;

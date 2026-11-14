import { useEffect, useRef } from "react";
import * as THREE from "three";

import type { Artifact, Destination } from "../../data/artifacts";
import { getPlanetMarkers } from "../../data/planetMarkers";

interface ArchivePlanetSceneProps {
  destination: Destination;
  artifacts: Artifact[];
  selectedArtifactId: string | null;
  reducedMotion: boolean;
  onSelectArtifact: (artifactId: string) => void;
}

interface MarkerEntry {
  artifactId: string;
  group: THREE.Group;
  hitArea: THREE.Mesh;
  ringMaterial: THREE.MeshBasicMaterial;
}

function createMarkerLabel(code: string, accent: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 192;
  canvas.height = 88;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Unable to create marker label canvas.");
  }

  const x = 8;
  const y = 12;
  const width = 176;
  const height = 64;
  const radius = 18;

  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height,
  );
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();

  context.fillStyle = "rgba(4, 10, 20, 0.94)";
  context.fill();

  const color = new THREE.Color(accent);
  context.strokeStyle = "#" + color.getHexString();
  context.lineWidth = 3;
  context.stroke();

  context.font = "700 31px Arial, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "#f4f7ff";
  context.fillText(code, canvas.width / 2, canvas.height / 2 + 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}

function getSurfaceDirection(latitude: number, longitude: number) {
  const latitudeRadians = THREE.MathUtils.degToRad(latitude);
  const longitudeRadians = THREE.MathUtils.degToRad(longitude);

  return new THREE.Vector3(
    Math.cos(latitudeRadians) * Math.sin(longitudeRadians),
    Math.sin(latitudeRadians),
    Math.cos(latitudeRadians) * Math.cos(longitudeRadians),
  ).normalize();
}

export function ArchivePlanetScene({
  destination,
  artifacts,
  selectedArtifactId,
  reducedMotion,
  onSelectArtifact,
}: ArchivePlanetSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const selectedArtifactRef = useRef(selectedArtifactId);
  const onSelectRef = useRef(onSelectArtifact);

  useEffect(() => {
    selectedArtifactRef.current = selectedArtifactId;
    onSelectRef.current = onSelectArtifact;
  }, [selectedArtifactId, onSelectArtifact]);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) return;

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch (error) {
      console.error("Archive globe could not initialize WebGL:", error);
      mount.dataset.webglUnavailable = "true";
      return;
    }

    mount.dataset.webglUnavailable = "false";

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x02050d, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.style.cursor = "grab";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    scene.add(
      new THREE.HemisphereLight(
        destination === "mars" ? 0xffc9a8 : 0xc7d9ff,
        0x101522,
        1.45,
      ),
    );

    const keyLight = new THREE.DirectionalLight(0xfff1df, 3.1);
    keyLight.position.set(-4.5, 3.2, 5.5);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(
      destination === "mars" ? 0xd9784e : 0x729edc,
      2.1,
      18,
    );
    fillLight.position.set(4, -2, 3);
    scene.add(fillLight);

    const textureLoader = new THREE.TextureLoader();
    const loadedTextures: THREE.Texture[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    const globeRadius = destination === "moon" ? 2.34 : 2.42;
    const accentColor = destination === "moon" ? 0x9fc6ff : 0xffa27c;

    const texture = textureLoader.load(
      destination === "moon"
        ? "/textures/moon_1024.jpg"
        : "/textures/mars_2k.jpg",
      undefined,
      undefined,
      (error) => {
        console.error("Archive planet texture failed to load:", error);
      },
    );

    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(
      renderer.capabilities.getMaxAnisotropy(),
      8,
    );
    loadedTextures.push(texture);

    const planetGroup = new THREE.Group();
    planetGroup.rotation.z = destination === "mars" ? 0.33 : 0.12;
    scene.add(planetGroup);

    const planetGeometry = new THREE.SphereGeometry(
      globeRadius,
      128,
      128,
    );
    geometries.push(planetGeometry);

    const planetMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: destination === "moon" ? 0.98 : 1,
      metalness: 0,
    });
    materials.push(planetMaterial);

    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planetGroup.add(planet);

    const haloGeometry = new THREE.SphereGeometry(
      globeRadius * 1.045,
      96,
      96,
    );
    geometries.push(haloGeometry);

    const haloMaterial = new THREE.MeshBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: destination === "moon" ? 0.105 : 0.18,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    materials.push(haloMaterial);

    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    planetGroup.add(halo);

    const outerHaloGeometry = new THREE.SphereGeometry(
      globeRadius * 1.09,
      64,
      64,
    );
    geometries.push(outerHaloGeometry);

    const outerHaloMaterial = new THREE.MeshBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.035,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    materials.push(outerHaloMaterial);

    const outerHalo = new THREE.Mesh(
      outerHaloGeometry,
      outerHaloMaterial,
    );
    planetGroup.add(outerHalo);

    // A restrained star field keeps the historical globe in a cinematic setting.
    const starCount = 1250;
    const starPositions = new Float32Array(starCount * 3);

    for (let index = 0; index < starCount; index += 1) {
      const radius = THREE.MathUtils.randFloat(13, 25);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[index * 3] =
        radius * Math.sin(phi) * Math.cos(theta);
      starPositions[index * 3 + 1] =
        radius * Math.sin(phi) * Math.sin(theta);
      starPositions[index * 3 + 2] = radius * Math.cos(phi);
    }

    const starGeometry = new THREE.BufferGeometry();
    geometries.push(starGeometry);

    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );

    const starMaterial = new THREE.PointsMaterial({
      color: 0xc5d9ff,
      size: 0.035,
      transparent: true,
      opacity: 0.72,
      sizeAttenuation: true,
      depthWrite: false,
    });
    materials.push(starMaterial);

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Each marker is attached to the rotating globe and moves with its surface.
    const availableIds = new Set(artifacts.map((artifact) => artifact.id));
    const markerDefinitions = getPlanetMarkers(destination).filter(
      (marker) => availableIds.has(marker.artifactId),
    );

    const markerEntries: MarkerEntry[] = [];
    const markerHitAreas: THREE.Mesh[] = [];
    const markerForward = new THREE.Vector3(0, 0, 1);

    markerDefinitions.forEach((definition) => {
      const markerGroup = new THREE.Group();
      const direction = getSurfaceDirection(
        definition.latitude,
        definition.longitude,
      );

      markerGroup.position.copy(
        direction.clone().multiplyScalar(globeRadius * 1.012),
      );

      markerGroup.quaternion.setFromUnitVectors(
        markerForward,
        direction,
      );

      const pulseGeometry = new THREE.RingGeometry(0.105, 0.135, 36);
      geometries.push(pulseGeometry);

      const pulseMaterial = new THREE.MeshBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      });
      materials.push(pulseMaterial);

      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
      pulse.position.z = 0.015;
      markerGroup.add(pulse);

      const ringGeometry = new THREE.RingGeometry(0.068, 0.096, 36);
      geometries.push(ringGeometry);

      const ringMaterial = new THREE.MeshBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.88,
        side: THREE.DoubleSide,
        depthWrite: false,
        toneMapped: false,
      });
      materials.push(ringMaterial);

      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.z = 0.04;
      markerGroup.add(ring);

      const centerGeometry = new THREE.CircleGeometry(0.052, 32);
      geometries.push(centerGeometry);

      const centerMaterial = new THREE.MeshBasicMaterial({
        color: 0xf7fbff,
        side: THREE.DoubleSide,
        toneMapped: false,
      });
      materials.push(centerMaterial);

      const center = new THREE.Mesh(centerGeometry, centerMaterial);
      center.position.z = 0.045;
      markerGroup.add(center);

      const labelTexture = createMarkerLabel(
        definition.code,
        accentColor,
      );
      loadedTextures.push(labelTexture);

      const labelMaterial = new THREE.SpriteMaterial({
        map: labelTexture,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        toneMapped: false,
      });
      materials.push(labelMaterial);

      const label = new THREE.Sprite(labelMaterial);
      label.position.set(0, 0.22, 0.075);
      label.scale.set(0.48, 0.22, 1);
      markerGroup.add(label);

      const hitGeometry = new THREE.SphereGeometry(0.18, 16, 12);
      geometries.push(hitGeometry);

      const hitMaterial = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        colorWrite: false,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      materials.push(hitMaterial);

      const hitArea = new THREE.Mesh(hitGeometry, hitMaterial);
      hitArea.position.z = 0.065;
      hitArea.userData.artifactId = definition.artifactId;
      markerGroup.add(hitArea);

      planetGroup.add(markerGroup);
      markerHitAreas.push(hitArea);

      markerEntries.push({
        artifactId: definition.artifactId,
        group: markerGroup,
        hitArea,
        ringMaterial,
      });
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    let hoveredMarker: MarkerEntry | null = null;
    let activePointerId: number | null = null;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let dragDistance = 0;
    let suppressNextClick = false;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;

    const updatePointer = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();

      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const findMarkerAtPointer = () => {
      raycaster.setFromCamera(pointer, camera);

      const intersections = raycaster.intersectObjects(
        [planet, ...markerHitAreas],
        false,
      );

      const firstHit = intersections[0];

      if (!firstHit || firstHit.object === planet) return null;

      return (
        markerEntries.find(
          (entry) => entry.hitArea === firstHit.object,
        ) ?? null
      );
    };

    const clearHoveredMarker = () => {
      hoveredMarker = null;
      renderer.domElement.style.cursor = "default";
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0 && event.pointerType !== "touch") return;

      activePointerId = event.pointerId;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      dragDistance = 0;
      suppressNextClick = false;
      rotationVelocityX = 0;
      rotationVelocityY = 0;

      renderer.domElement.setPointerCapture(event.pointerId);
      renderer.domElement.style.cursor = "grabbing";
      clearHoveredMarker();
    };

    const handlePointerMove = (event: PointerEvent) => {
      updatePointer(event);

      if (activePointerId === event.pointerId) {
        const deltaX = event.clientX - lastPointerX;
        const deltaY = event.clientY - lastPointerY;
        lastPointerX = event.clientX;
        lastPointerY = event.clientY;
        dragDistance = Math.hypot(
          event.clientX - pointerStartX,
          event.clientY - pointerStartY,
        );

        if (dragDistance > 4) {
          planetGroup.rotation.y += deltaX * 0.008;
          planetGroup.rotation.x = THREE.MathUtils.clamp(
            planetGroup.rotation.x + deltaY * 0.006,
            -0.78,
            0.78,
          );
          rotationVelocityY = deltaX * 0.0009;
          rotationVelocityX = deltaY * 0.00065;
          renderScene();
        }
        return;
      }

      const nextMarker = findMarkerAtPointer();

      if (nextMarker === hoveredMarker) return;

      hoveredMarker = nextMarker;
      renderer.domElement.style.cursor = nextMarker ? "pointer" : "grab";
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (activePointerId !== event.pointerId) return;

      suppressNextClick = dragDistance > 5;
      activePointerId = null;
      renderer.domElement.style.cursor = "grab";

      if (renderer.domElement.hasPointerCapture(event.pointerId)) {
        renderer.domElement.releasePointerCapture(event.pointerId);
      }
    };

    const handlePointerLeave = () => {
      if (activePointerId === null) clearHoveredMarker();
    };

    const handleClick = (event: MouseEvent) => {
      if (suppressNextClick) {
        suppressNextClick = false;
        return;
      }

      updatePointer(event as unknown as PointerEvent);

      const marker = findMarkerAtPointer();

      if (!marker) return;

      onSelectRef.current(marker.artifactId);
    };

    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    renderer.domElement.addEventListener("pointerup", handlePointerUp);
    renderer.domElement.addEventListener("pointercancel", handlePointerUp);
    renderer.domElement.addEventListener("pointerleave", handlePointerLeave);
    renderer.domElement.addEventListener("click", handleClick);

    const clock = new THREE.Clock();

    let animationFrame = 0;
    let disposed = false;

    const renderScene = () => {
      const elapsed = clock.elapsedTime;

      markerEntries.forEach((entry) => {
        const selected =
          selectedArtifactRef.current === entry.artifactId;

        const pulseAmount = reducedMotion
          ? 1
          : 1 + Math.sin(elapsed * 2.6 + entry.group.position.x) * 0.035;

        const selectedScale = selected ? 1.16 : 1;
        const hoverScale = hoveredMarker === entry ? 1.2 : 1;

        entry.group.scale.setScalar(selectedScale * hoverScale * pulseAmount);

        entry.ringMaterial.color.setHex(
          selected ? 0xffffff : accentColor,
        );

        entry.ringMaterial.opacity = selected ? 1 : 0.82;
      });

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    const animate = () => {
      if (disposed || document.hidden) return;

      animationFrame = window.requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.05);

      if (!reducedMotion) {
        planetGroup.rotation.y += delta * 0.018 + rotationVelocityY;
        planetGroup.rotation.x = THREE.MathUtils.clamp(
          planetGroup.rotation.x + rotationVelocityX,
          -0.78,
          0.78,
        );
        rotationVelocityY *= 0.92;
        rotationVelocityX *= 0.92;
        if (Math.abs(rotationVelocityY) < 0.00002) rotationVelocityY = 0;
        if (Math.abs(rotationVelocityX) < 0.00002) rotationVelocityX = 0;
        stars.rotation.y += delta * 0.00045;
      }

      renderScene();
    };

    const resize = () => {
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);
      const isMobile = width < 760;

      camera.aspect = width / height;
      camera.position.set(0, 0, isMobile ? 10.9 : 8.5);
      camera.updateProjectionMatrix();

      planetGroup.position.set(
        isMobile ? 0 : 2.05,
        isMobile ? 1.5 : 0.02,
        0,
      );

      const baseScale = isMobile ? 0.73 : 1;

      planetGroup.scale.setScalar(baseScale);

      renderer.setSize(width, height);
      renderScene();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    window.addEventListener("resize", resize);

    resize();

    if (reducedMotion) {
      renderScene();
    } else if (!document.hidden) {
      clock.start();
      animate();
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        }

        clock.stop();
        return;
      }

      if (!reducedMotion && !animationFrame) {
        clock.start();
        animate();
      } else {
        renderScene();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      disposed = true;

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );

      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener(
        "pointermove",
        handlePointerMove,
      );
      renderer.domElement.removeEventListener("pointerup", handlePointerUp);
      renderer.domElement.removeEventListener("pointercancel", handlePointerUp);
      renderer.domElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
      renderer.domElement.removeEventListener("click", handleClick);

      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      loadedTextures.forEach((loadedTexture) => loadedTexture.dispose());

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [destination, reducedMotion, artifacts]);

  return (
    <div
      ref={mountRef}
      className={"archive-planet-scene archive-planet-" + destination}
      aria-hidden="true"
    />
  );
}

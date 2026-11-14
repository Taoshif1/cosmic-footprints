
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

export type Destination = "moon" | "mars";

export type SceneMode =
    | "intro"
    | "destinations"
    | "traveling"
    | "archive";

interface SpaceSceneProps {
    mode: SceneMode;
    selectedDestination: Destination | null;
    reducedMotion: boolean;
    onDestinationSelect: (destination: Destination) => void;
    onArrival: (destination: Destination) => void;
}

interface SceneController {
    setMode: (mode: SceneMode) => void;
    travelTo: (destination: Destination) => void;
}

export function SpaceScene({
    mode,
    selectedDestination,
    reducedMotion,
    onDestinationSelect,
    onArrival,
}: SpaceSceneProps) {
    const mountRef = useRef<HTMLDivElement>(null);
    const controllerRef = useRef<SceneController | null>(null);

    const modeRef = useRef(mode);
    const onSelectRef = useRef(onDestinationSelect);
    const onArrivalRef = useRef(onArrival);

    useEffect(() => {
        const mount = mountRef.current;

        if (!mount) return;

        let renderer: THREE.WebGLRenderer;

        try {
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                powerPreference: "high-performance",
                alpha: false,
            });
        } catch (error) {
            console.error("Unable to initialize WebGL:", error);
            mount.dataset.webglUnavailable = "true";
            return;
        }

        mount.dataset.webglUnavailable = "false";

        // ========================================
        // SCENE AND CAMERA
        // ========================================

        const scene = new THREE.Scene();

        scene.background = new THREE.Color("#02050d");

        const camera = new THREE.PerspectiveCamera(
            38,
            1,
            0.1,
            100,
        );

        camera.position.set(0, 0, 7.55);

        const cameraTarget = new THREE.Vector3(0, 0, 0);

        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio || 1, 1.65),
        );

        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;

        mount.appendChild(renderer.domElement);

        const resize = () => {
            const width = mount.clientWidth || window.innerWidth;
            const height = mount.clientHeight || window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
            renderScene();
        };

        // ========================================
        // LIGHTING
        // ========================================

        scene.add(
            new THREE.HemisphereLight(
                0x9bbcff,
                0x080c18,
                1.05,
            ),
        );

        const sunlight = new THREE.DirectionalLight(
            0xfff3dd,
            3,
        );

        sunlight.position.set(-5, 2.5, 6);
        scene.add(sunlight);

        const rimLight = new THREE.PointLight(
            0x3577ff,
            3,
            24,
        );

        rimLight.position.set(5, -2, -4);
        scene.add(rimLight);

        // ========================================
        // TEXTURES
        // ========================================

        const textureLoader = new THREE.TextureLoader();

        const loadedTextures: THREE.Texture[] = [];

        const loadTexture = (
            path: string,
            isColor = false,
        ) => {
            const texture = textureLoader.load(
                path,
                undefined,
                undefined,
                (error) => {
                    console.error(`Texture loading failed: ${path}`, error);
                },
            );

            if (isColor) {
                texture.colorSpace = THREE.SRGBColorSpace;
            }

            texture.anisotropy = Math.min(
                renderer.capabilities.getMaxAnisotropy(),
                8,
            );

            loadedTextures.push(texture);

            return texture;
        };

        // Earth
        const earthMap = loadTexture(
            "/textures/earth_atmos_2048.jpg",
            true,
        );

        const earthNormal = loadTexture(
            "/textures/earth_normal_2048.jpg",
        );

        const earthSpecular = loadTexture(
            "/textures/earth_specular_2048.jpg",
        );

        const cloudMap = loadTexture(
            "/textures/earth_clouds_1024.png",
        );

        // Moon and Mars
        const moonMap = loadTexture(
            "/textures/moon_1024.jpg",
            true,
        );

        const marsMap = loadTexture(
            "/textures/mars_2k.jpg",
            true,
        );

        // ========================================
        // EARTH
        // ========================================

        const earthGroup = new THREE.Group();

        earthGroup.position.set(1.35, 0.05, 0);

        scene.add(earthGroup);

        const earthGeometry = new THREE.SphereGeometry(
            2.25,
            128,
            128,
        );

        const earthMaterial = new THREE.MeshPhongMaterial({
            map: earthMap,
            normalMap: earthNormal,
            normalScale: new THREE.Vector2(0.32, 0.32),
            specularMap: earthSpecular,
            specular: new THREE.Color(0x536b87),
            shininess: 18,
        });

        const earth = new THREE.Mesh(
            earthGeometry,
            earthMaterial,
        );

        earthGroup.add(earth);

        // Clouds
        const cloudGeometry = new THREE.SphereGeometry(
            2.275,
            128,
            128,
        );

        const cloudMaterial = new THREE.MeshPhongMaterial({
            color: 0xe4efff,
            alphaMap: cloudMap,
            transparent: true,
            opacity: 0.32,
            depthWrite: false,
            shininess: 2,
        });

        const clouds = new THREE.Mesh(
            cloudGeometry,
            cloudMaterial,
        );

        earthGroup.add(clouds);

        // Atmosphere
        const atmosphereMaterial = new THREE.ShaderMaterial({
            vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          vec4 mvPosition =
            modelViewMatrix * vec4(position, 1.0);

          vNormal = normalize(normalMatrix * normal);
          vViewPosition = -mvPosition.xyz;

          gl_Position =
            projectionMatrix * mvPosition;
        }
      `,

            fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          float intensity = pow(
            1.0 - max(
              dot(
                normalize(vNormal),
                normalize(vViewPosition)
              ),
              0.0
            ),
            3.0
          );

          vec3 color = vec3(0.16, 0.46, 1.0);

          gl_FragColor = vec4(
            color,
            intensity * 0.76
          );
        }
      `,

            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.FrontSide,
            depthWrite: false,
            toneMapped: false,
        });

        const atmosphere = new THREE.Mesh(
            new THREE.SphereGeometry(2.34, 96, 96),
            atmosphereMaterial,
        );

        earthGroup.add(atmosphere);

        const earthHaloMaterial = new THREE.MeshBasicMaterial({
            color: 0x1a54c9,
            transparent: true,
            opacity: 0.055,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const earthHalo = new THREE.Mesh(
            new THREE.SphereGeometry(2.43, 64, 64),
            earthHaloMaterial,
        );

        earthGroup.add(earthHalo);

        // ========================================
        // MOON
        // ========================================

        const moonGeometry = new THREE.SphereGeometry(
            0.82,
            96,
            96,
        );

        const moonMaterial = new THREE.MeshStandardMaterial({
            map: moonMap,
            roughness: 0.98,
            transparent: true,
            opacity: 0,
        });

        const moon = new THREE.Mesh(
            moonGeometry,
            moonMaterial,
        );

        moon.position.set(-14, 0, -2);
        moon.scale.setScalar(0.01);
        moon.userData.baseScale = 0.90;
        moon.userData.destination = "moon";

        scene.add(moon);

        // Moon atmospheric edge
        const moonHaloMaterial = new THREE.MeshBasicMaterial({
            color: 0xb7c5db,
            transparent: true,
            opacity: 0,
            side: THREE.BackSide,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        const moonHalo = new THREE.Mesh(
            new THREE.SphereGeometry(0.88, 64, 64),
            moonHaloMaterial,
        );

        moonHalo.position.copy(moon.position);
        moonHalo.scale.copy(moon.scale);

        scene.add(moonHalo);

        // ========================================
        // MARS
        // ========================================

        const marsGeometry = new THREE.SphereGeometry(
            1,
            96,
            96,
        );

        const marsMaterial = new THREE.MeshStandardMaterial({
            map: marsMap,
            roughness: 1,
            transparent: true,
            opacity: 0,
        });

        const mars = new THREE.Mesh(
            marsGeometry,
            marsMaterial,
        );

        mars.position.set(14, 0, -2);
        mars.scale.setScalar(0.01);
        mars.userData.baseScale = 0.96;
        mars.userData.destination = "mars";

        scene.add(mars);

        const marsHaloMaterial = new THREE.MeshBasicMaterial({
            color: 0xb9583c,
            transparent: true,
            opacity: 0,
            side: THREE.BackSide,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        const marsHalo = new THREE.Mesh(
            new THREE.SphereGeometry(1.08, 64, 64),
            marsHaloMaterial,
        );

        marsHalo.position.copy(mars.position);
        marsHalo.scale.copy(mars.scale);

        scene.add(marsHalo);

        // ========================================
        // DISTANT STARFIELD
        // ========================================

        const starCount = 2200;

        const starPositions = new Float32Array(
            starCount * 3,
        );

        for (let i = 0; i < starCount; i++) {
            const radius = THREE.MathUtils.randFloat(24, 48);

            const theta = Math.random() * Math.PI * 2;

            const phi = Math.acos(
                2 * Math.random() - 1,
            );

            starPositions[i * 3] =
                radius * Math.sin(phi) * Math.cos(theta);

            starPositions[i * 3 + 1] =
                radius * Math.sin(phi) * Math.sin(theta);

            starPositions[i * 3 + 2] =
                radius * Math.cos(phi);
        }

        const starGeometry = new THREE.BufferGeometry();

        starGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(starPositions, 3),
        );

        const starMaterial = new THREE.PointsMaterial({
            color: 0xcbdcff,
            size: 0.045,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
            depthWrite: false,
        });

        const starField = new THREE.Points(
            starGeometry,
            starMaterial,
        );

        scene.add(starField);

        // ========================================
        // ORBITAL DECORATION
        // ========================================

        const orbitGeometry = new THREE.BufferGeometry();

        const orbitPoints = new THREE.EllipseCurve(
            0,
            0,
            3.35,
            0.52,
            0,
            Math.PI * 2,
            false,
            0,
        ).getPoints(160);

        orbitGeometry.setFromPoints(
            orbitPoints.map(
                (point) => new THREE.Vector3(
                    point.x,
                    point.y,
                    -0.15,
                ),
            ),
        );

        const orbitMaterial = new THREE.LineBasicMaterial({
            color: 0x6382b9,
            transparent: true,
            opacity: 0,
            depthWrite: false,
        });

        const orbit = new THREE.LineLoop(
            orbitGeometry,
            orbitMaterial,
        );

        scene.add(orbit);

        // ========================================
        // RAYCASTING
        // ========================================

        const raycaster = new THREE.Raycaster();

        const pointer = new THREE.Vector2();

        const interactivePlanets = [moon, mars];

        let hoveredPlanet: THREE.Mesh | null = null;

        const updatePointer = (event: PointerEvent) => {
            const rect = renderer.domElement.getBoundingClientRect();

            pointer.x =
                ((event.clientX - rect.left) / rect.width) * 2 - 1;

            pointer.y =
                -((event.clientY - rect.top) / rect.height) * 2 + 1;
        };

        const raycastPlanet = () => {
            raycaster.setFromCamera(pointer, camera);

            const intersections = raycaster.intersectObjects(
                interactivePlanets,
                false,
            );

            return intersections.length
                ? (intersections[0].object as THREE.Mesh)
                : null;
        };

        const clearHover = () => {
            if (!hoveredPlanet) return;

            const previous = hoveredPlanet;

            const baseScale = previous.userData.baseScale as number;

            gsap.killTweensOf(previous.scale);
            previous.scale.setScalar(baseScale);

            hoveredPlanet = null;
            renderer.domElement.style.cursor = "default";
        };

        const handlePointerMove = (event: PointerEvent) => {
            if (modeRef.current !== "destinations") {
                clearHover();
                return;
            }

            updatePointer(event);

            const nextPlanet = raycastPlanet();

            if (nextPlanet === hoveredPlanet) return;

            clearHover();

            if (!nextPlanet) return;

            hoveredPlanet = nextPlanet;

            const baseScale = nextPlanet.userData.baseScale as number;
            const targetScale = baseScale * 1.13;

            renderer.domElement.style.cursor = "pointer";

            gsap.to(nextPlanet.scale, {
                x: targetScale,
                y: targetScale,
                z: targetScale,
                duration: 0.4,
                ease: "back.out(1.7)",
            });
        };

        const handleClick = (event: MouseEvent) => {
            if (modeRef.current !== "destinations") return;

            updatePointer(event as unknown as PointerEvent);

            const planet = raycastPlanet();

            if (!planet) return;

            const destination =
                planet.userData.destination as Destination;

            onSelectRef.current(destination);
        };

        const handlePointerLeave = () => {
            clearHover();
        };

        renderer.domElement.addEventListener(
            "pointermove",
            handlePointerMove,
        );

        renderer.domElement.addEventListener(
            "pointerleave",
            handlePointerLeave,
        );

        renderer.domElement.addEventListener(
            "click",
            handleClick,
        );

        // ========================================
        // CAMERA AND DESTINATION CONTROLLER
        // ========================================

        let activeTimeline: gsap.core.Timeline | null = null;

        const renderScene = () => {
            moonHalo.position.copy(moon.position);
            moonHalo.scale.copy(moon.scale);

            marsHalo.position.copy(mars.position);
            marsHalo.scale.copy(mars.scale);

            camera.lookAt(cameraTarget);
            renderer.render(scene, camera);
        };

        const showIntro = () => {
            activeTimeline?.kill();

            hoveredPlanet = null;

            const earthState = {
                x: 1.35,
                y: 0.05,
                z: 0,
                scale: 1,
            };

            if (reducedMotion) {
                earthGroup.position.set(
                    earthState.x,
                    earthState.y,
                    earthState.z,
                );

                earthGroup.scale.setScalar(1);

                moon.position.set(-14, 0, -2);
                moon.scale.setScalar(0.01);
                moonMaterial.opacity = 0;

                moonHaloMaterial.opacity = 0;

                mars.position.set(14, 0, -2);
                mars.scale.setScalar(0.01);
                marsMaterial.opacity = 0;

                marsHaloMaterial.opacity = 0;

                camera.position.set(0, 0, 7.55);
                cameraTarget.set(0, 0, 0);

                orbitMaterial.opacity = 0;

                renderScene();
                return;
            }

            activeTimeline = gsap.timeline();

            activeTimeline
                .to(camera.position, {
                    x: 0,
                    y: 0,
                    z: 7.55,
                    duration: 1.8,
                    ease: "power3.inOut",
                }, 0)
                .to(cameraTarget, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 1.8,
                    ease: "power3.inOut",
                }, 0)
                .to(earthGroup.position, {
                    x: earthState.x,
                    y: earthState.y,
                    z: earthState.z,
                    duration: 1.8,
                    ease: "power3.inOut",
                }, 0)
                .to(earthGroup.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 1.8,
                }, 0)
                .to(moonMaterial, {
                    opacity: 0,
                    duration: 0.5,
                }, 0)
                .to(marsMaterial, {
                    opacity: 0,
                    duration: 0.5,
                }, 0)
                .to(orbitMaterial, {
                    opacity: 0,
                    duration: 0.5,
                }, 0)
                .to(moon.scale, {
                    x: 0.01,
                    y: 0.01,
                    z: 0.01,
                    duration: 0.8,
                }, 0)
                .to(mars.scale, {
                    x: 0.01,
                    y: 0.01,
                    z: 0.01,
                    duration: 0.8,
                }, 0);
        };


        const showDestinations = () => {
            activeTimeline?.kill();
            clearHover();

            const isMobile = mount.clientWidth < 700;

            const layout = isMobile
                ? {
                    cameraZ: 10.1,
                    earth: { x: -1.0, y: 1.0, scale: 0.40 },
                    moon: { x: 1.0, y: 1.0, scale: 0.62 },
                    mars: { x: 0, y: -1.25, scale: 0.75 },
                }
                : {
                    cameraZ: 11,
                    earth: { x: -3.45, y: 0.25, scale: 0.53 },
                    moon: { x: 0, y: -0.30, scale: 0.90 },
                    mars: { x: 3.45, y: 0.25, scale: 0.96 },
                };

            const targetOrbitOpacity = isMobile ? 0 : 0.20;

            if (reducedMotion) {
                earthGroup.position.set(
                    layout.earth.x,
                    layout.earth.y,
                    0,
                );
                earthGroup.scale.setScalar(layout.earth.scale);

                moon.position.set(
                    layout.moon.x,
                    layout.moon.y,
                    0,
                );
                moon.scale.setScalar(layout.moon.scale);
                moonMaterial.opacity = 1;
                moonHaloMaterial.opacity = 0.09;

                mars.position.set(
                    layout.mars.x,
                    layout.mars.y,
                    0,
                );
                mars.scale.setScalar(layout.mars.scale);
                marsMaterial.opacity = 1;
                marsHaloMaterial.opacity = 0.12;

                camera.position.set(0, 0, layout.cameraZ);
                cameraTarget.set(0, 0, 0);

                orbitMaterial.opacity = targetOrbitOpacity;

                renderScene();
                return;
            }

            activeTimeline = gsap.timeline({
                defaults: {
                    ease: "power3.inOut",
                },
            });

            activeTimeline
                .to(camera.position, {
                    x: 0,
                    y: 0,
                    z: layout.cameraZ,
                    duration: 2.4,
                }, 0)
                .to(cameraTarget, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 2.4,
                }, 0)

                // Earth
                .to(earthGroup.position, {
                    x: layout.earth.x,
                    y: layout.earth.y,
                    z: 0,
                    duration: 2.2,
                }, 0.15)
                .to(earthGroup.scale, {
                    x: layout.earth.scale,
                    y: layout.earth.scale,
                    z: layout.earth.scale,
                    duration: 2.2,
                }, 0.15)

                // Moon
                .to(moon.position, {
                    x: layout.moon.x,
                    y: layout.moon.y,
                    z: 0,
                    duration: 2,
                }, 0.35)
                .to(moon.scale, {
                    x: layout.moon.scale,
                    y: layout.moon.scale,
                    z: layout.moon.scale,
                    duration: 1.9,
                    ease: "back.out(1.2)",
                }, 0.35)
                .to(moonMaterial, {
                    opacity: 1,
                    duration: 1.2,
                }, 0.7)
                .to(moonHaloMaterial, {
                    opacity: 0.09,
                    duration: 1.2,
                }, 0.7)

                // Mars
                .to(mars.position, {
                    x: layout.mars.x,
                    y: layout.mars.y,
                    z: 0,
                    duration: 2,
                }, 0.5)
                .to(mars.scale, {
                    x: layout.mars.scale,
                    y: layout.mars.scale,
                    z: layout.mars.scale,
                    duration: 1.9,
                    ease: "back.out(1.2)",
                }, 0.5)
                .to(marsMaterial, {
                    opacity: 1,
                    duration: 1.2,
                }, 0.8)
                .to(marsHaloMaterial, {
                    opacity: 0.12,
                    duration: 1.2,
                }, 0.8)

                // Desktop orbit decoration
                .to(orbitMaterial, {
                    opacity: targetOrbitOpacity,
                    duration: 1.2,
                }, 1.1);
        };


        const travelTo = (destination: Destination) => {
            activeTimeline?.kill();

            clearHover();

            const selected = destination === "moon" ? moon : mars;
            const other = destination === "moon" ? mars : moon;

            const otherHaloMaterial =
                destination === "moon"
                    ? marsHaloMaterial
                    : moonHaloMaterial;

            const destinationX = selected.position.x;
            const destinationY = selected.position.y;

            const travelDistance =
                destination === "moon" ? 3.65 : 4.45;

            if (reducedMotion) {
                camera.position.set(
                    destinationX,
                    destinationY,
                    travelDistance,
                );

                cameraTarget.set(
                    destinationX,
                    destinationY,
                    0,
                );

                other.material.opacity = 0;
                orbitMaterial.opacity = 0;

                renderScene();

                onArrivalRef.current(destination);
                return;
            }

            activeTimeline = gsap.timeline({
                onComplete: () => {
                    onArrivalRef.current(destination);
                },
            });

            activeTimeline
                .to(camera.position, {
                    x: destinationX,
                    y: destinationY,
                    z: travelDistance,
                    duration: 3.1,
                    ease: "power3.inOut",
                }, 0)
                .to(cameraTarget, {
                    x: destinationX,
                    y: destinationY,
                    z: 0,
                    duration: 3.1,
                    ease: "power3.inOut",
                }, 0)
                .to(other.material, {
                    opacity: 0,
                    duration: 1.1,
                }, 0.2)
                .to(otherHaloMaterial, {
                    opacity: 0,
                    duration: 1.1,
                }, 0.2)
                .to(orbitMaterial, {
                    opacity: 0,
                    duration: 1,
                }, 0)
                .to(starField.scale, {
                    x: 1.22,
                    y: 1.22,
                    z: 1.22,
                    duration: 2.7,
                    ease: "power2.in",
                }, 0)
                .to(starMaterial, {
                    size: 0.075,
                    opacity: 1,
                    duration: 1.2,
                }, 0.5)
                .to(selected.scale, {
                    x: selected.scale.x * 1.06,
                    y: selected.scale.y * 1.06,
                    z: selected.scale.z * 1.06,
                    duration: 3.1,
                    ease: "power3.inOut",
                }, 0)
                .to(starMaterial, {
                    size: 0.045,
                    opacity: 0.8,
                    duration: 0.8,
                }, 2.5)
                .to(starField.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 1,
                }, 2.5);
        };

        let animationFrame = 0;
        let disposed = false;
        const clock = new THREE.Clock();
        let animate: () => void = () => {};

        controllerRef.current = {
            setMode: (nextMode) => {
                if (nextMode === "intro") showIntro();

                if (nextMode === "destinations") {
                    showDestinations();
                }

                if (nextMode === "archive") {
                    if (animationFrame) {
                        window.cancelAnimationFrame(animationFrame);
                        animationFrame = 0;
                    }

                    renderScene();
                    return;
                }

                if (
                    !reducedMotion &&
                    !document.hidden &&
                    !animationFrame
                ) {
                    clock.start();
                    animate();
                }
            },

            travelTo,
        };

        // ========================================
        // RENDER LOOP
        // ========================================

        animate = () => {
            if (disposed) return;

            animationFrame = window.requestAnimationFrame(animate);

            const delta = Math.min(clock.getDelta(), 0.05);

            if (!reducedMotion) {
                earthGroup.rotation.y += delta * 0.022;

                clouds.rotation.y += delta * 0.034;

                moon.rotation.y += delta * 0.014;

                mars.rotation.y += delta * 0.012;

                starField.rotation.y += delta * 0.0008;
            }

            renderScene();
        };

        if (!reducedMotion && !document.hidden) {
            clock.start();
            animate();
        } else {
            renderScene();
        }

        // ========================================
        // RESIZE AND VISIBILITY
        // ========================================

        const handleResize = () => {
            resize();

            if (modeRef.current === "destinations") {
                showDestinations();
            }
        };

        window.addEventListener("resize", handleResize);

        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                    animationFrame = 0;
                }

                clock.stop();
            } else if (
                !reducedMotion &&
                !animationFrame &&
                modeRef.current !== "archive"
            ) {
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

        resize();

        // ========================================
        // CLEANUP
        // ========================================

        return () => {
            disposed = true;

            activeTimeline?.kill();

            controllerRef.current = null;

            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }

            window.removeEventListener("resize", handleResize);

            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange,
            );

            renderer.domElement.removeEventListener(
                "pointermove",
                handlePointerMove,
            );

            renderer.domElement.removeEventListener(
                "pointerleave",
                handlePointerLeave,
            );

            renderer.domElement.removeEventListener(
                "click",
                handleClick,
            );

            const geometries = [
                earthGeometry,
                cloudGeometry,
                atmosphere.geometry,
                earthHalo.geometry,
                moonGeometry,
                moonHalo.geometry,
                marsGeometry,
                marsHalo.geometry,
                starGeometry,
                orbitGeometry,
            ];

            const materials = [
                earthMaterial,
                cloudMaterial,
                atmosphereMaterial,
                earthHaloMaterial,
                moonMaterial,
                moonHaloMaterial,
                marsMaterial,
                marsHaloMaterial,
                starMaterial,
                orbitMaterial,
            ];

            geometries.forEach((geometry) => geometry.dispose());

            materials.forEach((material) => material.dispose());

            loadedTextures.forEach((texture) => texture.dispose());

            renderer.dispose();
            renderer.domElement.remove();
        };
    }, [reducedMotion]);

    // Keep event handlers in sync without writing refs during render.
    useEffect(() => {
        modeRef.current = mode;
        onSelectRef.current = onDestinationSelect;
        onArrivalRef.current = onArrival;

        controllerRef.current?.setMode(mode);
    }, [mode, onDestinationSelect, onArrival]);

    // Start a cinematic trip when React selects a destination.
    useEffect(() => {
        if (mode !== "traveling" || !selectedDestination) return;

        controllerRef.current?.travelTo(selectedDestination);
    }, [mode, selectedDestination]);

    return (
        <div
            ref={mountRef}
            className="space-scene"
            aria-hidden="true"
        />
    );
}

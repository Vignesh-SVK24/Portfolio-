/**
 * ==========================================================================
 * VENOM SYMBIOTE ENGINE — SCRIPT
 * Living Bio-Digital Motion, 3D WebGL Organism & SymbioteGrabButton System
 * Brand: SVK Creationz | Developer: Vignesh
 * ==========================================================================
 */

// ===== 1. PRELOADER & INITIALIZATION =====
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
        }
        animateHero();
    }, 1000);
});

// ===== 2. CUSTOM SYMBIOTE FLUID CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let posX = mouseX;
let posY = mouseY;
let prevX = mouseX;
let prevY = mouseY;
let isHoveringInteractive = false;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    }
});

function animateCursor() {
    const vx = mouseX - posX;
    const vy = mouseY - posY;
    posX += vx * 0.15;
    posY += vy * 0.15;

    if (follower) {
        follower.style.left = posX + 'px';
        follower.style.top = posY + 'px';

        // Fluid velocity-based elongation
        const speed = Math.sqrt(vx * vx + vy * vy);
        const angle = Math.atan2(vy, vx);
        const stretch = Math.min(speed * 0.015, 0.4);

        if (!isHoveringInteractive && speed > 2) {
            follower.style.transform = `translate(-50%, -50%) rotate(${angle}rad) scale(${1 + stretch}, ${1 - stretch * 0.5})`;
        } else if (!isHoveringInteractive) {
            follower.style.transform = `translate(-50%, -50%) scale(1, 1)`;
        }
    }

    prevX = posX;
    prevY = posY;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor Hover effects on links & cards
document.querySelectorAll('a, button, .symbiote-card, .symbiote-pod-card, .dot, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
        isHoveringInteractive = true;
        if (follower) {
            follower.style.width = '55px';
            follower.style.height = '55px';
            follower.style.borderColor = 'rgba(178, 13, 38, 0.85)';
            follower.style.boxShadow = '0 0 25px rgba(178, 13, 38, 0.5), inset 0 0 15px rgba(178, 13, 38, 0.3)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.15)';
        }
        if (cursor) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.6)';
            cursor.style.backgroundColor = '#ffffff';
        }
    });

    el.addEventListener('mouseleave', () => {
        isHoveringInteractive = false;
        if (follower) {
            follower.style.width = '38px';
            follower.style.height = '38px';
            follower.style.borderColor = 'rgba(178, 13, 38, 0.45)';
            follower.style.boxShadow = '0 0 15px rgba(178, 13, 38, 0.2)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
        }
        if (cursor) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--color-venom-crimson)';
        }
    });
});

// ===== 3. HERO ENTRANCE ANIMATION =====
function animateHero() {
    const elements = document.querySelectorAll('.hero-section [data-animate]');
    elements.forEach((el, i) => {
        const delay = parseFloat(el.dataset.delay || 0) * 1000;
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translate(0, 0)';
            el.style.transition = 'all 0.85s cubic-bezier(0.16, 1, 0.3, 1)';
        }, 200 + delay + i * 80);
    });
}

// ===== 4. MOBILE NAVIGATION DRAWER =====
const mobileToggle = document.getElementById('mobileNavToggle');
const sideNav = document.getElementById('sideNav');
if (mobileToggle && sideNav) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        sideNav.classList.toggle('open');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 992 && mobileToggle && sideNav) {
            mobileToggle.classList.remove('active');
            sideNav.classList.remove('open');
        }
    });
});

// ===== 5. SCROLL OBSERVER & SECTION TRACKING =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = parseFloat(entry.target.dataset.delay || 0) * 1000;
            setTimeout(() => entry.target.classList.add('visible'), delay);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.section [data-animate]').forEach(el => observer.observe(el));

// Active Nav and Dot Highlighting
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const top = section.offsetTop - 240;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav-link[data-section="${id}"]`);
            if (active) active.classList.add('active');

            document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
            const activeDot = document.querySelector(`.dot[data-target="${id}"]`);
            if (activeDot) activeDot.classList.add('active');
        }
    });
});

// Dot click smooth navigation
document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
        const target = document.getElementById(dot.dataset.target);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Smooth anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Counter Animation for Stats
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.count);
                let current = 0;
                const increment = Math.max(target / 30, 1);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 35);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) counterObserver.observe(statsSection);

// ===== 6. SIGNATURE INTERACTION: SYMBIOTE GRAB BUTTON SYSTEM =====
/**
 * Procedural SVG Symbiote Tendril Grab System:
 * Creates organic living tendrils that sprout from the button edge
 * and latch onto the cursor when it enters a proximity detection radius.
 */
class SymbioteGrabSystem {
    constructor() {
        this.svg = document.getElementById('symbiote-tendril-svg');
        this.buttons = document.querySelectorAll('.symbiote-grab-btn');
        this.isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
        this.tendrilState = new Map(); // button -> active tendril data
        this.init();
    }

    init() {
        if (!this.svg || this.buttons.length === 0) return;

        // On mobile/touch, skip proximity tendrils and use touch ripples
        if (this.isTouch) {
            this.setupTouchFallback();
            return;
        }

        // Setup button event listeners & data
        this.buttons.forEach((btn, index) => {
            this.tendrilState.set(btn, {
                id: `btn-grab-${index}`,
                isLatched: false,
                currentDist: 9999,
                tendrils: [],
                pullX: 0,
                pullY: 0
            });

            // Click contraction pulse
            btn.addEventListener('click', () => {
                btn.style.transform = 'scale(0.93)';
                setTimeout(() => {
                    btn.style.transform = '';
                }, 150);
            });
        });

        // Animation loop for tendril physics
        this.renderTendrils();
    }

    setupTouchFallback() {
        this.buttons.forEach(btn => {
            btn.addEventListener('touchstart', () => {
                btn.style.transform = 'scale(0.96)';
                btn.style.borderColor = 'var(--color-venom-crimson)';
                btn.style.boxShadow = '0 0 25px rgba(178, 13, 38, 0.7)';
            }, { passive: true });

            btn.addEventListener('touchend', () => {
                setTimeout(() => {
                    btn.style.transform = '';
                    btn.style.borderColor = '';
                    btn.style.boxShadow = '';
                }, 200);
            }, { passive: true });
        });
    }

    renderTendrils() {
        const time = performance.now() * 0.003;

        this.buttons.forEach(btn => {
            const state = this.tendrilState.get(btn);
            if (!state) return;

            const rect = btn.getBoundingClientRect();
            // Visible on screen?
            if (rect.bottom < 0 || rect.top > window.innerHeight) {
                this.clearTendrils(state);
                return;
            }

            const btnCenterX = rect.left + rect.width / 2;
            const btnCenterY = rect.top + rect.height / 2;

            // Distance to boundary
            const dx = mouseX - btnCenterX;
            const dy = mouseY - btnCenterY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const grabReach = parseFloat(btn.dataset.grabReach || 120);
            const exitReach = grabReach + 35; // Hysteresis exit margin

            if (dist < grabReach) {
                state.isLatched = true;
                state.currentDist = dist;

                // Subtle magnetic button pull
                const pullIntensity = Math.max(0, (1 - dist / grabReach)) * 8;
                state.pullX += ((dx / dist) * pullIntensity - state.pullX) * 0.15;
                state.pullY += ((dy / dist) * pullIntensity - state.pullY) * 0.15;
                btn.style.transform = `translate3d(${state.pullX.toFixed(1)}px, ${state.pullY.toFixed(1)}px, 0)`;

                // Draw living tendrils
                this.updateButtonTendrils(btn, rect, state, time, dx, dy, dist);
            } else if (state.isLatched && dist < exitReach) {
                // Stretching before snap
                this.updateButtonTendrils(btn, rect, state, time, dx, dy, dist, true);
            } else if (state.isLatched) {
                // Release and snap back
                state.isLatched = false;
                btn.style.transform = '';
                state.pullX = 0;
                state.pullY = 0;
                this.clearTendrils(state);
            }
        });

        requestAnimationFrame(() => this.renderTendrils());
    }

    updateButtonTendrils(btn, rect, state, time, dx, dy, dist, isStretching = false) {
        const color = btn.dataset.grabColor === 'silver' ? '#bfc4ca' : '#b20d26';
        const tendrilCount = 3;

        // Ensure path elements exist
        if (state.tendrils.length === 0) {
            for (let i = 0; i < tendrilCount; i++) {
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('class', 'symbiote-svg-tendril');
                path.setAttribute('stroke', color);
                this.svg.appendChild(path);
                state.tendrils.push(path);
            }
        }

        // Compute closest edge coordinates
        const angleToMouse = Math.atan2(dy, dx);
        const radiusX = rect.width / 2;
        const radiusY = rect.height / 2;

        state.tendrils.forEach((path, i) => {
            const spreadAngle = angleToMouse + (i - 1) * 0.28;
            const startX = (rect.left + rect.width / 2) + Math.cos(spreadAngle) * (radiusX * 0.92);
            const startY = (rect.top + rect.height / 2) + Math.sin(spreadAngle) * (radiusY * 0.92);

            const targetX = mouseX;
            const targetY = mouseY;

            // Curved organic Bézier control points with sine wave oscillation
            const midX = (startX + targetX) / 2;
            const midY = (startY + targetY) / 2;

            const perpX = -Math.sin(spreadAngle);
            const perpY = Math.cos(spreadAngle);

            const wave = Math.sin(time * 2.5 + i * 1.5) * (18 - i * 4);
            const cp1X = startX + (midX - startX) * 0.5 + perpX * wave;
            const cp1Y = startY + (midY - startY) * 0.5 + perpY * wave;

            const wave2 = Math.cos(time * 3.0 + i) * 12;
            const cp2X = midX + perpX * wave2;
            const cp2Y = midY + perpY * wave2;

            const d = `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${cp1X.toFixed(1)} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(1)}, ${targetX.toFixed(1)} ${targetY.toFixed(1)}`;
            path.setAttribute('d', d);

            const strokeWidth = isStretching ? Math.max(1, 2.8 - (dist / 140)) : (2.4 + (i === 1 ? 1 : 0));
            path.setAttribute('stroke-width', strokeWidth.toFixed(1));
            path.setAttribute('opacity', isStretching ? '0.5' : '0.85');
        });
    }

    clearTendrils(state) {
        state.tendrils.forEach(path => {
            if (path.parentNode) {
                path.parentNode.removeChild(path);
            }
        });
        state.tendrils = [];
    }
}

// ===== 7. 3D WEBGL LIVING SYMBIOTE ORGANISM (THREE.JS) =====
function initThreeSymbioteScene() {
    const canvas = document.getElementById('bg-3d-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3200);
    camera.position.z = 700;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Dynamic 3D Lights
    const ambientLight = new THREE.AmbientLight(0x080a10, 1.0);
    scene.add(ambientLight);

    const crimsonKeyLight = new THREE.PointLight(0xb20d26, 2.5, 1400);
    crimsonKeyLight.position.set(280, 240, 350);
    scene.add(crimsonKeyLight);

    const silverRimLight = new THREE.PointLight(0xdde2ea, 1.8, 1200);
    silverRimLight.position.set(-300, -180, 300);
    scene.add(silverRimLight);

    const deepBloodLight = new THREE.PointLight(0x540813, 1.5, 1000);
    deepBloodLight.position.set(100, -300, 200);
    scene.add(deepBloodLight);

    // Mouse Tracking Point Light
    const cursorLight = new THREE.PointLight(0xb20d26, 2.0, 700);
    cursorLight.position.set(0, 0, 300);
    scene.add(cursorLight);

    // --- THE SYMBIOTE LIVING ORGANISM ---
    const isMobile = window.innerWidth < 768;
    const organismGroup = new THREE.Group();
    scene.add(organismGroup);

    // 1. Central Pulsing Bio-Core Mesh
    const coreDetail = isMobile ? 3 : 4;
    const coreRadius = isMobile ? 85 : 125;
    const coreGeo = new THREE.IcosahedronGeometry(coreRadius, coreDetail);
    
    // Store original vertex coordinates for harmonic displacement
    const originalPositions = coreGeo.attributes.position.array.slice();

    const coreMat = new THREE.MeshPhongMaterial({
        color: 0x050608,
        emissive: 0x220206,
        specular: 0xffffff,
        shininess: 95,
        transparent: true,
        opacity: 0.92,
        wireframe: false
    });
    const symbioteCore = new THREE.Mesh(coreGeo, coreMat);
    organismGroup.add(symbioteCore);

    // Inner Crimson Nucleus
    const nucleusGeo = new THREE.IcosahedronGeometry(coreRadius * 0.75, 2);
    const nucleusMat = new THREE.MeshBasicMaterial({
        color: 0xb20d26,
        wireframe: true,
        transparent: true,
        opacity: 0.35
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    symbioteCore.add(nucleus);

    // 2. Sentient Spline Tendril Tentacles
    const tendrilCount = isMobile ? 5 : 9;
    const tendrilMeshes = [];

    for (let i = 0; i < tendrilCount; i++) {
        const points = [];
        const segmentCount = 18;
        const baseAngle = (i / tendrilCount) * Math.PI * 2;
        const length = coreRadius * (1.6 + Math.random() * 0.8);

        for (let j = 0; j <= segmentCount; j++) {
            const frac = j / segmentCount;
            const r = coreRadius + length * frac;
            const x = Math.cos(baseAngle) * r;
            const y = Math.sin(baseAngle) * r;
            const z = (Math.random() - 0.5) * 60;
            points.push(new THREE.Vector3(x, y, z));
        }

        const curve = new THREE.CatmullRomCurve3(points);
        const tubeGeo = new THREE.TubeGeometry(curve, 32, isMobile ? 2.2 : 3.5, 6, false);
        const tubeMat = new THREE.MeshPhongMaterial({
            color: 0x08090c,
            emissive: 0x1f0306,
            specular: 0xffffff,
            shininess: 100
        });
        const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
        organismGroup.add(tubeMesh);

        tendrilMeshes.push({
            mesh: tubeMesh,
            basePoints: points,
            baseAngle: baseAngle,
            speed: 1.0 + Math.random() * 1.5,
            phase: Math.random() * Math.PI * 2,
            length: length
        });
    }

    // Default position: floating elegantly in the upper-right / hero space
    organismGroup.position.set(isMobile ? 0 : 360, isMobile ? 80 : 120, -50);

    // 3. Ambient Symbiote Spores & Filaments
    const sporeCount = isMobile ? 260 : 500;
    const sporeGeo = new THREE.BufferGeometry();
    const sporePositions = new Float32Array(sporeCount * 3);
    const sporeColors = new Float32Array(sporeCount * 3);
    const sporeData = [];

    const sporePalette = [
        new THREE.Color(0xb20d26), // Venom Crimson
        new THREE.Color(0x540813), // Deep Blood
        new THREE.Color(0xdde2ea), // Cold Silver
        new THREE.Color(0x1a1c22)  // Dark Graphite
    ];

    for (let i = 0; i < sporeCount; i++) {
        const x = (Math.random() - 0.5) * 2200;
        const y = (Math.random() - 0.5) * 3600;
        const z = (Math.random() - 0.5) * 1200;
        sporePositions[i * 3] = x;
        sporePositions[i * 3 + 1] = y;
        sporePositions[i * 3 + 2] = z;

        sporeData.push({
            originX: x,
            originY: y,
            speed: 0.15 + Math.random() * 0.45,
            phase: Math.random() * Math.PI * 2,
            radius: 8 + Math.random() * 18
        });

        const c = sporePalette[Math.floor(Math.random() * sporePalette.length)];
        sporeColors[i * 3] = c.r;
        sporeColors[i * 3 + 1] = c.g;
        sporeColors[i * 3 + 2] = c.b;
    }

    sporeGeo.setAttribute('position', new THREE.BufferAttribute(sporePositions, 3));
    sporeGeo.setAttribute('color', new THREE.BufferAttribute(sporeColors, 3));

    // Custom Spore Particle Texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const radGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    radGrad.addColorStop(0, 'rgba(255,255,255,1)');
    radGrad.addColorStop(0.3, 'rgba(178,13,38,0.9)');
    radGrad.addColorStop(0.7, 'rgba(84,8,19,0.3)');
    radGrad.addColorStop(1, 'rgba(0,0,0,0)');
    pCtx.fillStyle = radGrad;
    pCtx.beginPath();
    pCtx.arc(16, 16, 16, 0, Math.PI * 2);
    pCtx.fill();

    const sporeTex = new THREE.CanvasTexture(pCanvas);
    const sporeMat = new THREE.PointsMaterial({
        size: isMobile ? 3.5 : 4.8,
        map: sporeTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const sporeParticles = new THREE.Points(sporeGeo, sporeMat);
    scene.add(sporeParticles);

    // --- MOUSE PARALLAX & SCROLL PHYSICS ---
    let targetMouseX = 0, targetMouseY = 0;
    let smoothMouseX = 0, smoothMouseY = 0;

    window.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
        targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let isPageVisible = true;
    document.addEventListener('visibilitychange', () => {
        isPageVisible = !document.hidden;
    });

    // --- ANIMATION RENDER LOOP ---
    let clock = new THREE.Clock();

    function render3D() {
        requestAnimationFrame(render3D);
        if (!isPageVisible) return;

        const elapsedTime = clock.getElapsedTime();

        // Mouse smooth damping
        smoothMouseX += (targetMouseX - smoothMouseX) * 0.05;
        smoothMouseY += (targetMouseY - smoothMouseY) * 0.05;

        // Camera scroll tracking
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFrac = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        const targetCamY = -scrollFrac * 2200;

        camera.position.x += (smoothMouseX * 70 - camera.position.x) * 0.04;
        camera.position.y += (targetCamY + smoothMouseY * 45 - camera.position.y) * 0.05;
        camera.rotation.y = -smoothMouseX * 0.04;
        camera.rotation.x = smoothMouseY * 0.04;

        // Dynamic cursor light in 3D
        cursorLight.position.x = smoothMouseX * 450;
        cursorLight.position.y = camera.position.y + smoothMouseY * 350;
        cursorLight.position.z = 240 + Math.sin(elapsedTime * 2.5) * 40;

        // 1. ORGANIC VERTEX DEFORMATION ON THE SYMBIOTE CORE
        const posAttr = coreGeo.attributes.position;
        const posArray = posAttr.array;
        const vertexCount = posArray.length / 3;

        for (let i = 0; i < vertexCount; i++) {
            const ox = originalPositions[i * 3];
            const oy = originalPositions[i * 3 + 1];
            const oz = originalPositions[i * 3 + 2];

            // Harmonic noise formula simulating alien muscle and membrane
            const u = Math.sin(ox * 0.03 + elapsedTime * 1.8) * Math.cos(oy * 0.03 + elapsedTime * 1.4);
            const v = Math.sin(oz * 0.03 + elapsedTime * 1.6);
            const displacement = 1 + (u + v) * 0.12 + Math.sin(elapsedTime * 2.5) * 0.04;

            posArray[i * 3] = ox * displacement;
            posArray[i * 3 + 1] = oy * displacement;
            posArray[i * 3 + 2] = oz * displacement;
        }
        posAttr.needsUpdate = true;
        coreGeo.computeVertexNormals();

        // Rotate & breathe
        symbioteCore.rotation.y = elapsedTime * 0.18;
        symbioteCore.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15;
        nucleus.rotation.y = -elapsedTime * 0.35;

        // Organism reacts to pointer & scroll
        organismGroup.rotation.y = smoothMouseX * 0.35;
        organismGroup.rotation.x = -smoothMouseY * 0.35;
        organismGroup.position.y = (isMobile ? 80 : 120) + Math.sin(elapsedTime * 1.2) * 18 - scrollFrac * 600;

        // 2. ANIMATE SENTIENT SYMBIOTE TENDRILS
        tendrilMeshes.forEach((t, i) => {
            const curvePoints = [];
            const segCount = t.basePoints.length - 1;

            for (let j = 0; j <= segCount; j++) {
                const frac = j / segCount;
                const base = t.basePoints[j];
                const wave = Math.sin(elapsedTime * t.speed + t.phase + frac * 4.0) * (20 * frac);
                const waveZ = Math.cos(elapsedTime * t.speed + t.phase + frac * 3.0) * (25 * frac);

                // Reaching toward mouse cursor
                const reachX = frac * (smoothMouseX * 40);
                const reachY = frac * (smoothMouseY * 40);

                curvePoints.push(new THREE.Vector3(
                    base.x + wave + reachX,
                    base.y + wave * 0.5 + reachY,
                    base.z + waveZ
                ));
            }

            const newCurve = new THREE.CatmullRomCurve3(curvePoints);
            t.mesh.geometry.dispose();
            t.mesh.geometry = new THREE.TubeGeometry(newCurve, 28, isMobile ? 2.0 : 3.2, 5, false);
        });

        // 3. AMBIENT SPORES MOTION
        const sporePosAttr = sporeParticles.geometry.attributes.position;
        const sporePosArr = sporePosAttr.array;
        for (let i = 0; i < sporeCount; i++) {
            const data = sporeData[i];
            sporePosArr[i * 3 + 1] = data.originY + Math.sin(elapsedTime * data.speed + data.phase) * data.radius;
            sporePosArr[i * 3] = data.originX + Math.cos(elapsedTime * (data.speed * 0.5) + data.phase) * (data.radius * 0.5);
        }
        sporePosAttr.needsUpdate = true;
        sporeParticles.rotation.y = elapsedTime * 0.012;

        renderer.render(scene, camera);
    }

    render3D();
}

// ===== 8. 3D CARD INTERACTIVE PERSPECTIVE TILT =====
function initSymbioteCard3DTilt() {
    if (window.innerWidth < 768) return;

    const cards = document.querySelectorAll('.symbiote-card, .symbiote-pod-card');
    cards.forEach(card => {
        let glare = card.querySelector('.card-3d-glare');
        if (!glare) {
            glare = document.createElement('div');
            glare.className = 'card-3d-glare';
            card.appendChild(glare);
        }

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -9;
            const rotateY = ((x - centerX) / centerX) * 9;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`;

            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.22) 0%, transparent 65%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.35s, box-shadow 0.35s';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
}

// ===== 9. HERO PORTRAIT 3D PARALLAX =====
function initHeroPortraitParallax() {
    if (window.innerWidth < 768) return;
    const heroPortrait = document.querySelector('.hero-portrait');
    const heroSection = document.getElementById('hero');

    if (heroPortrait && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            heroPortrait.style.transform = `perspective(1000px) rotateY(${(x * 12).toFixed(2)}deg) rotateX(${(-y * 12).toFixed(2)}deg) translateZ(10px)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            heroPortrait.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)';
            heroPortrait.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
        });

        heroSection.addEventListener('mouseenter', () => {
            heroPortrait.style.transition = 'none';
        });
    }
}

// ===== 10. SECURITY & PROTECTION =====
// Email deobfuscation
document.addEventListener('DOMContentLoaded', () => {
    const emailEls = document.querySelectorAll('.email-protected');
    emailEls.forEach(el => {
        const user = el.dataset.user;
        const domain = el.dataset.domain;
        if (user && domain) {
            const email = user + '@' + domain;
            el.textContent = email;
            el.removeAttribute('data-user');
            el.removeAttribute('data-domain');
        }
    });
});

// Context menu protection
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// Common DevTools shortcuts blocking
document.addEventListener('keydown', (e) => {
    if (e.key === 'F12') { e.preventDefault(); return false; }
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) { e.preventDefault(); return false; }
    if (e.ctrlKey && (e.key === 'u' || e.key === 's')) { e.preventDefault(); return false; }
});

// Image drag protection
document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
    img.addEventListener('dragstart', (e) => e.preventDefault());
});

// Console notice
console.log(
    '%c☣ SYMBIOTE ARCHITECTURE ENGAGED // VIGNESH ☣',
    'color: #b20d26; font-size: 26px; font-weight: 900; background: #050506; padding: 10px 18px; border: 2px solid #b20d26; border-radius: 6px;'
);
console.log(
    '%cNeural systems active. Living bio-digital portfolio built with Three.js & SVG procedural tendril physics.\nBrand: SVK Creationz',
    'color: #bfc4ca; font-size: 14px; background: #0a0b0d; padding: 8px;'
);

// Link safety audit
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    if (!link.getAttribute('rel') || !link.getAttribute('rel').includes('noopener')) {
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ===== 11. INITIALIZE ENGINES ON LOAD =====
window.addEventListener('DOMContentLoaded', () => {
    initThreeSymbioteScene();
    initSymbioteCard3DTilt();
    initHeroPortraitParallax();
    new SymbioteGrabSystem();
});

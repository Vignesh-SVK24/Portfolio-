// ==========================================================================
// MINIMAL BLACK & WHITE VENOM SYMBIOTE ENGINE
// Theme: Pure Monochromatic Bio-Digital Organism
// Interactions: Procedural Symbiote Grab, 3D Engine, Accessible Controls
// ==========================================================================

const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== PRELOADER & HERO REVEAL =====
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.classList.add('hidden');
        animateHero();
    }, 900);
});

// ===== MINIMAL MONOCHROME CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

if (!isTouchDevice && cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateCursor() {
        posX += (mouseX - posX) * 0.16;
        posY += (mouseY - posY) * 0.16;
        follower.style.left = posX + 'px';
        follower.style.top = posY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover feedback on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .work-card, .dot, .skill-tag');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('active'));
        el.addEventListener('mouseleave', () => follower.classList.remove('active'));
    });
}

// ===== HERO ANIMATIONS =====
function animateHero() {
    const elements = document.querySelectorAll('.hero-section [data-animate]');
    elements.forEach((el, i) => {
        const delay = parseFloat(el.dataset.delay || 0) * 1000;
        setTimeout(() => {
            el.classList.add('visible');
        }, 200 + delay + i * 80);
    });
}

// ==========================================================================
// SIGNATURE INTERACTION: SYMBIOTE GRAB BUTTON
// Procedural SVG Cubic Bézier Tendril Reach & Magnetic Bio-Attraction
// ==========================================================================
class SymbioteGrabSystem {
    constructor() {
        this.buttons = document.querySelectorAll('.symbiote-grab-btn');
        this.svg = document.getElementById('symbiote-grab-canvas');
        this.reachDistance = 115; // Proximity detection threshold (px)
        this.activeButtons = new Map();

        if (!this.svg || isTouchDevice || prefersReducedMotion) {
            this.setupMobileFallback();
            return;
        }

        this.init();
    }

    init() {
        this.buttons.forEach((btn, index) => {
            // Create SVG elements for 2 organic tendrils per button
            const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path1.setAttribute('class', 'symbiote-tendril-path');
            path1.style.opacity = '0';

            const bulb1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            bulb1.setAttribute('class', 'symbiote-tendril-bulb');
            bulb1.setAttribute('r', '2.8');
            bulb1.style.opacity = '0';

            const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path2.setAttribute('class', 'symbiote-tendril-path');
            path2.style.opacity = '0';

            const bulb2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            bulb2.setAttribute('class', 'symbiote-tendril-bulb');
            bulb2.setAttribute('r', '2.2');
            bulb2.style.opacity = '0';

            this.svg.appendChild(path1);
            this.svg.appendChild(bulb1);
            this.svg.appendChild(path2);
            this.svg.appendChild(bulb2);

            this.activeButtons.set(btn, {
                path1, bulb1, path2, bulb2,
                currentReach: 0,
                targetReach: 0,
                isNear: false
            });

            // Click contraction feedback (instant execution preserved)
            btn.addEventListener('click', () => {
                btn.classList.add('contracting');
                setTimeout(() => btn.classList.remove('contracting'), 220);
            });
        });

        window.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: true });
        this.renderLoop();
    }

    setupMobileFallback() {
        this.buttons.forEach(btn => {
            btn.addEventListener('touchstart', () => {
                btn.classList.add('contracting');
            }, { passive: true });
            btn.addEventListener('touchend', () => {
                setTimeout(() => btn.classList.remove('contracting'), 180);
            }, { passive: true });
        });
    }

    onMouseMove(e) {
        const mx = e.clientX;
        const my = e.clientY;

        this.activeButtons.forEach((state, btn) => {
            const rect = btn.getBoundingClientRect();
            const btnCenterX = rect.left + rect.width / 2;
            const btnCenterY = rect.top + rect.height / 2;

            // Clamped point on button perimeter nearest to cursor
            const nearestX = Math.max(rect.left, Math.min(mx, rect.right));
            const nearestY = Math.max(rect.top, Math.min(my, rect.bottom));

            const dist = Math.hypot(mx - nearestX, my - nearestY);

            if (dist < this.reachDistance) {
                state.isNear = true;
                state.targetReach = 1 - (dist / this.reachDistance);
                state.cursorX = mx;
                state.cursorY = my;
                state.rect = rect;
                state.nearestX = nearestX;
                state.nearestY = nearestY;
                state.btnCenterX = btnCenterX;
                state.btnCenterY = btnCenterY;

                // Subtle magnetic button translation (up to 5px toward cursor)
                const angle = Math.atan2(my - btnCenterY, mx - btnCenterX);
                const magnetDist = state.targetReach * 4.5;
                const magX = Math.cos(angle) * magnetDist;
                const magY = Math.sin(angle) * magnetDist;
                btn.style.transform = `translate(${magX.toFixed(1)}px, ${magY.toFixed(1)}px)`;
            } else {
                state.isNear = false;
                state.targetReach = 0;
                btn.style.transform = 'translate(0px, 0px)';
            }
        });
    }

    renderLoop() {
        const time = performance.now() * 0.003;

        this.activeButtons.forEach((state) => {
            // Smoothly interpolate reach intensity
            state.currentReach += (state.targetReach - state.currentReach) * 0.24;

            if (state.currentReach > 0.03 && state.rect) {
                const reach = state.currentReach;
                const { cursorX, cursorY, rect, nearestX, nearestY } = state;

                // Anchor points along edge
                const anchor1X = nearestX;
                const anchor1Y = nearestY;

                // Subtle undulating curl offset for biological feel
                const wave1 = Math.sin(time * 3) * 12 * reach;
                const wave2 = Math.cos(time * 3.5) * 10 * reach;

                const cp1x = anchor1X + (cursorX - anchor1X) * 0.35 + wave1;
                const cp1y = anchor1Y + (cursorY - anchor1Y) * 0.35 - wave2;
                const cp2x = anchor1X + (cursorX - anchor1X) * 0.7 - wave2;
                const cp2y = anchor1Y + (cursorY - anchor1Y) * 0.7 + wave1;

                const d1 = `M ${anchor1X} ${anchor1Y} C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${cursorX} ${cursorY}`;
                state.path1.setAttribute('d', d1);
                state.path1.style.opacity = (reach * 0.85).toFixed(2);
                state.path1.style.strokeWidth = (1.5 + reach * 1.5).toFixed(1);

                state.bulb1.setAttribute('cx', cursorX);
                state.bulb1.setAttribute('cy', cursorY);
                state.bulb1.style.opacity = (reach * 0.95).toFixed(2);

                // Secondary thinner branching strand
                const anchor2X = anchor1X + (rect.width * 0.15 * Math.sign(cursorX - anchor1X || 1));
                const anchor2Y = anchor1Y + (rect.height * 0.15 * Math.sign(cursorY - anchor1Y || 1));
                const bcp1x = anchor2X + (cursorX - anchor2X) * 0.4 - wave2 * 0.8;
                const bcp1y = anchor2Y + (cursorY - anchor2Y) * 0.4 + wave1 * 0.8;
                const bcp2x = anchor2X + (cursorX - anchor2X) * 0.65 + wave1 * 0.8;
                const bcp2y = anchor2Y + (cursorY - anchor2Y) * 0.65 - wave2 * 0.8;

                const d2 = `M ${anchor2X} ${anchor2Y} C ${bcp1x.toFixed(1)} ${bcp1y.toFixed(1)}, ${bcp2x.toFixed(1)} ${bcp2y.toFixed(1)}, ${cursorX} ${cursorY}`;
                state.path2.setAttribute('d', d2);
                state.path2.style.opacity = (reach * 0.55).toFixed(2);
                state.path2.style.strokeWidth = (1 + reach * 0.8).toFixed(1);

                state.bulb2.setAttribute('cx', cursorX);
                state.bulb2.setAttribute('cy', cursorY);
                state.bulb2.style.opacity = (reach * 0.7).toFixed(2);
            } else {
                state.path1.style.opacity = '0';
                state.bulb1.style.opacity = '0';
                state.path2.style.opacity = '0';
                state.bulb2.style.opacity = '0';
            }
        });

        requestAnimationFrame(() => this.renderLoop());
    }
}

// ===== MOBILE NAV TOGGLE =====
const mobileToggle = document.getElementById('mobileNavToggle');
const sideNav = document.getElementById('sideNav');

if (mobileToggle && sideNav) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        sideNav.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                mobileToggle.classList.remove('active');
                sideNav.classList.remove('open');
            }
        });
    });
}

// ===== SCROLL OBSERVER FOR ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = parseFloat(entry.target.dataset.delay || 0) * 1000;
            setTimeout(() => entry.target.classList.add('visible'), delay);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.section [data-animate]').forEach(el => observer.observe(el));

// ===== ACTIVE NAV & SCROLL DOTS TRACKING =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const top = section.offsetTop - 220;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            const activeNav = document.querySelector(`.nav-link[data-section="${id}"]`);
            if (activeNav) activeNav.classList.add('active');

            document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
            const activeDot = document.querySelector(`.dot[data-target="${id}"]`);
            if (activeDot) activeDot.classList.add('active');
        }
    });
}, { passive: true });

// Dot click navigation
document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
        const target = document.getElementById(dot.dataset.target);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== STATS COUNTER ANIMATION =====
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.count, 10);
                let current = 0;
                const increment = target / 35;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 40);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) counterObserver.observe(statsSection);

// ===== SMOOTH SCROLL FOR IN-PAGE LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#' || href === '') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== SECURITY: EMAIL DEOBFUSCATION =====
document.addEventListener('DOMContentLoaded', () => {
    const emailEls = document.querySelectorAll('.email-protected');
    emailEls.forEach(el => {
        const user = el.dataset.user;
        const domain = el.dataset.domain;
        if (user && domain) {
            el.textContent = `${user}@${domain}`;
            el.removeAttribute('data-user');
            el.removeAttribute('data-domain');
        }
    });

    const collabBtn = document.getElementById('collabBtn');
    if (collabBtn) {
        collabBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = `mailto:${'vigneshsvk2407'}@${'gmail.com'}`;
        });
    }
});

// ===== SECURITY: PROTECTIONS =====
document.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener('keydown', (e) => {
    if (e.key === 'F12') { e.preventDefault(); return false; }
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
        return false;
    }
    if (e.ctrlKey && (e.key === 'u' || e.key === 's')) {
        e.preventDefault();
        return false;
    }
});

document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
    img.addEventListener('dragstart', (e) => e.preventDefault());
});

console.log(
    '%c⚡ VENOM SYMBIOTE INTERFACE ACTIVE',
    'color: #ffffff; font-size: 20px; font-weight: 800; background: #000000; padding: 10px 16px; border: 1px solid #ffffff; border-radius: 4px;'
);

// ==========================================================================
// MINIMAL MONOCHROME THREE.JS 3D ENGINE
// Pure Black & White Organic Core, Spore Particles, White Specular Lights
// ==========================================================================
function initThreeScene() {
    const canvas = document.getElementById('bg-3d-canvas');
    if (!canvas || typeof THREE === 'undefined' || prefersReducedMotion) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 700;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Pure Monochromatic Lights (No colors)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const whitePointLight = new THREE.PointLight(0xffffff, 1.3, 1400);
    whitePointLight.position.set(200, 200, 300);
    scene.add(whitePointLight);

    const specularFillLight = new THREE.PointLight(0x888888, 0.8, 1000);
    specularFillLight.position.set(-250, -100, 250);
    scene.add(specularFillLight);

    const floatingGroup = new THREE.Group();
    scene.add(floatingGroup);

    // 1. Hero Minimalist Organism Core
    const isMobile = window.innerWidth <= 768;
    const crystalGroup = new THREE.Group();

    // Wireframe exoskeleton
    const icoGeo = new THREE.IcosahedronGeometry(isMobile ? 48 : 68, 1);
    const icoEdges = new THREE.EdgesGeometry(icoGeo);
    const icoLine = new THREE.LineSegments(
        icoEdges,
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 })
    );

    // Dark obsidian organic core
    const innerGeo = new THREE.IcosahedronGeometry(isMobile ? 40 : 56, 0);
    const innerMat = new THREE.MeshPhongMaterial({
        color: 0x080808,
        specular: 0xffffff,
        shininess: 120,
        transparent: true,
        opacity: 0.85
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    crystalGroup.add(innerMesh);
    crystalGroup.add(icoLine);

    // Delicate orbiting ring
    const ringGeo = new THREE.TorusGeometry(isMobile ? 70 : 100, 1.2, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.22,
        wireframe: true
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    crystalGroup.add(ringMesh);

    crystalGroup.position.set(isMobile ? 100 : 330, 130, -80);
    floatingGroup.add(crystalGroup);

    // 2. Monochromatic Spore Particles
    const particleCount = isMobile ? 240 : 480;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleData = [];

    for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 3200;
        const z = (Math.random() - 0.5) * 1200;
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        particleData.push({
            originX: x,
            originY: y,
            speed: 0.15 + Math.random() * 0.35,
            phase: Math.random() * Math.PI * 2,
            radius: 6 + Math.random() * 15
        });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const radGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    radGrad.addColorStop(0, 'rgba(255,255,255,0.95)');
    radGrad.addColorStop(0.3, 'rgba(255,255,255,0.6)');
    radGrad.addColorStop(0.7, 'rgba(180,180,180,0.15)');
    radGrad.addColorStop(1, 'rgba(0,0,0,0)');
    pCtx.fillStyle = radGrad;
    pCtx.beginPath();
    pCtx.arc(16, 16, 16, 0, Math.PI * 2);
    pCtx.fill();
    const particleTex = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
        size: isMobile ? 3 : 4,
        map: particleTex,
        color: 0xffffff,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const sporeParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(sporeParticles);

    // Mouse Tracking
    let targetMouseX = 0, targetMouseY = 0;
    let smoothMouseX = 0, smoothMouseY = 0;

    window.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
        targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    }, { passive: true });

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Visibility pause
    let isPageVisible = true;
    document.addEventListener('visibilitychange', () => {
        isPageVisible = !document.hidden;
    });

    // Render loop
    const clock = new THREE.Clock();
    function render3D() {
        requestAnimationFrame(render3D);
        if (!isPageVisible) return;

        const elapsedTime = clock.getElapsedTime();

        smoothMouseX += (targetMouseX - smoothMouseX) * 0.04;
        smoothMouseY += (targetMouseY - smoothMouseY) * 0.04;

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFrac = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        const targetCamY = -scrollFrac * 1800;

        camera.position.x += (smoothMouseX * 50 - camera.position.x) * 0.04;
        camera.position.y += (targetCamY + smoothMouseY * 30 - camera.position.y) * 0.05;

        // White point light tracks pointer smoothly
        whitePointLight.position.x = smoothMouseX * 400;
        whitePointLight.position.y = camera.position.y + smoothMouseY * 300;

        // Subtle organic rotation
        crystalGroup.rotation.x = elapsedTime * 0.18;
        crystalGroup.rotation.y = elapsedTime * 0.24;
        ringMesh.rotation.z = -elapsedTime * 0.35;
        crystalGroup.position.y = 130 + Math.sin(elapsedTime * 0.9) * 14;

        // Particle floating
        const posAttr = sporeParticles.geometry.attributes.position;
        const posArray = posAttr.array;
        for (let i = 0; i < particleCount; i++) {
            const data = particleData[i];
            posArray[i * 3 + 1] = data.originY + Math.sin(elapsedTime * data.speed + data.phase) * data.radius;
            posArray[i * 3] = data.originX + Math.cos(elapsedTime * (data.speed * 0.5) + data.phase) * (data.radius * 0.5);
        }
        posAttr.needsUpdate = true;

        renderer.render(scene, camera);
    }
    render3D();
}

// ===== 3D CARD INTERACTIVE TILT & SPECULAR SHEEN =====
function initCard3DTilt() {
    if (window.innerWidth < 768 || prefersReducedMotion) return;

    const cards = document.querySelectorAll('.project-card, .work-card');

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

            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px) scale3d(1.015, 1.015, 1.015)`;

            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 65%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s';
            if (glare) glare.style.background = 'none';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
}

// ===== HERO PORTRAIT 3D PARALLAX TILT =====
function initHeroPortraitParallax() {
    if (window.innerWidth < 768 || prefersReducedMotion) return;
    const heroPortrait = document.querySelector('.hero-portrait-frame');
    const heroSection = document.getElementById('hero');

    if (heroPortrait && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            heroPortrait.style.transform = `perspective(1000px) rotateY(${(x * 10).toFixed(2)}deg) rotateX(${(-y * 10).toFixed(2)}deg) translateZ(8px)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            heroPortrait.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)';
            heroPortrait.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        heroSection.addEventListener('mouseenter', () => {
            heroPortrait.style.transition = 'none';
        });
    }
}

// ===== INITIALIZE SYSTEMS =====
window.addEventListener('DOMContentLoaded', () => {
    new SymbioteGrabSystem();
    initThreeScene();
    initCard3DTilt();
    initHeroPortraitParallax();
});

// ===== PRELOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
        animateHero();
    }, 1200);
});

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    if (cursor) { cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px'; }
});

function animateCursor() {
    posX += (mouseX - posX) * 0.1;
    posY += (mouseY - posY) * 0.1;
    if (follower) { follower.style.left = posX + 'px'; follower.style.top = posY + 'px'; }
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effects on interactive elements
document.querySelectorAll('a, button, .project-card, .dot').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (follower) { follower.style.width = '60px'; follower.style.height = '60px'; follower.style.borderColor = 'rgba(142,202,230,0.5)'; }
    });
    el.addEventListener('mouseleave', () => {
        if (follower) { follower.style.width = '40px'; follower.style.height = '40px'; follower.style.borderColor = 'rgba(255,255,255,0.5)'; }
    });
});

// ===== HERO ANIMATION =====
function animateHero() {
    const elements = document.querySelectorAll('.hero-section [data-animate]');
    elements.forEach((el, i) => {
        const delay = parseFloat(el.dataset.delay || 0) * 1000;
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translate(0, 0)';
            el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        }, 300 + delay + i * 100);
    });
}

// ===== MOBILE NAV =====
const mobileToggle = document.getElementById('mobileNavToggle');
const sideNav = document.getElementById('sideNav');
if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        sideNav.classList.toggle('open');
    });
}
// Close nav on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            mobileToggle.classList.remove('active');
            sideNav.classList.remove('open');
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = parseFloat(entry.target.dataset.delay || 0) * 1000;
            setTimeout(() => entry.target.classList.add('visible'), delay);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.section [data-animate]').forEach(el => observer.observe(el));

// ===== ACTIVE NAV & DOTS =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const top = section.offsetTop - 200;
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

// Dot click navigation
document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
        const target = document.getElementById(dot.dataset.target);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== COUNTER ANIMATION =====
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.count);
                let current = 0;
                const increment = target / 40;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) { current = target; clearInterval(timer); }
                    counter.textContent = Math.floor(current);
                }, 40);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) counterObserver.observe(statsSection);

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== SECURITY: EMAIL DEOBFUSCATION =====
// Email is split across data attributes to prevent bot scraping
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

// ===== SECURITY: RIGHT-CLICK CONTEXT MENU PROTECTION =====
// Prevents casual copying of content/images
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// ===== SECURITY: KEYBOARD SHORTCUT BLOCKING =====
// Blocks common DevTools and view-source shortcuts
document.addEventListener('keydown', (e) => {
    // F12 — DevTools
    if (e.key === 'F12') { e.preventDefault(); return false; }
    // Ctrl+Shift+I — DevTools
    if (e.ctrlKey && e.shiftKey && e.key === 'I') { e.preventDefault(); return false; }
    // Ctrl+Shift+J — Console
    if (e.ctrlKey && e.shiftKey && e.key === 'J') { e.preventDefault(); return false; }
    // Ctrl+U — View Source
    if (e.ctrlKey && e.key === 'u') { e.preventDefault(); return false; }
    // Ctrl+S — Save page
    if (e.ctrlKey && e.key === 's') { e.preventDefault(); return false; }
    // Ctrl+Shift+C — Element inspector
    if (e.ctrlKey && e.shiftKey && e.key === 'C') { e.preventDefault(); return false; }
});

// ===== SECURITY: IMAGE DRAG PROTECTION =====
// Prevents dragging images to save them
document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
    img.addEventListener('dragstart', (e) => e.preventDefault());
});

// ===== SECURITY: TEXT SELECTION PROTECTION =====
// Prevents casual copy-pasting of content (CSS-based)
document.body.style.webkitUserSelect = 'none';
document.body.style.userSelect = 'none';
// Re-enable selection for specific elements if needed
document.querySelectorAll('.skill-tag, .project-tags span').forEach(el => {
    el.style.webkitUserSelect = 'text';
    el.style.userSelect = 'text';
});

// ===== SECURITY: CONSOLE WARNING =====
// Warns visitors who open the console
console.log(
    '%c⚠️ WARNING!',
    'color: #ff4444; font-size: 40px; font-weight: bold; text-shadow: 2px 2px 0 #000;'
);
console.log(
    '%cThis is a browser feature intended for developers.\nIf someone told you to paste something here, it is likely a scam.\nDo NOT paste any code here!',
    'color: #ffffff; font-size: 16px; background: #1a1a1a; padding: 12px; border-radius: 8px;'
);

// ===== SECURITY: LINK SAFETY AUDIT =====
// Ensure all external links have security attributes
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    if (!link.getAttribute('rel') || !link.getAttribute('rel').includes('noopener')) {
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ==========================================
// ===== 3D GRAPHICS & THREE.JS ENGINE =====
// ==========================================

function initThreeScene() {
    const canvas = document.getElementById('bg-3d-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // --- Scene, Camera & Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3500);
    camera.position.z = 650;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- Dynamic 3D Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f2fe, 3.2, 1600);
    cyanLight.position.set(300, 250, 400);
    scene.add(cyanLight);

    const goldLight = new THREE.PointLight(0xd4af37, 2.5, 1400);
    goldLight.position.set(-350, -150, 350);
    scene.add(goldLight);

    const purpleLight = new THREE.PointLight(0x9d4edd, 2.2, 1600);
    purpleLight.position.set(0, -600, 450);
    scene.add(purpleLight);

    // --- 3D Particle Starfield & Cyber Dust ---
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 650 : 1300;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const particleData = [];

    const colorPalette = [
        new THREE.Color(0x8ecae6), // Ice blue
        new THREE.Color(0x00f2fe), // Electric Cyan
        new THREE.Color(0xd4af37), // Celestial Gold
        new THREE.Color(0x9d4edd), // Neon Purple
        new THREE.Color(0xffffff)  // Pure Starlight
    ];

    for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 2400;
        const y = (Math.random() - 0.5) * 3800;
        const z = (Math.random() - 0.5) * 1600;
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        particleData.push({
            originX: x,
            originY: y,
            originZ: z,
            speed: 0.2 + Math.random() * 0.7,
            phase: Math.random() * Math.PI * 2,
            radius: 12 + Math.random() * 32
        });

        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Dynamic glowing circular particle texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const radGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    radGrad.addColorStop(0, 'rgba(255,255,255,1)');
    radGrad.addColorStop(0.3, 'rgba(142,202,230,0.85)');
    radGrad.addColorStop(0.7, 'rgba(0,242,254,0.3)');
    radGrad.addColorStop(1, 'rgba(0,0,0,0)');
    pCtx.fillStyle = radGrad;
    pCtx.beginPath();
    pCtx.arc(16, 16, 16, 0, Math.PI * 2);
    pCtx.fill();
    const particleTex = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
        size: isMobile ? 4.0 : 5.5,
        map: particleTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const starParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(starParticles);

    // --- 3D Geometric Polyhedra & Floating Crystals ---
    const floatingObjects = [];

    // 1. Hero Holographic Core (Icosahedron + Octahedron + Ring)
    const heroCoreGroup = new THREE.Group();
    heroCoreGroup.position.set(isMobile ? 0 : 270, 60, 40);

    const outerIcosaGeo = new THREE.IcosahedronGeometry(isMobile ? 70 : 95, 1);
    const outerIcosaMat = new THREE.MeshStandardMaterial({
        color: 0x8ecae6,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
        roughness: 0.2,
        metalness: 0.85
    });
    const outerIcosa = new THREE.Mesh(outerIcosaGeo, outerIcosaMat);
    heroCoreGroup.add(outerIcosa);

    const innerOctaGeo = new THREE.OctahedronGeometry(isMobile ? 42 : 55, 0);
    const innerOctaMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        wireframe: true,
        transparent: true,
        opacity: 0.65,
        roughness: 0.3,
        metalness: 0.9
    });
    const innerOcta = new THREE.Mesh(innerOctaGeo, innerOctaMat);
    heroCoreGroup.add(innerOcta);

    const ringGeo = new THREE.TorusGeometry(isMobile ? 95 : 130, 1.2, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        transparent: true,
        opacity: 0.35
    });
    const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
    orbitalRing.rotation.x = Math.PI / 3;
    heroCoreGroup.add(orbitalRing);

    scene.add(heroCoreGroup);
    floatingObjects.push({ mesh: heroCoreGroup, rotX: 0.005, rotY: 0.008, rotZ: 0.002, baseY: 60 });

    // 2. About Section: Dodecahedron
    const dodecaGeo = new THREE.DodecahedronGeometry(60, 0);
    const dodecaMat = new THREE.MeshStandardMaterial({
        color: 0x00f2fe,
        wireframe: true,
        transparent: true,
        opacity: 0.4
    });
    const dodeca = new THREE.Mesh(dodecaGeo, dodecaMat);
    dodeca.position.set(-360, -550, 60);
    scene.add(dodeca);
    floatingObjects.push({ mesh: dodeca, rotX: 0.006, rotY: 0.009, rotZ: 0.004, baseY: -550 });

    // 3. Projects Section: Torus Knot
    const knotGeo = new THREE.TorusKnotGeometry(55, 12, 100, 16);
    const knotMat = new THREE.MeshStandardMaterial({
        color: 0x9d4edd,
        wireframe: true,
        transparent: true,
        opacity: 0.42
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    knot.position.set(380, -1250, 40);
    scene.add(knot);
    floatingObjects.push({ mesh: knot, rotX: 0.007, rotY: 0.005, rotZ: 0.003, baseY: -1250 });

    // 4. Background Section: Octahedron
    const octGeo2 = new THREE.OctahedronGeometry(50, 0);
    const octMat2 = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    const oct2 = new THREE.Mesh(octGeo2, octMat2);
    oct2.position.set(-320, -1900, 50);
    scene.add(oct2);
    floatingObjects.push({ mesh: oct2, rotX: 0.008, rotY: 0.006, rotZ: 0.005, baseY: -1900 });

    // 5. Contact Section: Floating Tetrahedron
    const tetraGeo = new THREE.TetrahedronGeometry(45, 0);
    const tetraMat = new THREE.MeshStandardMaterial({
        color: 0x8ecae6,
        wireframe: true,
        transparent: true,
        opacity: 0.45
    });
    const tetra = new THREE.Mesh(tetraGeo, tetraMat);
    tetra.position.set(300, -2600, 70);
    scene.add(tetra);
    floatingObjects.push({ mesh: tetra, rotX: 0.009, rotY: 0.007, rotZ: 0.004, baseY: -2600 });

    // --- Interactive 3D Click Shockwave System ---
    const shockwaves = [];
    window.addEventListener('click', (e) => {
        const mouseNormX = (e.clientX / window.innerWidth) * 2 - 1;
        const mouseNormY = -(e.clientY / window.innerHeight) * 2 + 1;

        const shockCount = 36;
        const shockGeo = new THREE.BufferGeometry();
        const shockPos = new Float32Array(shockCount * 3);
        const velocities = [];

        const clickWorldX = mouseNormX * (camera.position.z * Math.tan(camera.fov * Math.PI / 360)) * camera.aspect;
        const clickWorldY = camera.position.y + mouseNormY * (camera.position.z * Math.tan(camera.fov * Math.PI / 360));

        for (let i = 0; i < shockCount; i++) {
            shockPos[i * 3] = clickWorldX;
            shockPos[i * 3 + 1] = clickWorldY;
            shockPos[i * 3 + 2] = 200;

            const angle = (i / shockCount) * Math.PI * 2;
            const speed = 4 + Math.random() * 3;
            velocities.push({
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                vz: (Math.random() - 0.5) * 2
            });
        }

        shockGeo.setAttribute('position', new THREE.BufferAttribute(shockPos, 3));
        const shockMat = new THREE.PointsMaterial({
            size: 6.0,
            map: particleTex,
            color: new THREE.Color(0x00f2fe),
            transparent: true,
            opacity: 1.0,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const shockPoints = new THREE.Points(shockGeo, shockMat);
        scene.add(shockPoints);
        shockwaves.push({ points: shockPoints, velocities, age: 0, maxAge: 45 });
    });

    // --- Mouse Parallax & Scroll Physics ---
    let targetMouseX = 0, targetMouseY = 0;
    let smoothMouseX = 0, smoothMouseY = 0;

    window.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
        targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            targetMouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
            targetMouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        }
    }, { passive: true });

    // Handle Window Resizing
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Pause when tab is inactive to save battery
    let isPageVisible = true;
    document.addEventListener('visibilitychange', () => {
        isPageVisible = !document.hidden;
    });

    // --- Animation Loop ---
    let clock = new THREE.Clock();

    function render3D() {
        requestAnimationFrame(render3D);
        if (!isPageVisible) return;

        const elapsedTime = clock.getElapsedTime();

        // Smooth mouse damping
        smoothMouseX += (targetMouseX - smoothMouseX) * 0.05;
        smoothMouseY += (targetMouseY - smoothMouseY) * 0.05;

        // Camera scroll & mouse parallax
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFrac = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        const targetCamY = -scrollFrac * 2700;

        camera.position.x += (smoothMouseX * 120 - camera.position.x) * 0.05;
        camera.position.y += (targetCamY + smoothMouseY * 80 - camera.position.y) * 0.06;
        camera.rotation.y = -smoothMouseX * 0.08;
        camera.rotation.x = smoothMouseY * 0.08;

        // Update star particles (gentle drift and oscillation)
        const posAttr = starParticles.geometry.attributes.position;
        const posArray = posAttr.array;
        for (let i = 0; i < particleCount; i++) {
            const data = particleData[i];
            posArray[i * 3 + 1] = data.originY + Math.sin(elapsedTime * data.speed + data.phase) * data.radius;
            posArray[i * 3] = data.originX + Math.cos(elapsedTime * (data.speed * 0.5) + data.phase) * (data.radius * 0.5);
        }
        posAttr.needsUpdate = true;
        starParticles.rotation.y = elapsedTime * 0.015;

        // Rotate & bob floating 3D polyhedra
        floatingObjects.forEach((obj, idx) => {
            obj.mesh.rotation.x += obj.rotX;
            obj.mesh.rotation.y += obj.rotY;
            obj.mesh.rotation.z += obj.rotZ;
            obj.mesh.position.y = obj.baseY + Math.sin(elapsedTime * 1.5 + idx) * 18;
        });

        // Orbit Hero ring specifically
        orbitalRing.rotation.z += 0.012;
        innerOcta.rotation.x -= 0.01;
        innerOcta.rotation.y -= 0.012;

        // Update shockwaves
        for (let s = shockwaves.length - 1; s >= 0; s--) {
            const sw = shockwaves[s];
            sw.age++;
            const sPos = sw.points.geometry.attributes.position.array;
            for (let p = 0; p < sw.velocities.length; p++) {
                sPos[p * 3] += sw.velocities[p].vx;
                sPos[p * 3 + 1] += sw.velocities[p].vy;
                sPos[p * 3 + 2] += sw.velocities[p].vz;
            }
            sw.points.geometry.attributes.position.needsUpdate = true;
            sw.points.material.opacity = 1 - (sw.age / sw.maxAge);

            if (sw.age >= sw.maxAge) {
                scene.remove(sw.points);
                sw.points.geometry.dispose();
                sw.points.material.dispose();
                shockwaves.splice(s, 1);
            }
        }

        // Move light positions slightly for dynamic specular shifts
        cyanLight.position.x = Math.sin(elapsedTime * 0.7) * 350 + 200;
        cyanLight.position.y = Math.cos(elapsedTime * 0.5) * 200 + camera.position.y;
        goldLight.position.y = camera.position.y - 200 + Math.sin(elapsedTime * 0.6) * 150;

        renderer.render(scene, camera);
    }

    render3D();
}

// ==========================================
// ===== 3D CARD TILT & GLARE PHYSICS =====
// ==========================================

function init3DCardTilt() {
    const tiltElements = document.querySelectorAll('.project-card, .work-card, .hero-portrait, .image-frame, .stat-item, .contact-item');
    if (!tiltElements.length) return;

    tiltElements.forEach(card => {
        // Inject 3D glare highlight if not present
        if (!card.querySelector('.card-glare') && (card.classList.contains('project-card') || card.classList.contains('work-card'))) {
            const glare = document.createElement('div');
            glare.className = 'card-glare';
            card.appendChild(glare);
        }

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -12; // Max 12 deg tilt
            const rotateY = ((x - centerX) / centerX) * 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;

            // Update glare position
            const glare = card.querySelector('.card-glare');
            if (glare) {
                const glareX = (x / rect.width) * 100;
                const glareY = (y / rect.height) * 100;
                card.style.setProperty('--glare-x', `${glareX}%`);
                card.style.setProperty('--glare-y', `${glareY}%`);
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.15s ease-out';
        });
    });
}

// Initialize 3D Engine on window load
window.addEventListener('DOMContentLoaded', () => {
    initThreeScene();
    init3DCardTilt();
});

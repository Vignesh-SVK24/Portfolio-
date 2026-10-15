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

    // --- Dynamic 3D Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f2fe, 1.8, 1200);
    cyanLight.position.set(200, 200, 300);
    scene.add(cyanLight);

    const goldLight = new THREE.PointLight(0xd4af37, 1.4, 1000);
    goldLight.position.set(-250, -100, 250);
    scene.add(goldLight);

    // --- 3D Ambient Particle Constellation ---
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 350 : 750;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const particleData = [];

    const colorPalette = [
        new THREE.Color(0x8ecae6), // Soft sky blue
        new THREE.Color(0x00f2fe), // Electric Cyan
        new THREE.Color(0xffffff), // Pure Starlight
        new THREE.Color(0xd4af37)  // Subtle Gold
    ];

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
            speed: 0.15 + Math.random() * 0.45,
            phase: Math.random() * Math.PI * 2,
            radius: 8 + Math.random() * 18
        });

        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Crisp soft particle texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const radGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    radGrad.addColorStop(0, 'rgba(255,255,255,1)');
    radGrad.addColorStop(0.3, 'rgba(142,202,230,0.8)');
    radGrad.addColorStop(0.7, 'rgba(0,242,254,0.25)');
    radGrad.addColorStop(1, 'rgba(0,0,0,0)');
    pCtx.fillStyle = radGrad;
    pCtx.beginPath();
    pCtx.arc(16, 16, 16, 0, Math.PI * 2);
    pCtx.fill();
    const particleTex = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
        size: isMobile ? 3.5 : 4.5,
        map: particleTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const starParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(starParticles);

    // --- Mouse Parallax & Scroll Physics ---
    let targetMouseX = 0, targetMouseY = 0;
    let smoothMouseX = 0, smoothMouseY = 0;

    window.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
        targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Resize Handler
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
        smoothMouseX += (targetMouseX - smoothMouseX) * 0.04;
        smoothMouseY += (targetMouseY - smoothMouseY) * 0.04;

        // Camera scroll tracking
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFrac = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        const targetCamY = -scrollFrac * 2000;

        camera.position.x += (smoothMouseX * 60 - camera.position.x) * 0.04;
        camera.position.y += (targetCamY + smoothMouseY * 40 - camera.position.y) * 0.05;
        camera.rotation.y = -smoothMouseX * 0.04;
        camera.rotation.x = smoothMouseY * 0.04;

        // Gentle particle motion
        const posAttr = starParticles.geometry.attributes.position;
        const posArray = posAttr.array;
        for (let i = 0; i < particleCount; i++) {
            const data = particleData[i];
            posArray[i * 3 + 1] = data.originY + Math.sin(elapsedTime * data.speed + data.phase) * data.radius;
            posArray[i * 3] = data.originX + Math.cos(elapsedTime * (data.speed * 0.5) + data.phase) * (data.radius * 0.5);
        }
        posAttr.needsUpdate = true;
        starParticles.rotation.y = elapsedTime * 0.01;

        renderer.render(scene, camera);
    }

    render3D();
}

// Initialize 3D Engine on window load
window.addEventListener('DOMContentLoaded', () => {
    initThreeScene();
});

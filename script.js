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

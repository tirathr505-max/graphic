
/* 1. TYPING ANIMATION */

const words = [
    "Graphic Designer",
    "Digital Artist",
    "Creative Thinker",
    "AI Design Explorer",
    "UI/UX Designer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeEffect() {
    const currentWord = words[wordIndex];

    if (!deleting) {
        typing.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1300);
            return;
        }
    } else {
        typing.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, deleting ? 45 : 90);
}

typeEffect();


/* 2. PARTICLE BACKGROUND */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    createParticles();
}

function createParticles() {
    particles = [];

    const count = Math.min(
        75,
        Math.floor(window.innerWidth / 15)
    );

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.6,
            speedY: (Math.random() - 0.5) * 0.6,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > window.innerWidth) p.speedX *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(173,120,255,${p.opacity})`;
        ctx.fill();

        particles.forEach(other => {
            const dx = p.x - other.x;
            const dy = p.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 110) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(other.x, other.y);

                ctx.strokeStyle =
                    `rgba(130,100,255,${0.12 * (1 - distance / 110)})`;

                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animateParticles);
}

resizeCanvas();
animateParticles();

window.addEventListener("resize", resizeCanvas);


/* 3. MOUSE GLOW */

const glow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});


/* 4. SCROLL REVEAL */

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
});


/* 5. PROJECT FILTER */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        projectCards.forEach(card => {

            const category = card.dataset.category;

            if (filter === "all" || filter === category) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }

        });

    });

});


/* 6. MOBILE MENU */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});


/* 7. 3D PROJECT HOVER */

const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        if (window.innerWidth < 800) return;

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y - rect.height / 2) / rect.height) * -7;
        const rotateY = ((x - rect.width / 2) / rect.width) * 7;

        card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

    });

    card.addEventListener("mouseleave", () => {
        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });

});


/* 8. NAVBAR SCROLL EFFECT */

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.style.borderBottom = "1px solid #a36bff40";
    } else {
        navbar.style.borderBottom = "1px solid #ffffff0b";
    }

});


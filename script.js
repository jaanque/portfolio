document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    const preloader = document.getElementById('preloader');
    const progressElement = document.getElementById('progress');
    const heroCanvas = document.getElementById('hero-canvas');

    // --- PROCEDURAL HERO SCENE ---
    const numShapes = 20;
    for (let i = 0; i < numShapes; i++) {
        const shape = document.createElement('div');
        shape.classList.add('shape');
        gsap.set(shape, {
            position: 'absolute',
            x: 'random(0, 100)vw',
            y: 'random(0, 100)vh',
            width: 'random(20, 80)px',
            height: 'random(20, 80)px',
            backgroundColor: 'var(--primary-color)',
            opacity: 'random(0.1, 0.6)',
            borderRadius: '50%',
            filter: 'blur(5px)'
        });
        heroCanvas.appendChild(shape);
    }

    // --- PRELOADER ANIMATION ---
    const tlPreloader = gsap.timeline();

    tlPreloader.to(progressElement, {
        duration: 3,
        innerText: 100,
        roundProps: "innerText",
        ease: "power2.inOut",
        onUpdate: function() {
            progressElement.textContent = this.targets()[0].innerText + "%";
        }
    }).to(preloader, {
        duration: 1,
        autoAlpha: 0,
        ease: "power2.inOut"
    }, "-=0.5")
    .fromTo("header", {
        y: -100, autoAlpha: 0
    }, {
        duration: 1, y: 0, autoAlpha: 1, ease: "power2.out"
    }, "-=0.5")
    .fromTo("#hero .reveal", {
        y: 50, autoAlpha: 0
    }, {
        duration: 1.5, y: 0, autoAlpha: 1, stagger: 0.3, ease: "power2.out"
    }, "-=0.8")
    .from(".shape", { // Animate the procedural shapes in
        duration: 2,
        scale: 0,
        autoAlpha: 0,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=1.5");


    // --- MOUSE PARALLAX EFFECT ---
    const shapes = gsap.utils.toArray('.shape');
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const xPercent = (clientX / window.innerWidth - 0.5) * 2;
        const yPercent = (clientY / window.innerHeight - 0.5) * 2;

        shapes.forEach((shape, i) => {
            const depth = (i / shapes.length) * 0.5 + 0.5; // Depth from 0.5 to 1
            gsap.to(shape, {
                x: xPercent * 50 * depth,
                y: yPercent * 50 * depth,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });


    // --- SCROLL ANIMATIONS ---
    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 100, autoAlpha: 0, duration: 1, ease: "power2.out"
        });
    });

    gsap.from("#skills li", {
        scrollTrigger: {
            trigger: "#skills ul",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 50, autoAlpha: 0, duration: 0.8, stagger: 0.1, ease: "power2.out"
    });
});

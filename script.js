
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // --- 1. CURSOR PERSONALIZADO ---
    const cursor = document.querySelector('.cursor-follow');
    window.addEventListener('mousemove', e => {
        gsap.to(cursor, { duration: 0.2, x: e.clientX, y: e.clientY });
    });

    // --- 2. PRELOADER INMERSIVO ---
    const preloaderText = document.querySelector('.preloader-text');
    const preloaderTimeline = gsap.timeline();

    preloaderTimeline
        .to(preloaderText, {
            text: "Creando Experiencias...",
            duration: 1.5,
            ease: "none"
        })
        .to(preloaderText, {
            text: "Casi Listo.",
            duration: 1,
            ease: "none"
        })
        .to('.preloader', {
            duration: 1.5,
            y: '-100%',
            ease: 'power4.inOut'
        });

    // --- 3. ANIMACIÓN CINEMATOGRÁFICA DEL HÉROE ---
    const heroTimeline = gsap.timeline({
        delay: preloaderTimeline.duration() - 0.5 // Sincronizar con el preloader
    });

    heroTimeline.from('.hero-title span', {
        y: 100,
        skewY: 7,
        duration: 2,
        stagger: 0.2,
        ease: 'power4.out'
    });

    // --- 4. SCROLL-TELLING EN "SOBRE MÍ" ---
    gsap.timeline({
        scrollTrigger: {
            trigger: '.about',
            start: 'top top',
            end: '+=1500',
            scrub: true,
            pin: true
        }
    })
    .from('.about-text h2', { opacity: 0, y: 50 })
    .from('.about-text p', { opacity: 0, y: 50 });


    // --- 5. GALERÍA DE PROYECTOS INTERACTIVA ---
    const projects = gsap.utils.toArray('.project-item');
    const projectsContainer = document.querySelector('.projects-container');
    const totalWidth = projects.length * window.innerWidth;

    // Asignar imágenes de fondo
    projects.forEach(project => {
        const imgUrl = project.getAttribute('data-img');
        project.style.backgroundImage = `url(${imgUrl})`;
    });

    gsap.to(projectsContainer, {
        x: () => -(projectsContainer.scrollWidth - document.documentElement.clientWidth),
        ease: 'none',
        scrollTrigger: {
            trigger: '.projects-section',
            start: 'top top',
            end: () => '+=' + (projectsContainer.scrollWidth - document.documentElement.clientWidth),
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
        }
    });

    // --- 6. COREOGRAFÍA DE HABILIDADES ---
    gsap.from('.skills-list span', {
        y: 100,
        opacity: 0,
        rotation: 30,
        stagger: {
            amount: 1,
            from: "random"
        },
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1
        }
    });

    // --- 7. FINAL ÉPICO ---
    gsap.from('.contact h2, .contact-link', {
        opacity: 0,
        y: 50,
        stagger: 0.3,
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});

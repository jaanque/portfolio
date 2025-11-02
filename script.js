
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Animación de entrada para la sección Hero
    const heroTimeline = gsap.timeline();
    heroTimeline.from('.section-hero h1', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' })
                .from('.section-hero p', { duration: 1, y: 20, opacity: 0, ease: 'power3.out' }, '-=0.5');

    // Scroll horizontal para la sección de Proyectos
    const projects = gsap.utils.toArray('.project');
    const projectsContainer = document.querySelector('.projects-container');

    gsap.to(projectsContainer, {
        x: () => -(projectsContainer.scrollWidth - document.documentElement.clientWidth) + "px",
        ease: "none",
        scrollTrigger: {
            trigger: ".section-projects",
            pin: true,
            scrub: 1,
            end: () => "+=" + projectsContainer.scrollWidth,
            invalidateOnRefresh: true
        }
    });

    // Animación para la sección "Sobre mí"
    gsap.from('.section-about h2, .section-about p', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: '.section-about',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    // Animación escalonada para la lista de Habilidades
    gsap.from('.section-skills li', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.section-skills',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    // Animación para la sección de Contacto
    gsap.from('.section-contact h2, .section-contact form', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: '.section-contact',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
});

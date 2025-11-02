
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SETUP: SCROLL SUAVE (LENIS) ---
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- 2. PRELOADER ROBUSTO ---
    const preloader = document.querySelector('.preloader');
    const preloaderText = document.querySelector('.preloader-text');
    const assets = document.querySelectorAll('.asset');
    const totalAssets = assets.length;
    let loadedAssets = 0;

    const updateProgress = () => {
        loadedAssets++;
        const percent = Math.round((loadedAssets / totalAssets) * 100);
        preloaderText.textContent = `${percent}%`;
        if (loadedAssets === totalAssets) {
            // Todos los activos cargados, iniciar la animación de salida
            gsap.to(preloader, {
                duration: 1.5,
                y: '-100%',
                ease: 'power4.inOut',
                delay: 0.5,
                onComplete: () => {
                    preloader.style.display = 'none';
                    initAnimations(); // Iniciar animaciones principales
                }
            });
        }
    };

    // Si no hay assets, saltar el preloader después de un momento
    if (totalAssets === 0) {
        updateProgress();
    } else {
        assets.forEach(asset => {
            // Truco para asegurar que se dispare el evento 'load'
            const img = new Image();
            img.src = asset.src;
            img.onload = updateProgress;
            img.onerror = updateProgress; // Contar también si hay error para no bloquear
        });
    }

    // --- 3. COREOGRAFÍA DE ANIMACIÓN PRINCIPAL ---
    function initAnimations() {
        // Animación de entrada de la cabecera
        gsap.from('.header .logo, .header .nav a, .header .user-actions button', {
            duration: 1,
            y: -30,
            autoAlpha: 0, // Usa autoAlpha para visibilidad y opacidad
            stagger: 0.1,
            ease: 'power3.out'
        });

        // Animación de entrada del título (línea por línea)
        gsap.from('.hero-title .line', {
            duration: 1.5,
            yPercent: 100,
            autoAlpha: 0,
            stagger: 0.2,
            ease: 'power4.out',
            delay: 0.5
        });

        // Animación de entrada de los activos 3D
        gsap.from('.asset', {
            duration: 1.5,
            scale: 0,
            autoAlpha: 0,
            rotation: () => Math.random() * 180 - 90,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 1
        });

        // --- 4. EFECTOS PARALLAX ---
        const scene = document.querySelector('.scene');
        const layers = document.querySelectorAll('.layer');

        // 4.1 Parallax con el Ratón
        scene.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2; // Rango de -1 a 1
            const y = (e.clientY / window.innerHeight - 0.5) * 2; // Rango de -1 a 1

            layers.forEach(layer => {
                const depth = layer.dataset.depth || 0;
                const moveX = x * depth * 50; // Factor de movimiento
                const moveY = y * depth * 50;
                gsap.to(layer, {
                    x: moveX,
                    y: moveY,
                    duration: 0.5,
                    ease: 'power3.out'
                });
            });
        });

        // 4.2 Parallax con el Scroll
        gsap.to('.asset', {
            y: (i, target) => {
                const depth = target.dataset.depth || 0;
                return `-${200 * depth}px`; // Mover más los elementos "cercanos"
            },
            ease: 'none',
            scrollTrigger: {
                trigger: '.scene-container',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }
});


(function() {
    // --- 1. SETUP: SCROLL SUAVE (LENIS) ---
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- 2. SETUP: FONDO INTERACTIVO (THREE.JS) ---
    let scene, camera, renderer, particles;
    let mouseX = 0, mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    function initThree() {
        const canvas = document.getElementById('webgl-canvas');
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const particleCount = 5000;
        const particlesGeometry = new THREE.BufferGeometry();
        const posArray = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 500;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: 0x888888
        });
        particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        document.body.onmousemove = (e) => {
            mouseX = e.clientX - windowHalfX;
            mouseY = e.clientY - windowHalfY;
        };
        window.onresize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
    }

    function animateThree() {
        requestAnimationFrame(animateThree);
        camera.position.x += (mouseX * 0.001 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.001 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        particles.rotation.y += 0.0005;
        renderer.render(scene, camera);
    }

    // --- 3. LÓGICA DE ANIMACIÓN PRINCIPAL ---
    function initAnimations() {
        // 3.1 Dividir texto en caracteres
        const targets = document.querySelectorAll("[data-splitting]");
        const results = new SplitType(targets, { types: 'chars' });

        // 3.2 Animación de entrada del Héroe
        gsap.from(".hero .char", {
            y: "100%",
            opacity: 0,
            stagger: 0.05,
            duration: 1.5,
            ease: "power4.out"
        });

        // 3.3 Animación de la sección "Sobre mí"
        gsap.from(".about .char", {
            y: "100%",
            opacity: 0,
            stagger: 0.02,
            scrollTrigger: {
                trigger: ".about",
                start: "top 70%",
                end: "bottom center",
                scrub: true
            }
        });

        // 3.4 Animación de títulos de sección
        document.querySelectorAll('.projects .section-title, .contact .section-title').forEach(title => {
             gsap.from(title.querySelectorAll('.char'), {
                y: "100%",
                opacity: 0,
                stagger: 0.05,
                scrollTrigger: {
                    trigger: title,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // 3.5 Efecto hover en Proyectos
        const preview = document.querySelector('.project-image-preview');
        document.querySelectorAll('.project-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                preview.style.backgroundImage = `url(${link.dataset.img})`;
                gsap.to(preview, { opacity: 1, scale: 1, duration: 0.3 });
            });
            link.addEventListener('mouseleave', () => {
                gsap.to(preview, { opacity: 0, scale: 0.8, duration: 0.3 });
            });
            link.addEventListener('mousemove', (e) => {
                gsap.to(preview, { x: e.clientX, y: e.clientY, duration: 0.2 });
            });
        });
    }

    // --- 4. PRELOADER ---
    window.onload = function() {
        const preloader = document.getElementById('preloader');
        const percent = document.getElementById('percent');
        let counter = { val: 0 };

        gsap.to(counter, {
            val: 100,
            duration: 1,
            onUpdate: () => percent.textContent = Math.round(counter.val),
            onComplete: () => {
                gsap.to(preloader, {
                    y: "-100%",
                    duration: 1.2,
                    ease: "power4.inOut",
                    onComplete: () => {
                        preloader.style.display = 'none';
                        initAnimations(); // Iniciar animaciones después del preloader
                    }
                });
            }
        });
    };

    // --- INICIAR TODO ---
    initThree();
    animateThree();

})();

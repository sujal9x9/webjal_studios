/* ==========================================================================
   Webjal Studios — Script (Three.js + GSAP + Interactions)
   ========================================================================== */

// ---------- Wait for DOM ----------
document.addEventListener('DOMContentLoaded', () => {

    // ============================
    //  LOADING SCREEN
    // ============================
    const loader = document.getElementById('loader');
    const loaderBarFill = document.getElementById('loader-bar-fill');
    let progress = 0;

    const loaderInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loaderInterval);
            setTimeout(() => {
                loader.classList.add('hidden');
                initHeroAnimations();
            }, 500);
        }
        loaderBarFill.style.width = progress + '%';
    }, 200);

    // ============================
    //  CUSTOM CURSOR
    // ============================
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.opacity = '1';
            follower.style.opacity = '1';
            cursor.style.left = mouseX - 6 + 'px';
            cursor.style.top = mouseY - 6 + 'px';
        });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            follower.style.left = followerX - 20 + 'px';
            follower.style.top = followerY - 20 + 'px';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Cursor hover effect on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, .service-card, .portfolio-card, .social-link, input, textarea');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                follower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                follower.classList.remove('active');
            });
        });
    }

    // ============================
    //  THREE.JS ANIMATED BACKGROUND
    // ============================
    const canvas = document.getElementById('three-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 30;

    // Floating geometric shapes
    const geometries = [];
    const shapeMaterials = [
        new THREE.MeshBasicMaterial({ color: 0x6c63ff, wireframe: true, transparent: true, opacity: 0.15 }),
        new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true, transparent: true, opacity: 0.12 }),
        new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.1 }),
        new THREE.MeshBasicMaterial({ color: 0xec4899, wireframe: true, transparent: true, opacity: 0.1 }),
    ];

    const shapeTypes = [
        () => new THREE.IcosahedronGeometry(1, 0),
        () => new THREE.OctahedronGeometry(1, 0),
        () => new THREE.TetrahedronGeometry(1, 0),
        () => new THREE.TorusGeometry(0.7, 0.3, 8, 16),
        () => new THREE.BoxGeometry(1, 1, 1),
    ];

    for (let i = 0; i < 50; i++) {
        const geometry = shapeTypes[Math.floor(Math.random() * shapeTypes.length)]();
        const material = shapeMaterials[Math.floor(Math.random() * shapeMaterials.length)];
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.x = (Math.random() - 0.5) * 60;
        mesh.position.y = (Math.random() - 0.5) * 60;
        mesh.position.z = (Math.random() - 0.5) * 40;

        const scale = Math.random() * 1.5 + 0.3;
        mesh.scale.set(scale, scale, scale);

        mesh.userData = {
            rotSpeedX: (Math.random() - 0.5) * 0.01,
            rotSpeedY: (Math.random() - 0.5) * 0.01,
            floatSpeed: Math.random() * 0.003 + 0.001,
            floatOffset: Math.random() * Math.PI * 2,
            originalY: mesh.position.y,
        };

        scene.add(mesh);
        geometries.push(mesh);
    }

    // Particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        color: 0x6c63ff,
        size: 0.08,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Mouse parallax for 3D scene
    let targetRotX = 0;
    let targetRotY = 0;

    document.addEventListener('mousemove', (e) => {
        targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.3;
        targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.3;
    });

    // Scroll-based parallax
    let scrollY = 0;
    window.addEventListener('scroll', () => {
        scrollY = window.pageYOffset;
    });

    // Three.js Animation Loop
    const clock = new THREE.Clock();

    function animateThree() {
        requestAnimationFrame(animateThree);
        const elapsed = clock.getElapsedTime();

        // Rotate shapes
        geometries.forEach(mesh => {
            mesh.rotation.x += mesh.userData.rotSpeedX;
            mesh.rotation.y += mesh.userData.rotSpeedY;
            mesh.position.y = mesh.userData.originalY + Math.sin(elapsed * mesh.userData.floatSpeed * 100 + mesh.userData.floatOffset) * 0.5;
        });

        // Rotate particles
        particles.rotation.y = elapsed * 0.02;
        particles.rotation.x = elapsed * 0.01;

        // Camera parallax
        camera.rotation.x += (targetRotX - camera.rotation.x) * 0.05;
        camera.rotation.y += (targetRotY - camera.rotation.y) * 0.05;

        // Scroll parallax
        camera.position.y = -(scrollY * 0.005);

        renderer.render(scene, camera);
    }

    animateThree();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // ============================
    //  GSAP HERO ANIMATIONS
    // ============================
    function initHeroAnimations() {
        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Title lines
        gsap.to('.title-line', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.2,
        });

        // Subtitle
        gsap.to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.8,
            ease: 'power3.out',
        });

        // CTA buttons
        gsap.to('.hero-cta', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 1,
            ease: 'power3.out',
        });

        // Stats
        gsap.to('.hero-stats', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 1.3,
            ease: 'power3.out',
        });

        // Counter animation
        setTimeout(() => animateCounters(), 1400);

        // Init scroll-triggered animations
        initScrollAnimations();
    }

    // ============================
    //  COUNTER ANIMATION
    // ============================
    function animateCounters() {
        document.querySelectorAll('.stat-number').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const start = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                counter.textContent = Math.floor(eased * target);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // ============================
    //  SCROLL-TRIGGERED ANIMATIONS
    // ============================
    function initScrollAnimations() {
        // Reveal animations
        document.querySelectorAll('.reveal-up').forEach(el => {
            const delay = parseFloat(el.getAttribute('data-delay') || 0);

            ScrollTrigger.create({
                trigger: el,
                start: 'top 85%',
                onEnter: () => {
                    setTimeout(() => {
                        el.classList.add('revealed');
                    }, delay * 1000);
                },
            });
        });

        // Section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header.querySelector('.section-tag'), {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: 'power3.out',
            });

            gsap.from(header.querySelector('.section-title'), {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                delay: 0.15,
                ease: 'power3.out',
            });

            gsap.from(header.querySelector('.section-subtitle'), {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                delay: 0.3,
                ease: 'power3.out',
            });
        });

        // Skill bars
        document.querySelectorAll('.skill-fill').forEach(bar => {
            ScrollTrigger.create({
                trigger: bar,
                start: 'top 90%',
                onEnter: () => {
                    bar.style.width = bar.getAttribute('data-width') + '%';
                },
            });
        });

        // Parallax effect for section backgrounds
        gsap.utils.toArray('.section').forEach(section => {
            gsap.to(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
                backgroundPosition: '50% 100%',
                ease: 'none',
            });
        });
    }

    // ============================
    //  NAVBAR
    // ============================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const allNavLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link
        const sections = document.querySelectorAll('.section, .hero');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ============================
    //  SMOOTH SCROLLING
    // ============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================
    //  3D TILT ON SERVICE CARDS
    // ============================
    if (window.innerWidth > 768) {
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;

                card.querySelector('.service-card-inner').style.transform =
                    `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.querySelector('.service-card-inner').style.transform =
                    'rotateX(0) rotateY(0) translateY(0)';
            });
        });


        // Tilt on portfolio cards
        document.querySelectorAll('.portfolio-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }

    // ============================
    //  PORTFOLIO FILTER TABS
    // ============================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.position = 'relative';
                    card.style.visibility = 'visible';
                } else {
                    card.classList.add('hidden');
                    // After transition ends, truly hide
                    setTimeout(() => {
                        if (card.classList.contains('hidden')) {
                            card.style.position = 'absolute';
                            card.style.visibility = 'hidden';
                        }
                    }, 500);
                }
            });
        });
    });

    // ============================
    //  CONTACT FORM
    // ============================
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulate form submission
        const btn = contactForm.querySelector('button[type="submit"]');
        btn.innerHTML = '<span>Sending...</span>';
        btn.disabled = true;

        setTimeout(() => {
            contactForm.querySelectorAll('input, textarea').forEach(field => {
                field.style.display = 'none';
            });
            contactForm.querySelectorAll('.form-group').forEach(group => {
                group.style.display = 'none';
            });
            btn.style.display = 'none';
            formSuccess.classList.add('show');
        }, 1500);
    });

    // ============================
    //  MAGNETIC EFFECT ON BUTTONS
    // ============================
    if (window.innerWidth > 768) {
        document.querySelectorAll('.btn-primary, .social-link').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ============================
    //  INTERSECTION OBSERVER FALLBACK
    // ============================
    // For browsers/situations where ScrollTrigger might not fire
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = parseFloat(entry.target.getAttribute('data-delay') || 0);
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, delay * 1000);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
    }

});

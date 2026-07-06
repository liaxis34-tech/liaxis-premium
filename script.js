/* script.js */
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- Luxury Intro Animation ---
    const tlLoader = gsap.timeline({
        onComplete: initInteractions
    });

    tlLoader.to(".loader-progress", {
        width: "100%",
        duration: 1.5,
        ease: "power3.inOut"
    })
    .to(".loader-text .char", {
        y: "0%",
        opacity: 1,
        stagger: 0.05,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.5")
    .to("#loader", {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        delay: 0.5
    });

    // Header Scroll Effect
    window.addEventListener("scroll", () => {
        const header = document.querySelector(".nav-header");
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    function initInteractions() {
        // Hero Text Animation
        gsap.from(".hero-content > *", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Brand Statement Parallax
        gsap.fromTo(".statement-text", 
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0,
                scrollTrigger: {
                    trigger: "#brand-statement",
                    start: "top 80%",
                    end: "bottom 50%",
                    scrub: 1
                }
            }
        );

        // General Reveal Animations
        const revealElements = document.querySelectorAll(".gs-reveal");
        revealElements.forEach((el) => {
            gsap.fromTo(el,
                { autoAlpha: 0, y: 50 },
                {
                    duration: 1, 
                    autoAlpha: 1, 
                    y: 0, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Parallax Image Effect
        const parallaxImages = document.querySelectorAll(".parallax-img");
        parallaxImages.forEach((img) => {
            gsap.to(img, {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: img.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
        
        initThreeJS();
    }

    // --- Three.js 3D Product Reveal ---
    function initThreeJS() {
        const container = document.getElementById('canvas-container');
        if (!container) return;

        const scene = new THREE.Scene();
        
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Create a stylish curved plane to display the product image dynamically
        const geometry = new THREE.PlaneGeometry(3, 4, 32, 32);
        
        // Curve the geometry
        const positions = geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const z = Math.sin(x * 1.5) * 0.2; 
            positions.setZ(i, z);
        }
        geometry.computeVertexNormals();

        // Load the provided WebP asset as a texture
        const textureLoader = new THREE.TextureLoader();
        const material = new THREE.MeshStandardMaterial({ 
            color: 0xffffff,
            side: THREE.DoubleSide,
            roughness: 0.2,
            metalness: 0.1
        });

        textureLoader.load('https://cdn.shopify.com/s/files/1/0761/3366/2774/files/B3A7373A-EB9B-477D-9EF6-CB11E934B610.webp?v=1783289546', (texture) => {
            material.map = texture;
            material.needsUpdate = true;
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = 2; // Offset to the right
        scene.add(mesh);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // ScrollTrigger tie-in for Three.js
        const tl3D = gsap.timeline({
            scrollTrigger: {
                trigger: "#product-reveal",
                start: "top top",
                end: "+=150%",
                pin: true,
                scrub: 1
            }
        });

        tl3D.to(mesh.rotation, { y: Math.PI * 2, x: 0.2, ease: "none" }, 0)
            .to(mesh.position, { x: 0, z: 1, ease: "power1.inOut" }, 0);

        // Render loop
        function animate() {
            requestAnimationFrame(animate);
            // Gentle continuous float
            mesh.position.y = Math.sin(Date.now() * 0.001) * 0.1;
            renderer.render(scene, camera);
        }
        animate();

        // Resize handler
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // --- Shopify Ajax Cart Integration ---
    const addToCartForm = document.getElementById('add-to-cart-form');
    if (addToCartForm) {
        addToCartForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = document.getElementById('add-to-cart-btn');
            btn.classList.add('loading');
            btn.disabled = true;

            const formData = new FormData(addToCartForm);
            const data = {
                items: [{
                    id: parseInt(formData.get('id')),
                    quantity: 1
                }]
            };

            // Shopify AJAX API Call
            fetch(window.Shopify?.routes?.root + 'cart/add.js' || '/cart/add.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(cart => {
                btn.classList.remove('loading');
                btn.querySelector('span').innerText = 'Added to Cart';
                btn.style.backgroundColor = '#2ecc71';
                btn.style.borderColor = '#2ecc71';
                
                // Reset button text after 3 seconds
                setTimeout(() => {
                    btn.querySelector('span').innerText = 'Add to Cart';
                    btn.style.backgroundColor = 'transparent';
                    btn.style.borderColor = 'var(--accent-color)';
                    btn.disabled = false;
                }, 3000);
                
                // Trigger Shopify minicart refresh if applicable in environment
                document.dispatchEvent(new CustomEvent('ajaxProduct:added', { detail: cart }));
            })
            .catch(error => {
                console.error('Error:', error);
                btn.classList.remove('loading');
                btn.querySelector('span').innerText = 'Error - Try Again';
                btn.disabled = false;
            });
        });
    }
});

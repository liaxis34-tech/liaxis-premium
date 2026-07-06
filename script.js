/* =================================================================
   LIAXIS — Premium Custom Storefront
   script.js (ES Module)
   GSAP + ScrollTrigger are loaded globally via <script> tags in index.html.
   Three.js is loaded via native ES module import map.
   ================================================================= */

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

gsap.registerPlugin(ScrollTrigger);

/* =================================================================
   0. SHARED STATE / CONSTANTS
   ================================================================= */
const PRODUCT_PRICE = 1290.0;
const PRODUCT_NAME = "LIAXIS Duruş Destek Sutyeni";
const PRODUCT_DEFAULT_IMAGE =
  "https://cdn.shopify.com/s/files/1/0761/3366/2774/files/B3A7373A-EB9B-477D-9EF6-CB11E934B610.webp?v=1783289546";
const MODEL_URL =
  "https://cdn.shopify.com/3d/models/o/8a4c38631ac1a4b3/luwai-HD_1783337283816.glb";
const CART_STORAGE_KEY = "liaxis_cart_v1";

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const formatTRY = (value) =>
  value.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  });

/* =================================================================
   1. PREMIUM LOADER SEQUENCE
   ================================================================= */
function initLoader() {
  const loader = document.getElementById("loader");
  const barFill = document.getElementById("loaderBarFill");
  const percentEl = document.getElementById("loaderPercent");
  const chars = gsap.utils.toArray(".loader__char");
  const caption = document.querySelector(".loader__caption");
  const markLine = document.querySelector(".loader__mark-line");

  document.body.classList.add("is-loading");

  const progress = { val: 0 };

  const tl = gsap.timeline({
    defaults: { ease: "expo.out" },
    onComplete: () => {
      document.body.classList.remove("is-loading");
      ScrollTrigger.refresh();
      playHeroIntro();
    },
  });

  tl.to(markLine, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" })
    .to(
      chars,
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.045 },
      "-=0.75"
    )
    .to(caption, { opacity: 1, duration: 0.5 }, "-=0.3")
    .to(
      progress,
      {
        val: 100,
        duration: 1.4,
        ease: "power1.inOut",
        onUpdate: () => {
          const v = Math.round(progress.val);
          barFill.style.width = v + "%";
          percentEl.textContent = v;
        },
      },
      "-=0.4"
    )
    .to({}, { duration: 0.25 }) // brief hold at 100%
    .to(loader, {
      yPercent: -100,
      duration: 0.9,
      ease: "power4.inOut",
    })
    .set(loader, { display: "none" });
}

/* =================================================================
   2. HERO INTRO (plays once loader finishes)
   ================================================================= */
function playHeroIntro() {
  const hero = document.getElementById("hero");
  if (!hero) return;

  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

  tl.to(hero.querySelectorAll(".hero__eyebrow span"), {
    yPercent: 0,
    duration: 1,
  })
    .to(
      hero.querySelectorAll(".hero__title .reveal-word__inner"),
      { yPercent: 0, duration: 1.2, stagger: 0.12 },
      "-=0.7"
    )
    .to(
      hero.querySelectorAll(".hero__subtitle span"),
      { yPercent: 0, duration: 1 },
      "-=0.8"
    )
    .to(
      hero.querySelectorAll(".hero__actions .btn"),
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
      "-=0.6"
    )
    .fromTo(
      hero.querySelectorAll(".hero__actions .btn"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
      "<"
    );

  // Subtle hero video parallax as the page scrolls
  gsap.to(".hero__video", {
    yPercent: 14,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

/* =================================================================
   3. CUSTOM CURSOR
   ================================================================= */
function initCustomCursor() {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (!dot || !ring) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const ringPos = { ...pos };

  window.addEventListener("mousemove", (e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
    gsap.set(dot, { x: pos.x, y: pos.y });
  });

  gsap.ticker.add(() => {
    ringPos.x += (pos.x - ringPos.x) * 0.18;
    ringPos.y += (pos.y - ringPos.y) * 0.18;
    gsap.set(ring, { x: ringPos.x, y: ringPos.y });
  });

  const hoverTargets = "a, button, .color-swatch, .size-btn, canvas, input[type='range']";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverTargets)) ring.classList.add("is-hover");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverTargets)) ring.classList.remove("is-hover");
  });
}

/* =================================================================
   4. SIGNATURE SPINE PROGRESS LINE
   ================================================================= */
function initSpineProgress() {
  const fill = document.getElementById("spineFill");
  const node = document.getElementById("spineNode");
  if (!fill || !node) return;

  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      const pct = self.progress * 100;
      fill.style.height = pct + "%";
      node.style.top = pct + "%";
    },
  });
}

/* =================================================================
   5. HEADER STATE + MOBILE NAVIGATION
   ================================================================= */
function initHeaderAndNav() {
  const header = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  const hero = document.getElementById("hero");

  header.classList.add("is-on-dark");

  ScrollTrigger.create({
    start: 0,
    onUpdate: () => {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    },
  });

  if (hero) {
    ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom top",
      onEnter: () => header.classList.add("is-on-dark"),
      onLeave: () => header.classList.remove("is-on-dark"),
      onEnterBack: () => header.classList.add("is-on-dark"),
      onLeaveBack: () => header.classList.add("is-on-dark"),
    });
  }

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("is-modal-open", isOpen);
  });

  siteNav.querySelectorAll(".site-nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("is-modal-open");
    });
  });
}

/* =================================================================
   6. SCROLL REVEAL SYSTEM (text / image / up reveals + parallax)
   ================================================================= */
function initScrollReveals() {
  const sections = document.querySelectorAll("main > section:not(#hero)");

  sections.forEach((section) => {
    const lineSpans = section.querySelectorAll(
      ".reveal-line span, .reveal-word__inner"
    );
    if (lineSpans.length) {
      gsap.to(lineSpans, {
        yPercent: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
        },
      });
    }

    section.querySelectorAll(".reveal-image").forEach((img) => {
      gsap.fromTo(
        img,
        { scale: 1.16 },
        {
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: { trigger: img, start: "top 88%" },
        }
      );
      gsap.fromTo(
        img.parentElement,
        { clipPath: "inset(6% 6% 6% 6% round 24px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 24px)",
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: { trigger: img, start: "top 88%" },
        }
      );
    });

    const ups = section.querySelectorAll(".reveal-up");
    if (ups.length) {
      gsap.to(ups, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: section, start: "top 78%" },
      });
    }
  });

  document.querySelectorAll(".parallax-item").forEach((el) => {
    const speed = parseFloat(el.dataset.speed) || 0.15;
    gsap.to(el, {
      yPercent: speed * 45,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

/* =================================================================
   7. THREE.JS INTERACTIVE 3D PRODUCT VIEWER
   ================================================================= */
function initProductViewer() {
  const stage = document.querySelector(".product-3d__stage");
  const canvas = document.getElementById("productCanvas");
  const loadingWrap = document.getElementById("model3dLoading");
  const loadingFill = document.getElementById("model3dLoadingFill");
  const autoRotateBtn = document.getElementById("autoRotateToggle");
  const callouts = document.querySelectorAll(".product-3d__callout");
  if (!stage || !canvas) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
  } catch (err) {
    loadingWrap.classList.add("is-hidden");
    return;
  }

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    32,
    stage.clientWidth / stage.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0.15, 3.4);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(stage.clientWidth, stage.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  // Premium three-point lighting (no external HDR required)
  const ambient = new THREE.AmbientLight(0xffffff, 0.65);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xfff4ea, 1.4);
  keyLight.position.set(2.5, 3, 2.5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xd8b8a8, 0.55);
  fillLight.position.set(-3, 1, -1);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
  rimLight.position.set(0, 3, -3);
  scene.add(rimLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.enableZoom = true;
  controls.minDistance = 2;
  controls.maxDistance = 5.5;
  controls.minPolarAngle = Math.PI / 4;
  controls.maxPolarAngle = Math.PI - Math.PI / 4;

  let desiredAutoRotate = true;
  controls.autoRotate = desiredAutoRotate && !prefersReducedMotion;
  controls.autoRotateSpeed = 2.2;

  let resumeTimer;
  controls.addEventListener("start", () => {
    controls.autoRotate = false;
    clearTimeout(resumeTimer);
  });
  controls.addEventListener("end", () => {
    if (desiredAutoRotate) {
      resumeTimer = setTimeout(() => {
        controls.autoRotate = true;
      }, 2200);
    }
  });

  if (autoRotateBtn) {
    autoRotateBtn.addEventListener("click", () => {
      desiredAutoRotate = !desiredAutoRotate;
      controls.autoRotate = desiredAutoRotate;
      autoRotateBtn.setAttribute("aria-pressed", String(desiredAutoRotate));
    });
  }

  let modelGroup = null;

  const loader = new GLTFLoader();
  loader.load(
    MODEL_URL,
    (gltf) => {
      modelGroup = gltf.scene;

      // Center + normalize scale so the product always frames consistently
      const box = new THREE.Box3().setFromObject(modelGroup);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      const maxAxis = Math.max(size.x, size.y, size.z) || 1;
      const scale = 1.7 / maxAxis;
      modelGroup.scale.setScalar(scale);

      box.setFromObject(modelGroup);
      box.getCenter(center);
      modelGroup.position.sub(center);

      modelGroup.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = false;
          node.receiveShadow = false;
          if (node.material) node.material.envMapIntensity = 1;
        }
      });

      scene.add(modelGroup);

      gsap.to(loadingWrap, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => loadingWrap.classList.add("is-hidden"),
      });

      revealCallouts();
      ScrollTrigger.refresh();
    },
    (xhr) => {
      if (xhr.lengthComputable) {
        const pct = Math.min(100, Math.round((xhr.loaded / xhr.total) * 100));
        loadingFill.style.width = pct + "%";
      }
    },
    () => {
      loadingWrap.classList.add("is-hidden");
    }
  );

  function revealCallouts() {
    if (!callouts.length) return;
    gsap.to(callouts, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: "back.out(1.6)",
      stagger: 0.15,
      scrollTrigger: { trigger: stage, start: "top 65%" },
      onStart: () => callouts.forEach((c) => c.classList.add("is-visible")),
    });
  }

  // Scroll-triggered camera movement across the section
  if (!prefersReducedMotion) {
    gsap.to(camera.position, {
      z: 2.7,
      y: 0.35,
      ease: "none",
      scrollTrigger: {
        trigger: stage,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });
  }

  // Pause rendering when off-screen for performance
  let isVisible = true;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => (isVisible = entry.isIntersecting));
    },
    { threshold: 0.05 }
  );
  io.observe(stage);

  function resize() {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener("resize", resize);
  new ResizeObserver(resize).observe(stage);

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

/* =================================================================
   8. BEFORE / AFTER COMPARE SLIDER
   ================================================================= */
function initCompareSlider() {
  const frame = document.querySelector(".transformation__frame");
  const clip = document.getElementById("compareClip");
  const handle = document.getElementById("compareHandle");
  const range = document.getElementById("compareRange");
  if (!frame || !clip || !handle || !range) return;

  function syncImageWidth() {
    clip.style.setProperty("--clip-w", frame.offsetWidth + "px");
  }

  function setPercent(pct) {
    const clamped = Math.max(0, Math.min(100, pct));
    clip.style.width = clamped + "%";
    handle.style.left = clamped + "%";
    range.value = clamped;
  }

  syncImageWidth();
  setPercent(50);
  window.addEventListener("resize", syncImageWidth);

  range.addEventListener("input", (e) => setPercent(parseFloat(e.target.value)));

  let dragging = false;
  const startDrag = () => (dragging = true);
  const endDrag = () => (dragging = false);
  const onDrag = (clientX) => {
    if (!dragging) return;
    const rect = frame.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPercent(pct);
  };

  handle.addEventListener("pointerdown", (e) => {
    startDrag();
    handle.setPointerCapture(e.pointerId);
  });
  handle.addEventListener("pointermove", (e) => onDrag(e.clientX));
  handle.addEventListener("pointerup", endDrag);
  handle.addEventListener("pointercancel", endDrag);

  frame.addEventListener("pointerdown", (e) => {
    startDrag();
    onDrag(e.clientX);
  });
  window.addEventListener("pointermove", (e) => onDrag(e.clientX));
  window.addEventListener("pointerup", endDrag);
}

/* =================================================================
   9. HORIZONTAL SCROLL GALLERY
   ================================================================= */
function initHorizontalGallery() {
  const wrap = document.getElementById("galleryTrackWrap");
  const track = document.getElementById("galleryTrack");
  if (!wrap || !track) return;

  function build() {
    ScrollTrigger.getAll().forEach((st) => {
      if (st.vars.id === "galleryScroll") st.kill();
    });

    const distance = track.scrollWidth - wrap.clientWidth;
    if (distance <= 0) return;

    gsap.to(track, {
      x: -distance,
      ease: "none",
      scrollTrigger: {
        id: "galleryScroll",
        trigger: wrap,
        start: "top top+=120",
        end: () => "+=" + distance,
        scrub: 0.6,
        pin: true,
        invalidateOnRefresh: true,
      },
    });
  }

  build();
  window.addEventListener("resize", () => {
    gsap.set(track, { x: 0 });
    ScrollTrigger.refresh();
  });
}

/* =================================================================
   10. FAQ ACCORDION
   ================================================================= */
function initFaqAccordion() {
  const items = gsap.utils.toArray(".faq-item");

  function toggle(item) {
    const answer = item.querySelector(".faq-item__answer");
    const question = item.querySelector(".faq-item__question");
    const isOpen = item.classList.contains("is-open");

    if (isOpen) {
      gsap.to(answer, { height: 0, duration: 0.45, ease: "power2.inOut" });
      item.classList.remove("is-open");
      question.setAttribute("aria-expanded", "false");
      return;
    }

    items.forEach((other) => {
      if (other !== item && other.classList.contains("is-open")) toggle(other);
    });

    gsap.set(answer, { height: "auto" });
    const targetHeight = answer.offsetHeight;
    gsap.fromTo(
      answer,
      { height: 0 },
      {
        height: targetHeight,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => gsap.set(answer, { height: "auto" }),
      }
    );
    item.classList.add("is-open");
    question.setAttribute("aria-expanded", "true");
  }

  items.forEach((item) => {
    const question = item.querySelector(".faq-item__question");
    question.addEventListener("click", () => toggle(item));
  });
}

/* =================================================================
   11. PRODUCT PURCHASE UI (gallery / color / size / quantity)
   ================================================================= */
const purchaseState = {
  color: "Ten",
  size: "S",
  qty: 1,
  image: PRODUCT_DEFAULT_IMAGE,
};

function initPurchaseOptions() {
  const mainImage = document.getElementById("purchaseMainImage");
  const thumbs = document.querySelectorAll(".purchase__thumb");
  const colorButtons = document.querySelectorAll(".color-swatch");
  const colorLabel = document.getElementById("selectedColorLabel");
  const sizeButtons = document.querySelectorAll(".size-btn");
  const qtyValue = document.getElementById("qtyValue");
  const qtyMinus = document.getElementById("qtyMinus");
  const qtyPlus = document.getElementById("qtyPlus");

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      thumbs.forEach((t) => t.classList.remove("is-active"));
      thumb.classList.add("is-active");
      const src = thumb.dataset.image;
      purchaseState.image = src;
      gsap.fromTo(
        mainImage,
        { opacity: 0.4, scale: 1.02 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          onStart: () => (mainImage.src = src),
        }
      );
    });
  });

  colorButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      colorButtons.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-checked", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-checked", "true");
      purchaseState.color = btn.dataset.color;
      colorLabel.textContent = btn.dataset.color;
    });
  });

  sizeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      sizeButtons.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-checked", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-checked", "true");
      purchaseState.size = btn.dataset.size;
    });
  });

  function setQty(next) {
    purchaseState.qty = Math.max(1, Math.min(10, next));
    qtyValue.textContent = purchaseState.qty;
  }
  qtyMinus.addEventListener("click", () => setQty(purchaseState.qty - 1));
  qtyPlus.addEventListener("click", () => setQty(purchaseState.qty + 1));
}

/* =================================================================
   12. CART SYSTEM (localStorage-backed)
   ================================================================= */
function readCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function writeCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (err) {
    /* storage unavailable — cart stays in-memory for this session */
  }
}

function cartTotalCount(cart) {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function cartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.qty * item.price, 0);
}

function renderCart() {
  const cart = readCart();
  const list = document.getElementById("cartItemsList");
  const emptyState = document.getElementById("cartEmptyState");
  const footer = document.getElementById("cartDrawerFooter");
  const subtotalEl = document.getElementById("cartSubtotal");
  const drawerCount = document.getElementById("cartDrawerCount");
  const headerCount = document.getElementById("cartCount");

  list.innerHTML = "";

  if (!cart.length) {
    emptyState.style.display = "flex";
    footer.style.display = "none";
  } else {
    emptyState.style.display = "none";
    footer.style.display = "block";

    cart.forEach((item) => {
      const li = document.createElement("li");
      li.className = "cart-item";
      li.dataset.id = item.id;
      li.innerHTML = `
        <div class="cart-item__image"><img src="${item.image}" alt="${item.name}" loading="lazy"></div>
        <div class="cart-item__details">
          <p class="cart-item__name">${item.name}</p>
          <p class="cart-item__variant">Renk: ${item.color} · Beden: ${item.size}</p>
          <div class="cart-item__row">
            <div class="cart-item__qty">
              <button type="button" data-action="decrease" aria-label="Azalt">−</button>
              <span>${item.qty}</span>
              <button type="button" data-action="increase" aria-label="Artır">+</button>
            </div>
            <span class="cart-item__price">${formatTRY(item.qty * item.price)}</span>
          </div>
          <button type="button" class="cart-item__remove" data-action="remove">Kaldır</button>
        </div>
      `;
      list.appendChild(li);
    });
  }

  subtotalEl.textContent = formatTRY(cartSubtotal(cart));
  drawerCount.textContent = `(${cartTotalCount(cart)})`;
  headerCount.textContent = cartTotalCount(cart);
}

function addToCart() {
  const cart = readCart();
  const id = `${PRODUCT_NAME}-${purchaseState.color}-${purchaseState.size}`;
  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.qty += purchaseState.qty;
  } else {
    cart.push({
      id,
      name: PRODUCT_NAME,
      color: purchaseState.color,
      size: purchaseState.size,
      qty: purchaseState.qty,
      price: PRODUCT_PRICE,
      image: purchaseState.image,
    });
  }

  writeCart(cart);
  renderCart();
  openCartDrawer();

  const btn = document.getElementById("addToCartBtn");
  gsap.fromTo(
    btn,
    { scale: 0.97 },
    { scale: 1, duration: 0.35, ease: "back.out(3)" }
  );
}

function updateCartItem(id, action) {
  let cart = readCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  if (action === "increase") item.qty = Math.min(10, item.qty + 1);
  if (action === "decrease") item.qty = Math.max(1, item.qty - 1);
  if (action === "remove") cart = cart.filter((i) => i.id !== id);

  writeCart(cart);
  renderCart();
}

function openCartDrawer() {
  document.getElementById("cartDrawer").classList.add("is-open");
  document.getElementById("cartOverlay").classList.add("is-active");
  document.getElementById("cartDrawer").setAttribute("aria-hidden", "false");
  document.body.classList.add("is-modal-open");
}

function closeCartDrawer() {
  document.getElementById("cartDrawer").classList.remove("is-open");
  document.getElementById("cartOverlay").classList.remove("is-active");
  document.getElementById("cartDrawer").setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-modal-open");
}

function initCart() {
  renderCart();

  document.getElementById("cartToggle").addEventListener("click", openCartDrawer);
  document.getElementById("cartCloseBtn").addEventListener("click", closeCartDrawer);
  document.getElementById("cartOverlay").addEventListener("click", closeCartDrawer);
  document.getElementById("cartEmptyCta")?.addEventListener("click", closeCartDrawer);
  document.getElementById("addToCartBtn").addEventListener("click", addToCart);

  document.getElementById("cartItemsList").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const li = btn.closest(".cart-item");
    updateCartItem(li.dataset.id, btn.dataset.action);
  });

  document.getElementById("cartCheckoutBtn").addEventListener("click", () => {
    // Checkout hand-off point for the future Shopify integration.
    alert("Ödeme adımı, Shopify entegrasyonu tamamlandığında aktif olacaktır.");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCartDrawer();
  });
}

/* =================================================================
   13. SIZE GUIDE MODAL
   ================================================================= */
function initSizeGuideModal() {
  const openBtn = document.getElementById("sizeGuideBtn");
  const closeBtn = document.getElementById("sizeGuideCloseBtn");
  const overlay = document.getElementById("sizeGuideOverlay");
  const modal = document.getElementById("sizeGuideModal");
  if (!openBtn || !modal) return;

  function open() {
    modal.classList.add("is-open");
    overlay.classList.add("is-active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-modal-open");
  }
  function close() {
    modal.classList.remove("is-open");
    overlay.classList.remove("is-active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-modal-open");
  }

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* =================================================================
   14. SCROLL-TO-TOP HERO CTA + SMOOTH ANCHOR SCROLL
   ================================================================= */
function initSmoothAnchors() {
  // Manual scroll tween (no ScrollToPlugin dependency): drives window.scrollTo
  // from a tweened proxy object so the motion matches the rest of the site's easing.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();

      const headerOffset = 70;
      const targetY =
        target.getBoundingClientRect().top + window.scrollY - headerOffset;
      const proxy = { y: window.scrollY };

      gsap.to(proxy, {
        y: targetY,
        duration: 1.1,
        ease: "power3.inOut",
        onUpdate: () => window.scrollTo(0, proxy.y),
      });
    });
  });
}

/* =================================================================
   15. NEWSLETTER FORM
   ================================================================= */
function initNewsletterForm() {
  const form = document.getElementById("newsletterForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    if (!input.value) return;
    input.value = "";
    input.placeholder = "Teşekkürler, kaydınız alındı.";
  });
}

/* =================================================================
   16. INIT
   ================================================================= */
function init() {
  initLoader();
  initCustomCursor();
  initSpineProgress();
  initHeaderAndNav();
  initScrollReveals();
  initProductViewer();
  initCompareSlider();
  initHorizontalGallery();
  initFaqAccordion();
  initPurchaseOptions();
  initCart();
  initSizeGuideModal();
  initSmoothAnchors();
  initNewsletterForm();

  window.addEventListener("load", () => ScrollTrigger.refresh());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

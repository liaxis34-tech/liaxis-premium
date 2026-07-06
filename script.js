/* ==========================================================================
   LIAXIS — script.js
   Mouse parallax depth · GSAP entrance · ScrollTrigger storytelling
   Product gallery · Video showcase · Sales UI interactions
   ========================================================================== */

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  gsap.registerPlugin(ScrollTrigger);

  /* ------------------------------------------------------------------------
     PRELOADER
  ------------------------------------------------------------------------ */
  const preloader = document.getElementById('preloader');
  const preloaderFill = document.getElementById('preloaderFill');
  const heroVideoWrap = document.getElementById('heroVideoWrap');
  const heroVideo = document.getElementById('heroVideo');

  document.body.style.overflow = 'hidden';

  function hidePreloaderAndRun() {
    if (preloader.classList.contains('is-hidden')) return;
    preloader.classList.add('is-hidden');
    document.body.style.overflow = '';
    heroVideoWrap.classList.add('is-visible');
    if (heroVideo.play) { heroVideo.play().catch(() => {}); }
    runIntroTimeline();
  }

  window.addEventListener('load', () => {
    gsap.to(preloaderFill, {
      width: '100%',
      duration: 1.1,
      ease: 'power2.inOut',
      onComplete: hidePreloaderAndRun
    });
  });
  // Safety net in case 'load' is slow/blocked
  setTimeout(hidePreloaderAndRun, 3200);

  /* ------------------------------------------------------------------------
     CUSTOM CURSOR
  ------------------------------------------------------------------------ */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let ringX = mouseX, ringY = mouseY;

  const hasHover = window.matchMedia('(hover:hover)').matches;

  if (hasHover) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      gsap.set(cursorDot, { x: mouseX, y: mouseY });
    });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      gsap.set(cursorRing, { x: ringX, y: ringY });
      requestAnimationFrame(animateRing);
    };
    animateRing();

    document.querySelectorAll('a, button, .pill, .pill-color, .thumb').forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('is-active'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('is-active'));
    });
  }

  /* ------------------------------------------------------------------------
     SCROLL PROGRESS BAR
  ------------------------------------------------------------------------ */
  const scrollProgress = document.getElementById('scrollProgress');
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => { scrollProgress.style.width = (self.progress * 100) + '%'; }
  });

  /* ------------------------------------------------------------------------
     NAVBAR GLASS STATE + MOBILE MENU
  ------------------------------------------------------------------------ */
  const navbar = document.getElementById('navbar');
  ScrollTrigger.create({
    start: 80,
    end: 99999,
    onUpdate: (self) => { navbar.classList.toggle('is-glass', self.scroll() > 80); }
  });

  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  menuToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      menuToggle.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  /* ------------------------------------------------------------------------
     HERO — MOUSE PARALLAX DEPTH FIELD (glassmorphic floating panels)
  ------------------------------------------------------------------------ */
  const depthField = document.getElementById('depthField');
  const glassPanels = gsap.utils.toArray('.glass-panel');
  const heroContent = document.getElementById('heroContent');

  if (hasHover && !reduceMotion) {
    document.getElementById('hero').addEventListener('mousemove', (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      glassPanels.forEach((panel) => {
        const depth = parseFloat(panel.dataset.depth) * 1000;
        gsap.to(panel, {
          x: px * depth,
          y: py * depth,
          rotateX: py * -6,
          rotateY: px * 6,
          duration: 1.1,
          ease: 'power2.out'
        });
      });

      gsap.to(heroContent, {
        x: px * 14,
        y: py * 10,
        duration: 1.1,
        ease: 'power2.out'
      });

      gsap.to('.hero-video', {
        x: px * -10,
        y: py * -8,
        scale: 1.04,
        duration: 1.2,
        ease: 'power2.out'
      });
    });
  }

  // Gentle idle float for glass panels even without mouse movement
  if (!reduceMotion) {
    glassPanels.forEach((panel, i) => {
      gsap.to(panel, {
        y: '+=18',
        duration: 3.2 + i * 0.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
    });
  }

  /* ------------------------------------------------------------------------
     HERO INTRO TIMELINE — logo/nav, headline, sub, CTA, video fade
  ------------------------------------------------------------------------ */
  function runIntroTimeline() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.nav-logo', { opacity: 0, y: -16, duration: 0.8 })
      .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.9 }, '-=0.4')
      .to('.hero-title .line span', { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, '-=0.5')
      .to('.hero-sub', { opacity: 1, y: 0, duration: 0.9 }, '-=0.5')
      .to('.hero-actions', { opacity: 1, y: 0, duration: 0.9 }, '-=0.6')
      .fromTo('.glass-panel', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1.2, stagger: 0.1 }, '-=0.9')
      .to('.hero-scroll-cue', { opacity: 1, duration: 0.8 }, '-=0.4');
  }

  /* ------------------------------------------------------------------------
     GENERIC REVEAL-UP (ScrollTrigger batch) — with natural reverse on scroll up
  ------------------------------------------------------------------------ */
  ScrollTrigger.batch('.reveal-up', {
    start: 'top 88%',
    onEnter: (batch) => {
      gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.12 });
    },
    onLeaveBack: (batch) => {
      gsap.to(batch, { opacity: 0, y: 36, duration: 0.6, ease: 'power2.in', stagger: 0.06 });
    }
  });

  /* ------------------------------------------------------------------------
     SCROLL STORYTELLING — image parallax + text drift, reverses naturally
  ------------------------------------------------------------------------ */
  gsap.utils.toArray('.story-media').forEach((media) => {
    const speed = parseFloat(media.dataset.speed) || 0.15;
    gsap.to(media, {
      y: () => -80 * speed * 4,
      ease: 'none',
      scrollTrigger: {
        trigger: media,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  gsap.utils.toArray('.story-row').forEach((row) => {
    const text = row.querySelector('.story-text');
    gsap.fromTo(text, { x: row.classList.contains('story-row-reverse') ? -40 : 40 }, {
      x: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: row,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  /* ------------------------------------------------------------------------
     WHY LIAXIS — card entrance with stagger + depth
  ------------------------------------------------------------------------ */
  gsap.utils.toArray('.why-card').forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, y: 50, rotateX: 6 }, {
      opacity: 1, y: 0, rotateX: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay: i * 0.05,
      scrollTrigger: { trigger: card, start: 'top 90%' }
    });
  });

  /* ------------------------------------------------------------------------
     PRODUCT GALLERY — thumbnail swap
  ------------------------------------------------------------------------ */
  const productMainImage = document.getElementById('productMainImage');
  document.querySelectorAll('.thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.thumb').forEach((t) => t.classList.remove('is-active'));
      thumb.classList.add('is-active');
      gsap.to(productMainImage, {
        opacity: 0,
        duration: 0.22,
        onComplete: () => {
          productMainImage.src = thumb.dataset.img;
          gsap.to(productMainImage, { opacity: 1, duration: 0.35 });
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     PRODUCT OPTIONS — size / color pills
  ------------------------------------------------------------------------ */
  document.querySelectorAll('.option-pills .pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      pill.parentElement.querySelectorAll('.pill').forEach((p) => p.classList.remove('is-active'));
      pill.classList.add('is-active');
    });
  });
  document.querySelectorAll('.pill-color').forEach((pill) => {
    pill.addEventListener('click', () => {
      pill.parentElement.querySelectorAll('.pill-color').forEach((p) => p.classList.remove('is-active'));
      pill.classList.add('is-active');
    });
  });

  /* ------------------------------------------------------------------------
     GALLERY ITEMS — reveal with depth tilt
  ------------------------------------------------------------------------ */
  gsap.utils.toArray('.gallery-item').forEach((item, i) => {
    gsap.fromTo(item, { opacity: 0, y: 60 }, {
      opacity: 1, y: 0,
      duration: 1,
      ease: 'power3.out',
      delay: (i % 4) * 0.05,
      scrollTrigger: { trigger: item, start: 'top 92%' }
    });
  });

  /* ------------------------------------------------------------------------
     VIDEO SHOWCASE — play/pause control
  ------------------------------------------------------------------------ */
  const showcaseVideo = document.getElementById('showcaseVideo');
  const videoPlayBtn = document.getElementById('videoPlayBtn');

  videoPlayBtn.addEventListener('click', () => {
    if (showcaseVideo.paused) {
      showcaseVideo.play();
      videoPlayBtn.classList.add('is-playing');
    } else {
      showcaseVideo.pause();
      videoPlayBtn.classList.remove('is-playing');
    }
  });
  showcaseVideo.addEventListener('click', () => videoPlayBtn.click());
  showcaseVideo.addEventListener('pause', () => videoPlayBtn.classList.remove('is-playing'));
  showcaseVideo.addEventListener('play', () => videoPlayBtn.classList.add('is-playing'));

  // Pause showcase video automatically when scrolled out of view
  ScrollTrigger.create({
    trigger: '.video-showcase',
    start: 'top bottom',
    end: 'bottom top',
    onLeave: () => { if (!showcaseVideo.paused) showcaseVideo.pause(); },
    onLeaveBack: () => { if (!showcaseVideo.paused) showcaseVideo.pause(); }
  });

  /* ------------------------------------------------------------------------
     FAQ ACCORDION
  ------------------------------------------------------------------------ */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item.is-open').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove('is-open');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ------------------------------------------------------------------------
     ADD TO CART + TOAST (sales-focused feedback loop)
  ------------------------------------------------------------------------ */
  const cartCount = document.querySelector('.cart-count');
  const toast = document.getElementById('cartToast');
  const toastText = document.getElementById('toastText');
  let cartTotal = 0;

  document.querySelectorAll('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      cartTotal += 1;
      cartCount.textContent = cartTotal;
      gsap.fromTo(cartCount, { scale: 1.6 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' });
      gsap.fromTo(btn, { scale: 0.97 }, { scale: 1, duration: 0.3, ease: 'back.out(3)' });
      toastText.textContent = `${btn.dataset.name} sepete eklendi.`;
      showToast();
    });
  });

  let toastTimeout;
  function showToast() {
    clearTimeout(toastTimeout);
    toast.classList.add('is-visible');
    toastTimeout = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }

  /* ------------------------------------------------------------------------
     NEWSLETTER FORM
  ------------------------------------------------------------------------ */
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    toastText.textContent = 'Abone olduğunuz için teşekkürler.';
    showToast();
    input.value = '';
  });

  /* ------------------------------------------------------------------------
     TESTIMONIAL TRACK — drag to scroll (desktop convenience)
  ------------------------------------------------------------------------ */
  const track = document.getElementById('testimonialTrack');
  let isDown = false, startX, scrollLeft;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.style.cursor = 'grabbing';
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  ['mouseleave', 'mouseup'].forEach((evt) => {
    track.addEventListener(evt, () => { isDown = false; track.style.cursor = 'grab'; });
  });
  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.4;
    track.scrollLeft = scrollLeft - walk;
  });

  /* ------------------------------------------------------------------------
     REFRESH SCROLLTRIGGER ON RESIZE (debounced)
  ------------------------------------------------------------------------ */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
  });

})();
const VARIANTS = {
  Bej: {
    S: "46749171187766",
    M: "46749171220534",
    L: "46749171253302",
    XL: "46749171286070"
  },
  Siyah: {
    S: "46749173186614",
    M: "46749173219382",
    L: "46749173252150",
    XL: "46749173284918"
  }
};

let selectedSize = "M";
let selectedColor = "Bej";

document.querySelectorAll('.pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pill').forEach(x => x.classList.remove('is-active'));
    btn.classList.add('is-active');
    selectedSize = btn.textContent.trim();
  });
});

document.querySelectorAll('.pill-color').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pill-color').forEach(x => x.classList.remove('is-active'));
    btn.classList.add('is-active');
    selectedColor = btn.getAttribute('aria-label');
  });
});

document.querySelector('.btn-add-main').addEventListener('click', (e) => {
  e.preventDefault();

  const variantId =
    VARIANTS[selectedColor] &&
    VARIANTS[selectedColor][selectedSize];

  if (!variantId) {
    alert('Lütfen beden ve renk seçin');
    return;
  }

  window.location.href =
    `https://theliaxis.com/cart/${variantId}:1`;
});

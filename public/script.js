/*
 * Jonathan Oketch - Portfolio / CV website
 * Main script
 *
 * Sections:
 *   1. Hero slideshow, contact form, scroll reveal, contact modal, mobile menu
 *   2. CV download (format-select modal + PDF/DOCX downloads)
 *   3. Reveal animation for the CV download section
 *
 * Note: page-switching/routing was removed here — Astro now handles
 * navigation via real routes (src/pages/*.astro), so there is no more
 * single-page `.page` swapping, pushState, or popstate handling.
 */

/* =====================================================
   1. Page interactions
   ===================================================== */

/* ---------------------------------------------------------
   Hero slideshow
--------------------------------------------------------- */
(function () {
  const slides = document.querySelectorAll(".hero-slide");
  if (slides.length < 2) return;

  let current = 0;
  setInterval(function () {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 6500);
})();

/* ---------------------------------------------------------
   Contact / message form (mailto submission)
--------------------------------------------------------- */
const messageForm = document.getElementById("messageForm");

if (messageForm) {
  messageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const subject = encodeURIComponent("Website enquiry from " + firstName + " " + lastName);
    const body = encodeURIComponent(
      "First Name: " + firstName + "\n" +
      "Last Name: " + lastName + "\n" +
      "Email Address: " + email + "\n\n" +
      "Message:\n" + message
    );

    const contactEmail = (window.SITE_SETTINGS && window.SITE_SETTINGS.email) || "jonahkesh@gmail.com";
    window.location.href = "mailto:" + contactEmail + "?subject=" + subject + "&body=" + body;
  });
}

/* ---------------------------------------------------------
   Page setup: scroll reveal, contact modal, mobile menu
--------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const navMenu = document.getElementById("navLinks");
  const menuToggle = document.getElementById("menuToggle");
  const getInTouch = document.getElementById("getInTouch");
  const contactModalClose = document.getElementById("contactModalClose");
  const contactTriggers = document.querySelectorAll("[data-open-contact]");

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- Scroll-triggered reveal animations --- */
  (function setupScrollReveal() {
    var revealSelectors = [
      ".section-heading",
      ".intro-copy",
      ".quote-card",
      ".journey-intro",
      ".journey-heading",
      ".core-strengths-card",
      ".experience-item",
      ".education-row",
      ".profile-card",
      ".about-copy",
      ".cta-box",
      ".contact-card"
    ];
    var staggerSelectors = [".feature-grid", ".services-grid", ".values"];

    document.querySelectorAll(revealSelectors.join(",")).forEach(function (el) {
      el.classList.add("reveal");
    });
    document.querySelectorAll(staggerSelectors.join(",")).forEach(function (el) {
      el.classList.add("reveal-stagger");
    });

    var targets = document.querySelectorAll(".reveal,.reveal-stagger");

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (t) {
        t.classList.add("reveal-visible");
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: "0px 0px -8% 0px" });

    targets.forEach(function (t) {
      io.observe(t);
    });
  })();

  /* --- "Get in touch" contact modal --- */
  function openContactModal() {
    if (!getInTouch) return;
    getInTouch.classList.add("active");
    document.body.classList.add("modal-open");
  }

  function closeContactModal() {
    if (!getInTouch) return;
    getInTouch.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  contactTriggers.forEach(b => b.addEventListener("click", function (e) {
    e.preventDefault();
    openContactModal();
  }));

  if (contactModalClose) contactModalClose.addEventListener("click", closeContactModal);

  if (getInTouch) {
    getInTouch.addEventListener("click", function (e) {
      if (e.target === getInTouch) closeContactModal();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && getInTouch && getInTouch.classList.contains("active")) {
      closeContactModal();
    }
  });

  /* --- Mobile menu toggle --- */
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("open");
      menuToggle.textContent = navMenu.classList.contains("open") ? "×" : "☰";
    });
  }
});

/* =====================================================
   2. CV download modal
   ===================================================== */

(function () {
  const CV_FILES = {
    pdf: "/Jonathan_Okech_Resume.pdf",
    docx: "/Jonathan_Okech_Resume.docx"
  };

  function downloadCV(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function initCVDownload() {
    const openBtn = document.querySelector('[data-cv-download], .cv-download-btn');
    const modal = document.querySelector('.cv-format-modal');
    if (!openBtn || !modal) return;

    const closeBtn = modal.querySelector('.cv-format-close');
    const pdfBtn = modal.querySelector('[data-cv-format="pdf"]');
    const docxBtn = modal.querySelector('[data-cv-format="docx"]');

    const openModal = () => {
      modal.classList.add('active');
      document.body.classList.add('modal-open');
    };
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    };

    openBtn.addEventListener('click', openModal);
    closeBtn && closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });

    pdfBtn && pdfBtn.addEventListener('click', () => {
      downloadCV(CV_FILES.pdf, 'Jonathan_Okech_Resume.pdf');
      closeModal();
    });

    docxBtn && docxBtn.addEventListener('click', () => {
      downloadCV(CV_FILES.docx, 'Jonathan_Okech_Resume.docx');
      closeModal();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCVDownload);
  } else {
    initCVDownload();
  }
})();

/* =====================================================
   3. CV download section - scroll reveal
   ===================================================== */

(function () {
  const targets = document.querySelectorAll('.cv-download-section, .cv-download-card');
  if (!targets.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach(el => el.classList.add('cv-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('cv-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
})();

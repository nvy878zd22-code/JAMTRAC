/**
 * JAMTRAC Inc. - Official Website Scripts
 * Business Motto: "We Are Doctors in Services"
 * Domain: jamtrac.properties.us
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link, .main-nav .btn');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      mainNav.classList.toggle('is-open');
    });

    // Close mobile nav when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('is-open')) {
          mainNav.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (event) => {
      if (
        mainNav.classList.contains('is-open') &&
        !mainNav.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. Header Scroll Effect
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 3. Active Navigation State on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinksList = document.querySelectorAll('.nav-link');

  if (sections.length > 0 && navLinksList.length > 0) {
    const highlightNav = () => {
      const scrollPosition = window.scrollY + 120;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinksList.forEach(link => {
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();
  }

  // 4. Request Service Form Handling
  const requestForm = document.getElementById('service-request-form');
  const formStatus = document.getElementById('form-status');

  if (requestForm && formStatus) {
    requestForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('client-name');
      const contactInput = document.getElementById('client-contact');
      const serviceSelect = document.getElementById('service-type');
      const detailsInput = document.getElementById('project-details');

      if (!nameInput.value.trim() || !contactInput.value.trim() || !serviceSelect.value) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill out all required fields before submitting.';
        formStatus.setAttribute('role', 'alert');
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }

      // Submit feedback (neutral, professional)
      formStatus.className = 'form-status success';
      formStatus.textContent = 'Thank you for your service request. Your project details have been received, and our team will review your inquiry.';
      formStatus.setAttribute('role', 'status');

      requestForm.reset();
      formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
});

// ============ GRAB ELEMENTS (header exists on every page) ============
// ============ GRAB ELEMENTS (header exists on every page) ============
const header = document.getElementById('header');
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');

// ============ MOBILE MENU ============
// Clicking the three bars switches the "open" class on and off
menuToggle.addEventListener('click', function () {
  nav.classList.toggle('open');          // shows or hides the menu panel
  menuToggle.classList.toggle('open');   // turns the bars into an X
});

// Close the menu when one of its links is clicked
nav.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    nav.classList.remove('open');
    menuToggle.classList.remove('open');
  });
});

// ============ HEADER SHADOW ON SCROLL ============
window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============ FOOTER YEAR ============
document.getElementById('year').textContent = new Date().getFullYear();

// ============ GALLERY LIGHTBOX (gallery.html only) ============
const galleryItems = document.querySelectorAll('.gallery figure');

if (galleryItems.length > 0) {
  // Build the viewer with JavaScript so the HTML doesn't need changing
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML =
    '<button class="lightbox-close" aria-label="Close">&times;</button>' +
    '<button class="lightbox-prev" aria-label="Previous photo">&#10094;</button>' +
    '<img src="" alt="">' +
    '<button class="lightbox-next" aria-label="Next photo">&#10095;</button>';
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  let current = 0; // position of the photo being shown

  function showPhoto(index) {
    // % wraps around: after the last photo comes the first, and vice versa
    current = (index + galleryItems.length) % galleryItems.length;
    const img = galleryItems[current].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden'; // stop page scrolling behind it
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(function (item, i) {
    item.addEventListener('click', function () { showPhoto(i); });
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', function () { showPhoto(current - 1); });
  lightbox.querySelector('.lightbox-next').addEventListener('click', function () { showPhoto(current + 1); });

  // Clicking the dark area around the photo closes it
  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) closeLightbox();
  });

  // Keyboard: Escape closes, arrows move between photos
  document.addEventListener('keydown', function (event) {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showPhoto(current - 1);
    if (event.key === 'ArrowRight') showPhoto(current + 1);
  });
}

// ============ BOOKING FORM (booking.html only) ============
// The shop's WhatsApp number in international format: no +, no spaces, no leading 0.
// 067 056 7332 becomes 27670567332 (27 is South Africa's country code).
// CHANGE THIS LINE if the shop uses a different WhatsApp number.
const SHOP_WHATSAPP = '27670567332';

// On other pages getElementById returns null, so we check "if (form)" first.
const form = document.getElementById('bookingForm');

if (form) {
  const successMessage = document.getElementById('formSuccess');
  const dateInput = document.getElementById('date');

  // Earliest date = today. Latest date = 60 days from now.
  // toISOString() gives "2026-11-22T..."; slice(0, 10) keeps "2026-11-22".
  const today = new Date();
  const latest = new Date();
  latest.setDate(today.getDate() + 60);
  dateInput.min = today.toISOString().slice(0, 10);
  dateInput.max = latest.toISOString().slice(0, 10);

  // Shows or clears the error message under one field
  function setError(fieldId, message) {
    document.getElementById(fieldId + 'Error').textContent = message;
    document.getElementById(fieldId).closest('.field').classList.toggle('invalid', message !== '');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // stop the page reloading

    // .trim() removes spaces at the start and end.
    // .replace(/\s+/g, ' ') turns any run of spaces or line breaks into one space.
    const name = document.getElementById('name').value.trim().replace(/\s+/g, ' ');
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const date = dateInput.value;

    let valid = true;

    // Name: 2 to 60 characters
    if (name.length < 2) { setError('name', 'Please enter your name.'); valid = false; }
    else { setError('name', ''); }

    // Phone: only digits, spaces or +, between 9 and 15 characters
    if (!/^[0-9 +]{9,15}$/.test(phone)) { setError('phone', 'Enter a valid phone number.'); valid = false; }
    else { setError('phone', ''); }

    if (service === '') { setError('service', 'Please choose a service.'); valid = false; }
    else { setError('service', ''); }

    // Date: must be filled in and inside the allowed range
    if (date === '' || date < dateInput.min || date > dateInput.max) {
      setError('date', 'Please pick a date within the next 60 days.');
      valid = false;
    } else { setError('date', ''); }

    // Stop here if anything failed
    if (!valid) {
      successMessage.textContent = '';
      return;
    }

    // Turn "2026-11-25" into "Wednesday, 25 November 2026".
    // Adding "T00:00:00" makes the browser read it as a local date, not UTC.
    const niceDate = new Date(date + 'T00:00:00').toLocaleDateString('en-ZA', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

    // The message the customer will send. \n is a line break.
    const message =
      'Hello Softouch Barbershop, I would like to book.\n\n' +
      'Name: ' + name + '\n' +
      'Phone: ' + phone + '\n' +
      'Service: ' + service + '\n' +
      'Preferred date: ' + niceDate + '\n\n' +
      'Please confirm availability. Thank you.';

    // encodeURIComponent makes the text safe inside a web address
    // (spaces become %20, line breaks become %0A).
    const url = 'https://wa.me/' + SHOP_WHATSAPP + '?text=' + encodeURIComponent(message);

    // Open WhatsApp in a new tab. 'noopener' stops that tab from controlling this one.
    window.open(url, '_blank', 'noopener');

    // textContent (not innerHTML) writes plain text, so a name like "<script>" can never run as code
    successMessage.textContent =
      'WhatsApp is opening. Press Send there to submit your request. Your booking is confirmed only when we reply.';
    form.reset();
  });
}

// ============ SCROLL ANIMATIONS & PAGE TRANSITIONS ============

// The ".js .reveal" CSS rules only hide elements when this class exists,
// so nothing stays hidden if JavaScript fails.
document.documentElement.classList.add('js');

// Scroll reveal: IntersectionObserver runs a function when elements enter the screen
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');    // CSS animates it in
        revealObserver.unobserve(entry.target);   // animate once only
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach(function (item) { revealObserver.observe(item); });
} else {
  revealItems.forEach(function (item) { item.classList.add('visible'); });
}

// Page fade-out when clicking a link to another page
document.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function (event) {
    const href = link.getAttribute('href');

    // Skip empty links, #sections, tel:, mailto:, external sites and new-tab links
    if (!href || href.startsWith('#') || href.startsWith('tel:') ||
        href.startsWith('mailto:') || href.startsWith('http') ||
        link.target === '_blank') {
      return;
    }

    event.preventDefault();
    document.body.classList.add('page-leave');
    setTimeout(function () { window.location.href = href; }, 300); // matches the CSS fade time
  });
});

// The Back button can show a page still faded out, so reset it
window.addEventListener('pageshow', function () {
  document.body.classList.remove('page-leave');
});

// ============ HEADING DRIFTS LEFT AS YOU SCROLL (index.html) ============
const driftHeadings = document.querySelectorAll('.drift-left');
const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (driftHeadings.length > 0 && !noMotion) {
  function updateDrift() {
    const distance = window.innerWidth < 800 ? 60 : 200; // smaller travel on phones

    driftHeadings.forEach(function (heading) {
      const top = heading.getBoundingClientRect().top;  // distance from the top of the screen
      const progress = 1 - top / window.innerHeight;    // 0 = entering, 1 = leaving
      const shift = (0.5 - progress) * distance;        // centered at the halfway point
      heading.style.transform = 'translateX(' + shift + 'px)';
    });
  }

  window.addEventListener('scroll', updateDrift, { passive: true });
  window.addEventListener('resize', updateDrift);
  updateDrift();
}

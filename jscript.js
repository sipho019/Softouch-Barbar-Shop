// ============ GRAB ELEMENTS ============
// These three exist in the header of EVERY page.
const header = document.getElementById('header');
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');

// ============ MOBILE MENU ============
// Clicking the hamburger adds/removes the "open" class, and the CSS
// rule .nav.open { display: flex } shows or hides the menu.
menuToggle.addEventListener('click', function () {
  nav.classList.toggle('open');
});

// ============ STICKY HEADER SHADOW ON SCROLL ============
// The header stays at the top because of position: fixed in the CSS.
// Here we only add a shadow once the page is scrolled down a little.
window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============ FOOTER YEAR ============
// Every page has <span id="year">, so this is safe everywhere.
document.getElementById('year').textContent = new Date().getFullYear();

// ============ GALLERY LIGHTBOX (gallery.html only) ============
// querySelectorAll returns a list of every element matching the selector.
// On pages without a gallery the list is empty, so we check its length first.
const galleryItems = document.querySelectorAll('.gallery figure');

if (galleryItems.length > 0) {
  // Build the lightbox with JavaScript so we don't need to touch the HTML.
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML =
    '<button class="lightbox-close" aria-label="Close">&times;</button>' +
    '<button class="lightbox-prev" aria-label="Previous photo">&#10094;</button>' +
    '<img src="" alt="">' +
    '<button class="lightbox-next" aria-label="Next photo">&#10095;</button>';
  document.body.appendChild(lightbox); // add it to the end of the page

  const lightboxImg = lightbox.querySelector('img');
  let current = 0; // index (position) of the photo being shown

  // Shows the photo at a given position in the list.
  function showPhoto(index) {
    // The % (remainder) trick wraps around: after the last photo comes the first,
    // and before the first photo comes the last.
    current = (index + galleryItems.length) % galleryItems.length;
    const img = galleryItems[current].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');            // CSS .lightbox.open makes it visible
    document.body.style.overflow = 'hidden';   // stops the page scrolling behind it
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';         // allow scrolling again
  }

  // forEach runs the function for every photo; "i" is its position in the list.
  galleryItems.forEach(function (item, i) {
    item.addEventListener('click', function () {
      showPhoto(i);
    });
  });

  // Buttons
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', function () { showPhoto(current - 1); });
  lightbox.querySelector('.lightbox-next').addEventListener('click', function () { showPhoto(current + 1); });

  // Clicking the dark area around the photo closes it.
  // event.target is the exact element clicked; we only close if it was the backdrop.
  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard: Escape closes, arrow keys move between photos.
  document.addEventListener('keydown', function (event) {
    if (!lightbox.classList.contains('open')) return; // ignore keys when it's closed
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showPhoto(current - 1);
    if (event.key === 'ArrowRight') showPhoto(current + 1);
  });
}

// ============ BOOKING FORM (booking.html only) ============
// This script is shared by all pages, but the form only exists on booking.html.
// On other pages getElementById returns null, and using null causes an error,
// so we check "if (form)" first.
const form = document.getElementById('bookingForm');

if (form) {
  const successMessage = document.getElementById('formSuccess');
  const dateInput = document.getElementById('date');

  // Stop people choosing a date in the past ("YYYY-MM-DD" format)
  dateInput.min = new Date().toISOString().slice(0, 10);

  // Shows or clears the error message under one field
  function setError(fieldId, message) {
    document.getElementById(fieldId + 'Error').textContent = message;
    document.getElementById(fieldId).closest('.field').classList.toggle('invalid', message !== '');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // stop the page reloading

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const date = dateInput.value;

    let valid = true;

    if (name.length < 2) {
      setError('name', 'Please enter your name.');
      valid = false;
    } else {
      setError('name', '');
    }

    // Regular expression: 9 to 15 characters, only digits, spaces or +
    if (!/^[0-9 +]{9,15}$/.test(phone)) {
      setError('phone', 'Enter a valid phone number.');
      valid = false;
    } else {
      setError('phone', '');
    }

    if (service === '') {
      setError('service', 'Please choose a service.');
      valid = false;
    } else {
      setError('service', '');
    }

    if (date === '') {
      setError('date', 'Please pick a date.');
      valid = false;
    } else {
      setError('date', '');
    }

    // A real booking needs a backend or email service to receive this.
    if (valid) {
      successMessage.textContent = 'Thank you, ' + name + '! We will contact you to confirm your ' + service + '.';
      form.reset();
    } else {
      successMessage.textContent = '';
    }
  });
}
// ============ HEADING DRIFTS LEFT AS YOU SCROLL ============
const driftHeadings = document.querySelectorAll('.drift-left');
const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (driftHeadings.length > 0 && !noMotion) {

  function updateDrift() {
    // Smaller travel distance on phones so the text isn't clipped
    const distance = window.innerWidth < 800 ? 60 : 200;

    driftHeadings.forEach(function (heading) {
      // getBoundingClientRect().top = distance from the top of the screen to the heading
      const top = heading.getBoundingClientRect().top;

      // progress: 0 = heading just entering at the bottom, 1 = leaving at the top.
      // 0.5 means it's halfway up the screen.
      const progress = 1 - top / window.innerHeight;

      // At 0.5 the shift is 0, so the heading sits centered.
      // Below that it's pushed right, above that it moves left.
      const shift = (0.5 - progress) * distance;

      heading.style.transform = 'translateX(' + shift + 'px)';
    });
  }

  // { passive: true } tells the browser this listener won't block scrolling
  window.addEventListener('scroll', updateDrift, { passive: true });
  window.addEventListener('resize', updateDrift);
  updateDrift();   // run once on load to set the starting position
}
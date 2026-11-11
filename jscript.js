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

// ============ HEADER SHADOW ON SCROLL ============
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

// ============ BOOKING FORM (booking.html only) ============
// This one script file is shared by all pages, but the form only exists
// on booking.html. On other pages getElementById returns null, and
// using null would cause an error. So we check "if (form)" first.
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
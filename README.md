# Softouch Barbershop Website

Website for **Softouch Barbershop**, the only barbershop around Mthatha that provides superior haircuts.

Built with plain **HTML, CSS and JavaScript**, with no frameworks.

## About the shop

Softouch Barbershop is on Nelson Mandela Drive in the Mthatha CBD.

- **Services:** sharp fades, high tapers, brush cuts, bleach, tints, hair dye, waves, custom styling and kids' cuts.
- **Free PlayStation:** clients who get a haircut play PlayStation for free, plus 15 extra minutes after the haircut.
- **Community space:** closely tied to [Softech Photography](https://www.softechphotography.com/), sharing a creative footprint in the Mthatha CBD. The shop hosts FIFA tournaments, streetwear collaborations (such as with Black Poplar) and local talent showcases.

## Contact

**Address:** Shop 4, 29 Nelson Mandela Drive, Mthatha (Umtata), South Africa
**Phone / bookings:** 067 056 7332
**Facebook:** [Softouch Barbershop](https://www.facebook.com/p/Softouch-Barbershop-61555367192725/)
**Instagram:** [@softouchbarbershop](https://www.instagram.com/softouchbarbershop/)

## Pages

| Page | File | What it shows |
|---|---|---|
| Home | `index.html` | Hero, services preview, gaming teaser, call to action |
| About | `about.html` | Story, features, community and culture |
| Services | `services.html` | Price board and the free PlayStation offer |
| Gaming | `gaming.html` | How free PlayStation works, FIFA tournaments |
| Gallery | `gallery.html` | Haircut photos with a full-size photo viewer |
| Booking | `booking.html` | Appointment request form with validation |
| Contact | `contact.html` | Address, phone, social links and opening hours |

## Features

- Responsive layout for phones, tablets and desktops
- Sticky header with a mobile hamburger menu
- Blue, white and black theme, set once in CSS variables at the top of `style.css`
- Scroll animations and fade transitions between pages
- Gallery lightbox with arrow-key and Escape support
- Booking form with client-side validation

## Project structure

```
softouch/
  index.html
  about.html
  services.html
  gaming.html
  gallery.html
  booking.html
  contact.html
  style.css      (all styling, shared by every page)
  script.js      (all behaviour, shared by every page)
  images/        (logo and photos)
  README.md
```

## Run it locally

No install or build step is needed. Download or clone the repo and open `index.html` in a browser.

## Purpose of the website

The website exists to:

- **Put Softouch Barbershop online** so people in Mthatha can find it, see the work and know where it is
- **Show the quality of the cuts** through a haircut gallery, so new clients can see what to expect before they visit
- **Make it easy to get in touch**, with a tap-to-call phone number, the address, social media links and a booking page
- **Present Softouch as more than a barbershop**, with free PlayStation gaming for haircut clients and a community space for FIFA tournaments, streetwear collaborations and local talent showcases
- **Give the shop a professional presence** that works on any phone, since most customers will find it on their phones

## How the website helps Softouch stand out

Softouch's strengths, and how the site presents them:

| Strength | How the website shows it |
|---|---|
| Superior haircuts that no other barbershop around Mthatha matches | The homepage opens with this promise, and the gallery shows real cuts in a full-size photo viewer |
| Free PlayStation with every haircut, plus 15 extra minutes | A dedicated Gaming page, a banner on the Services page and a teaser on the homepage |
| A community space, not just a barber | The About page covers FIFA tournaments, streetwear collaborations and talent showcases |
| Easy to find and contact | The address, a tap-to-call number and social links on every visit, and a Contact page |
| A modern, trustworthy first impression | A clean blue, white and black design that matches the logo, fast loading and a layout that works on phones |
| Easy to discover online | Each page has its own title and description that mention Mthatha, to help the shop appear in local searches |

### Planned improvements

- Booking requests that reach the shop directly, for example on WhatsApp
- A Google Maps location on the Contact page
- Real prices and opening hours
- Photos of the shop, the team and the gaming area
- An events section with dates for upcoming tournaments

## To do

- Replace the sample opening hours with the shop's real hours
- Replace the sample prices on the services page with real prices
- Add a photo of the gaming area
- Make the booking form send requests to the shop (it currently only validates and shows a confirmation message)
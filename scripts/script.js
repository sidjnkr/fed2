// JavaScript Document
// carousel laten scrollen in een infinite loop (want vind ik beter en is toegankelijker vind ik)
const carousel = document.querySelector('main > aside:nth-of-type(2) > ul');

if (carousel) {
//bolletjes maken
const dotsContainer = document.querySelector('main > aside:nth-of-type(2) > .carousel-dots');
const cards = carousel.querySelectorAll('li');

// bolletjes genereren
cards.forEach(() => {
  const dot = document.createElement('span');
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('span');

//hier bolletjes updaten
function updateDots() {
  const current = getCurrentCardIndex();

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === current);
  });
}

// updaten tijdens het scrollen
carousel.addEventListener('scroll', updateDots);

// instellen bij het laden
updateDots();

const aside = document.querySelector('main > aside:nth-of-type(2)');

const nextButtons = aside.querySelectorAll('button[aria-label="Volgende recept"]');
const prevButtons = aside.querySelectorAll('button[aria-label="Vorig recept"]');
  // breedte van 1 kaart checken
  function getCardWidth() {
    const firstCard = carousel.querySelector('li');
    return firstCard ? firstCard.clientWidth : 0;
  }
  

  // kijken op welke kaart we zitten
  function getCurrentCardIndex() {
    const cardWidth = getCardWidth();
    if (!cardWidth) return 0;
    return Math.round(carousel.scrollLeft / cardWidth);
  }

  // pijltje volgende
  nextButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const cardWidth = getCardWidth();
      const cards = carousel.querySelectorAll('li');
      const lastIndex = cards.length - 1;
      const current = getCurrentCardIndex();

      if (current === lastIndex) {
        // als we op de laatste zitten gaan we terug naar de eerste
        carousel.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        // en anders gaan we gewoon naar de volgende
        carousel.scrollBy({
          left: cardWidth,
          behavior: 'smooth'
        });
      }
    });
  });

  // pijltje vorige
  prevButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const cardWidth = getCardWidth();
      const cards = carousel.querySelectorAll('li');
      const lastIndex = cards.length - 1;
      const current = getCurrentCardIndex();

      if (current === 0) {
        // als we op de eerste zitten gaan we naar de laatste
        carousel.scrollTo({
          left: cardWidth * lastIndex,
          behavior: 'smooth'
        });
      } else {
        // en anders gaan we gewoon eentje naar links
        carousel.scrollBy({
          left: -cardWidth,
          behavior: 'smooth'
        });
      }
    });
  });
}

// hamburger menu fixen

const nav = document.querySelector('header > nav');
const openButton  = document.querySelector('header > button[aria-label="Open menu"]');
const closeButton = document.querySelector('header > nav > button[aria-label="Sluit menu"]');

// check viewport zodat het hamburger menu alleen werkt op mobile en tablet en verdwijnt bij 1200px
const mobileQuery = window.matchMedia("(max-width: 1200px)");

if (nav && openButton && closeButton) {

  function openMenu() {
    nav.classList.add('toonMenu');   // zet nav in "overlay"-state
    openButton.style.display = 'none';  // hamburger verbergen
    openButton.setAttribute('aria-expanded', 'true'); //nu snapt de screenreader dat het een menu is die uit en inklapt
  }

  function closeMenu() {
    nav.classList.remove('toonMenu');  // nav terug naar normale header
    openButton.style.display = 'block';  // hamburger terug
    openButton.setAttribute('aria-expanded', 'false'); 
  }

  openButton.addEventListener('click', openMenu);
  closeButton.addEventListener('click', closeMenu);

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}



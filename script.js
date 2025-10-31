// Arama Fonksiyonu
const searchInput = document.querySelector('.search-box input');
const movieCards = document.querySelectorAll('.movie-card');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  movieCards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    card.style.display = title.includes(query) ? 'block' : 'none';
  });
});

// Kart Hover Efektleri
movieCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
    card.style.boxShadow = '0 15px 30px rgba(0, 208, 255, 0.5)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 10px 20px rgba(0, 208, 255, 0.4)';
  });
});

// Hero Button Scroll
const heroBtn = document.querySelector('.hero-btn');
heroBtn.addEventListener('click', () => {
  window.scrollTo({
    top: document.querySelector('.movies-section').offsetTop - 70,
    behavior: 'smooth'
  });
});

// Hamburger Menü Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
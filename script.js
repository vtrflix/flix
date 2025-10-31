// -----------------------------
// Arama Fonksiyonu (Dummy)
// -----------------------------
const searchInput = document.querySelector('.search-box input');
const movieCards = document.querySelectorAll('.movie-card');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();

  movieCards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    if (title.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// -----------------------------
// Hover Efektleri (JS ile)
// -----------------------------
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

// -----------------------------
// Hero Buton Scroll
// -----------------------------
const heroBtn = document.querySelector('.hero-btn');
heroBtn.addEventListener('click', () => {
  window.scrollTo({
    top: document.querySelector('.movies-section').offsetTop - 70,
    behavior: 'smooth'
  });
});
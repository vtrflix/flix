// Örnek JSON veri
const shows = [
  {
    title: "Yaratılan",
    poster: "https://tr.web.img4.acsta.net/pictures/23/09/21/14/02/3426432.jpg",
    type: "Dizi",
    seasons: [
      {
        season: 1,
        episodes: [
          "https://cdnbox.netlify.app/diziler/yaratilan/s1/b1/index.m3u8",
          "https://cdnbox.netlify.app/diziler/yaratilan/s1/b2/index.m3u8",
          "https://cdnbox.netlify.app/diziler/yaratilan/s1/b3/index.m3u8",
          "https://cdnbox.netlify.app/diziler/yaratilan/s1/b4/index.m3u8",
          "https://cdnbox.netlify.app/diziler/yaratilan/s1/b5/index.m3u8",
          "https://cdnbox.netlify.app/diziler/yaratilan/s1/b6/index.m3u8"
        ]
      }
    ]
  },
  {
    title: "Breaking Shadows",
    poster: "assets/images/show2.jpg",
    type: "Dizi",
    seasons: [
      {
        season: 1,
        episodes: [
          "https://cdnbox.netlify.app/hls/show2_s01_e01.m3u8",
          "https://cdnbox.netlify.app/hls/show2_s01_e02.m3u8"
        ]
      }
    ]
  }
];

const movies = [
  {
    title: "Eclipse Point",
    poster: "assets/images/movie1.jpg",
    type: "Film",
    video: "https://cdnbox.netlify.app/hls/movie1.m3u8"
  },
  {
    title: "Red Horizon",
    poster: "assets/images/movie2.jpg",
    type: "Film",
    video: "https://cdnbox.netlify.app/hls/movie2.m3u8"
  }
];

// Kartları dinamik oluştur
const showGrid = document.getElementById('showGrid');
shows.forEach(show => {
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.innerHTML = `
    <img src="${show.poster}" alt="${show.title}">
    <h3>${show.title}</h3>
    <p>${show.type}</p>
  `;
  showGrid.appendChild(card);

  card.addEventListener('click', () => {
    openModal(show);
  });
});

const movieGrid = document.getElementById('movieGrid');
movies.forEach(movie => {
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    <p>${movie.type}</p>
  `;
  movieGrid.appendChild(card);

  card.addEventListener('click', () => {
    openModal(movie, true);
  });
});

// Hamburger Menü
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));

// Hero Scroll
const heroBtn = document.querySelector('.hero-btn');
heroBtn.addEventListener('click', () => {
  window.scrollTo({
    top: document.querySelector('.movies-section').offsetTop - 70,
    behavior: 'smooth'
  });
});

// Modal HLS
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('videoPlayer');
const closeBtn = document.querySelector('.close');
const episodeButtons = document.getElementById('episodeButtons');

function openModal(content, isMovie = false) {
  modal.style.display = 'flex';
  episodeButtons.innerHTML = '';

  if(isMovie){
    // Film direkt oynat
    playVideo(content.video);
  } else {
    // Dizi: bölüm butonları oluştur
    content.seasons.forEach(season => {
      season.episodes.forEach((ep, index) => {
        const btn = document.createElement('button');
        btn.textContent = `S${season.season.toString().padStart(2,'0')}E${(index+1).toString().padStart(2,'0')}`;
        btn.setAttribute('data-video', ep);
        episodeButtons.appendChild(btn);

        btn.addEventListener('click', () => {
          playVideo(ep);
        });
      });
    });
    // İlk bölümü otomatik başlat
    if(content.seasons[0].episodes[0]) playVideo(content.seasons[0].episodes[0]);
  }
}

function playVideo(src){
  if(Hls.isSupported()){
    const hls = new Hls();
    hls.loadSource(src);
    hls.attachMedia(modalVideo);
    hls.on(Hls.Events.MANIFEST_PARSED, () => modalVideo.play());
  } else if(modalVideo.canPlayType('application/vnd.apple.mpegurl')){
    modalVideo.src = src;
    modalVideo.addEventListener('loadedmetadata', () => modalVideo.play());
  }
}

closeBtn.onclick = () => {
  modal.style.display = 'none';
  modalVideo.pause();
  modalVideo.src = '';
};
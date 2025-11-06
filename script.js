// GANTI DENGAN USERNAME BOT KAMU
const BOT_USERNAME = 'filmindobot';

// Data film (gunakan placeholder dulu)
const movies = [
  { id: "laskar-pelangi", title: "Laskar Pelangi", poster: "https://via.placeholder.com/140x210/333/fff?text=LASKAR+PELANGI" },
  { id: "dilan-1990", title: "Dilan 1990", poster: "https://via.placeholder.com/140x210/333/fff?text=DILAN+1990" },
  { id: "ayat-ayat-cinta", title: "Ayat-Ayat Cinta", poster: "https://via.placeholder.com/140x210/333/fff?text=AYAT+AYAT+CINTA" }
];

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function saveFavorites() {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function toggleFavorite(movieId) {
  const index = favorites.indexOf(movieId);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(movieId);
  }
  saveFavorites();
  renderMovies();
}

function playClickSound() {
  const sound = document.getElementById('clickSound');
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(e => console.log("Audio error:", e));
  }
}

function openInBot(movieId) {
  playClickSound();
  const url = `https://t.me/${BOT_USERNAME}?start=${movieId}`;
  window.open(url, '_blank');
}

function renderMovies() {
  console.log("Rendering movies...", movies.length);
  const container = document.getElementById('movies');
  if (!container) {
    console.error("Container #movies not found");
    return;
  }

  container.innerHTML = movies.map(movie => {
    const isFavorited = favorites.includes(movie.id);
    return `
      <div class="movie-card" onclick="openInBot('${movie.id}')">
        <img class="movie-poster" src="${movie.poster}" alt="${movie.title}">
        <div class="favorite-btn ${isFavorited ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite('${movie.id}');">
          <span class="star">★</span>
        </div>
        <div class="movie-title">${movie.title}</div>
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.textContent = saved === 'dark' ? '☀️' : '🌙';
    toggle.onclick = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      toggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    };
  }

  renderMovies();
});
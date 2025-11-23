

const container = document.getElementById("anime-container");
const searchInput = document.getElementById("search");
const genreFilter = document.getElementById("genre-filter");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageNumber = document.getElementById("page-number");

let currentPage = 1;
let currentGenre = "";
let currentQuery = "";

async function fetchAnime() {
  let url = `https://api.jikan.moe/v4/anime?page=${currentPage}&limit=12&order_by=score&sort=desc`;

  if (currentQuery) {
    url = `https://api.jikan.moe/v4/anime?q=${currentQuery}&page=${currentPage}&limit=12`;
  } else if (currentGenre) {
    url += `&genres=${currentGenre}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    displayAnime(data.data);
  } catch (error) {
    container.innerHTML = "<p>Error loading anime. Try again later.</p>";
  }
}

function displayAnime(animeList) {
  container.innerHTML = "";
  if (animeList.length === 0) {
    container.innerHTML = "<p>No anime found.</p>";
    return;
  }

  animeList.forEach(anime => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}" />
      <h3>${anime.title}</h3>
    `;
    card.onclick = () => {
      window.location.href = `anime.html?id=${anime.mal_id}`;
    };
    container.appendChild(card);
  });
}

// 🔍 Search input triggers API search
searchInput.addEventListener("input", () => {
  currentQuery = searchInput.value.trim();
  currentPage = 1;
  pageNumber.textContent = currentPage;
  fetchAnime();
});

// 🎯 Genre filter
genreFilter.addEventListener("change", () => {
  currentGenre = genreFilter.value;
  currentQuery = ""; // Clear search
  searchInput.value = "";
  currentPage = 1;
  pageNumber.textContent = currentPage;
  fetchAnime();
});

// ⏮ Pagination
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    pageNumber.textContent = currentPage;
    fetchAnime();
  }
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  pageNumber.textContent = currentPage;
  fetchAnime();
});

fetchAnime();



const latestCarousel = document.getElementById("latest-carousel");
const bestCarousel = document.getElementById("best-carousel");

async function fetchLatestAnime() {
  const res = await fetch("https://api.jikan.moe/v4/seasons/now");
  const data = await res.json();
  displayCarousel(data.data, latestCarousel);
}

async function fetchBestAnime() {
  const res = await fetch("https://api.jikan.moe/v4/top/anime?limit=20");
  const data = await res.json();
  displayCarousel(data.data, bestCarousel);
}

function displayCarousel(animeList, container) {
  container.innerHTML = "";
  animeList.forEach(anime => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}" />
      <h3>${anime.title}</h3>
    `;
    card.onclick = () => {
      window.location.href = `anime.html?id=${anime.mal_id}`;
    };
    container.appendChild(card);
  });
}

// 🎠 Scroll carousel left/right
function scrollCarousel(id, direction) {
  const container = document.getElementById(id);
  const scrollAmount = 200 * direction;
  container.scrollBy({ left: scrollAmount, behavior: "smooth" });
}

fetchLatestAnime();
fetchBestAnime();

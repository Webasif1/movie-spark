const API_KEY = "e4d834d92a6db5022f6028f38861fd57";
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE = "https://image.tmdb.org/t/p";

export const img = (path, size = "w500") =>
  path ? `${IMAGE_BASE}/${size}${path}` : "/placeholder.svg";

export const backdrop = (path) => img(path, "original");

async function fetchTMDB(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", API_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
  return res.json();
}

export const tmdb = {
  trending: (page = 1) => fetchTMDB("/trending/all/week", { page: String(page) }),
  popular: (page = 1) => fetchTMDB("/movie/popular", { page: String(page) }),
  topRated: (page = 1) => fetchTMDB("/movie/top_rated", { page: String(page) }),
  upcoming: (page = 1) => fetchTMDB("/movie/upcoming", { page: String(page) }),
  nowPlaying: (page = 1) => fetchTMDB("/movie/now_playing", { page: String(page) }),
  tvPopular: (page = 1) => fetchTMDB("/tv/popular", { page: String(page) }),
  search: (query, page = 1) => fetchTMDB("/search/multi", { query, page: String(page) }),
  movieDetail: (id) => fetchTMDB(`/movie/${id}`),
  tvDetail: (id) => fetchTMDB(`/tv/${id}`),
  videos: (id, type = "movie") => fetchTMDB(`/${type}/${id}/videos`),
  credits: (id, type = "movie") => fetchTMDB(`/${type}/${id}/credits`),
  similar: (id, type = "movie") => fetchTMDB(`/${type}/${id}/similar`),
  discover: (page = 1, genreId) =>
    fetchTMDB("/discover/movie", {
      page: String(page),
      ...(genreId ? { with_genres: String(genreId) } : {}),
    }),
  genres: () => fetchTMDB("/genre/movie/list"),
};

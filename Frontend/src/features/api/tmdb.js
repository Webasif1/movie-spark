import axios from "axios";

const API_KEY = "e4d834d92a6db5022f6028f38861fd57";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const fetchTrending = () =>
  tmdb.get(`/trending/movie/day?api_key=${API_KEY}`);

export const fetchPopular = () =>
  tmdb.get(`/movie/popular?api_key=${API_KEY}`);

export const fetchTopRated = () =>
  tmdb.get(`/movie/top_rated?api_key=${API_KEY}`);

export const fetchUpcoming = () =>
  tmdb.get(`/movie/upcoming?api_key=${API_KEY}`);

export const fetchMovieDetails = (id) =>
  tmdb.get(`/movie/${id}?api_key=${API_KEY}`);

export const fetchMovieVideos = (id) =>
  tmdb.get(`/movie/${id}/videos?api_key=${API_KEY}`);
export const fetchPopularTV = () =>
  tmdb.get(`/tv/popular?api_key=${API_KEY}`);

export const fetchTopRatedTV = () =>
  tmdb.get(`/tv/top_rated?api_key=${API_KEY}`);

export const fetchTrendingTV = () =>
  tmdb.get(`/trending/tv/day?api_key=${API_KEY}`);

export const searchMovies = (query) =>
  tmdb.get(`/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);

export default tmdb;

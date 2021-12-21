import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "9bbaa74d076c46799b7b1e527458fe42",
    language: "ko-KR",
  },
});

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  onTheAir: () => api.get("tv/on_the_air"),
  getGenres: () => api.get("genre/tv/list"),
  tvShowDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "images",
        include_image_language: "null,en",
      },
    }),
  getVideos: (id) => api.get(`tv/${id}/videos`),
  getSimilarTvShows: (id) => api.get(`tv/${id}/similar`),
  search: (term) =>
    api.get("search/tv", {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};

export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  getGenres: () => api.get("genre/movie/list"),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "images",
        include_image_language: "null,en",
      },
    }),
  getVideos: (id) => api.get(`movie/${id}/videos`),
  getSimilarMovies: (id) => api.get(`movie/${id}/similar`),
  search: (term) =>
    api.get("search/movie", {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};

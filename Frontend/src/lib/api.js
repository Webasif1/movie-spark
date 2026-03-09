const API_URL = "http://localhost:5000/api";

async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export const authApi = {
  register: (body) => apiFetch("/auth/register", { method: "POST", body }),
  login: (body) => apiFetch("/auth/login", { method: "POST", body }),
  getMe: () => apiFetch("/auth/get-me"),
  logout: () => apiFetch("/auth/logout"),
};

export const adminApi = {
  getMovies: (page = 1) => apiFetch(`/admin/movies?page=${page}`),
  getMovie: (id) => apiFetch(`/admin/movies/${id}`),
  createMovie: (movie) => apiFetch("/admin/movies", { method: "POST", body: movie }),
  updateMovie: (id, movie) => apiFetch(`/admin/movies/${id}`, { method: "PUT", body: movie }),
  deleteMovie: (id) => apiFetch(`/admin/movies/${id}`, { method: "DELETE" }),
};

export const favoritesApi = {
  getAll: () => apiFetch("/favorites"),
  add: (movie) => apiFetch("/favorites", { method: "POST", body: movie }),
  remove: (movieId) => apiFetch(`/favorites/${movieId}`, { method: "DELETE" }),
};

export const watchHistoryApi = {
  getAll: () => apiFetch("/watch-history"),
  add: (movie) => apiFetch("/watch-history", { method: "POST", body: movie }),
  clear: () => apiFetch("/watch-history", { method: "DELETE" }),
};

export const adminUsersApi = {
  getAll: () => apiFetch("/admin/users"),
  ban: (id) => apiFetch(`/admin/users/${id}/ban`, { method: "PATCH" }),
  unban: (id) => apiFetch(`/admin/users/${id}/unban`, { method: "PATCH" }),
  delete: (id) => apiFetch(`/admin/users/${id}`, { method: "DELETE" }),
};

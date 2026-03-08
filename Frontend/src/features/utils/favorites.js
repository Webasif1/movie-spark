export const getFavorites = () => {
  const fav = localStorage.getItem("favorites");
  return fav ? JSON.parse(fav) : [];
};

export const addFavorite = (movie) => {
  const favorites = getFavorites();

  const exists = favorites.find((m) => m.id === movie.id);
  if (!exists) {
    favorites.push(movie);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

export const removeFavorite = (id) => {
  const favorites = getFavorites().filter((m) => m.id !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

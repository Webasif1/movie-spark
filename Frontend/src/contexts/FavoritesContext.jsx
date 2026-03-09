import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { favoritesApi } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

const FavoritesContext = createContext(null);

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
};

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      return;
    }
    setIsLoading(true);
    try {
      const data = await favoritesApi.getAll();
      setFavorites(Array.isArray(data) ? data : []);
    } catch {
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const isFavorite = useCallback(
    (movieId) => favorites.some((f) => f.movieId === movieId),
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (movie) => {
      if (isFavorite(movie.movieId)) {
        await favoritesApi.remove(movie.movieId);
        setFavorites((prev) => prev.filter((f) => f.movieId !== movie.movieId));
      } else {
        await favoritesApi.add(movie);
        setFavorites((prev) => [...prev, { _id: "", ...movie }]);
      }
    },
    [isFavorite]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, isLoading, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

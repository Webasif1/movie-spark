import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Favorites = () => {
  const { token } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);

  const fetchFavorites = async () => {
    const res = await axios.get("http://localhost:5000/api/favorites", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMovies(res.data);
  };

  const removeFavorite = async (movieId) => {
    await axios.delete(`http://localhost:5000/api/favorites/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchFavorites();
  };

  useEffect(() => {
    if (token) fetchFavorites();
  }, [token]);

  if (!movies.length) return <p className="p-6">No favorites yet.</p>;

  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {movies.map((movie) => (
        <div key={movie.movieId}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
            className="rounded"
          />
          <button
            onClick={() => removeFavorite(movie.movieId)}
            className="mt-2 text-red-400"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;

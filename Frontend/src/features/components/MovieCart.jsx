import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { token } = useContext(AuthContext);

  const handleFavorite = async (e) => {
    e.preventDefault();
    if (!token) return alert("Please login first");

    await axios.post(
      "http://localhost:5000/api/favorites",
      {
        movieId: movie.id,
        title: movie.title || movie.name,
        poster: movie.poster_path,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Added to favorites!");
  };

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="relative hover:scale-105 transition cursor-pointer">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="rounded-lg"
        />
        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 bg-black/70 px-2 py-1 text-sm rounded"
        >
          ❤️
        </button>
        <h3 className="mt-2 text-sm">{movie.title || movie.name}</h3>
      </div>
    </Link>
  );
};

export default MovieCard

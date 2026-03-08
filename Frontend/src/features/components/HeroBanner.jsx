import { useEffect, useState } from "react";
import { fetchTrending } from "../api/tmdb";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchTrending().then((res) => {
      const movies = res.data.results;

      // pick random movie
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];

      setMovie(randomMovie);
    });
  }, []);

  if (!movie) return null;

  return (
    <div
      className="h-[70vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="bg-gradient-to-t from-black w-full p-8">

        <h1 className="text-4xl font-bold mb-4">
          {movie.title}
        </h1>

        <p className="max-w-xl text-gray-300 mb-6">
          {movie.overview?.slice(0, 150)}...
        </p>

        <Link
          to={`/movie/${movie.id}`}
          className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200"
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default HeroBanner;

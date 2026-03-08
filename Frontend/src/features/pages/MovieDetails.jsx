import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import AddToFavoritesButton from "../components/AddToFavoritesButton";

const MovieDetails = () => {
  const { id } = useParams(); // movie ID from URL
  const { token } = useContext(AuthContext);

  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);


  useEffect(() => {
  const fetchMovie = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=e4d834d92a6db5022f6028f38861fd57&append_to_response=videos`
      );
      console.log("Movie data:", res.data); // <--- log for debugging
      setMovie(res.data);
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  fetchMovie();
}, [id]);



  if (!movie) return <p className="p-6">Loading movie...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder.png"
          }
          alt={movie.title}
          className="rounded-lg w-full md:w-1/3"
        />

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 mb-2">{movie.release_date}</p>
          <p className="mb-4">
            {movie.overview || "Description not available."}
          </p>
          <p className="mb-4">
            <strong>Genres: </strong>
            {movie.genres?.map((g) => g.name).join(", ") || "N/A"}
          </p>

          {/* Trailer */}
          {trailerKey ? (
            <div className="mb-4">
              <iframe
                width="100%"
                height="300"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Movie Trailer"
                allowFullScreen
              />
            </div>
          ) : (
            <p className="text-red-400 mb-4">Trailer unavailable</p>
          )}

          {/* Favorites button */}
          <AddToFavoritesButton movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

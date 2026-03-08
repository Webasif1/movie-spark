import { useState } from "react";
import { searchMovies } from "../api/tmdb";
import { debounce } from "../utils/debounce";
import { Link } from "react-router-dom";

const Search = () => {
  const [results, setResults] = useState([]);

  const handleSearch = debounce(async (value) => {
    if (!value) return setResults([]);

    const res = await searchMovies(value);
    setResults(res.data.results);
  }, 500);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search movies..."
        className="px-4 py-2 rounded text-black"
        onChange={(e) => handleSearch(e.target.value)}
      />

      {results.length > 0 && (
        <div className="absolute bg-black w-full mt-2 rounded shadow-lg max-h-80 overflow-y-auto">
          {results.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="block px-4 py-2 hover:bg-gray-800"
            >
              {movie.title || movie.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;

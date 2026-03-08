import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const AddToFavoritesButton = ({ movie }) => {
  const { token } = useContext(AuthContext);

  const handleFavorite = async () => {
    if (!token) return alert("Please login first");

    try {
      await axios.post(
        "http://localhost:5000/api/favorites",
        {
          movieId: movie.id,
          title: movie.title,
          poster: movie.poster_path,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Added to favorites!");
    } catch (error) {
      alert(error.response?.data?.message || "Error adding favorite");
    }
  };

  return (
    <button
      onClick={handleFavorite}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
    >
      ❤️ Add to Favorites
    </button>
  );
};

export default AddToFavoritesButton;

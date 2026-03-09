import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const FavoriteButton = ({ movie, className, size = "sm" }) => {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const active = isFavorite(movie.id);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    await toggleFavorite({
      movieId: movie.id,
      title: movie.title || movie.name || "Untitled",
      poster_path: movie.poster_path || "",
      media_type: movie.media_type || (movie.title ? "movie" : "tv"),
      vote_average: movie.vote_average,
      release_date: movie.release_date || movie.first_air_date,
    });
  };

  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const btnSize = size === "sm" ? "p-1.5" : "p-2";

  return (
    <button
      onClick={handleClick}
      className={cn(
        "rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors",
        btnSize,
        className
      )}
      title={active ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={cn(
          iconSize,
          "transition-colors",
          active ? "fill-primary text-primary" : "text-muted-foreground hover:text-primary"
        )}
      />
    </button>
  );
};

export default FavoriteButton;

import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import MovieCard from "@/components/MovieCard";

const Favorites = () => {
  const { user } = useAuth();
  const { favorites, isLoading } = useFavorites();

  if (!user) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
        <Heart className="w-16 h-16 text-muted-foreground" />
        <p className="text-muted-foreground">Please sign in to view your favorites.</p>
        <Link to="/login" className="text-primary hover:underline">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container">
        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-8">My Favorites</h1>
        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20">
            <Heart className="w-16 h-16 text-muted-foreground" />
            <p className="text-muted-foreground">No favorites yet. Start adding some!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {favorites.map((fav) => (
              <MovieCard
                key={fav.movieId}
                movie={{
                  id: fav.movieId,
                  title: fav.title,
                  poster_path: fav.poster,
                  backdrop_path: null,
                  overview: "",
                  vote_average: fav.vote_average,
                  release_date: fav.release_date,
                  genre_ids: [],
                  media_type: fav.media_type,
                  popularity: 0,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;

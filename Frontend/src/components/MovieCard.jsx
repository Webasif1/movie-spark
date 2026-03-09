import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { img } from "@/lib/tmdb";
import FavoriteButton from "@/components/FavoriteButton";

const MovieCard = ({ movie, index = 0 }) => {
  const title = movie.title || movie.name || "Untitled";
  const mediaType = movie.media_type || (movie.title ? "movie" : "tv");
  const year = (movie.release_date || movie.first_air_date || "").slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link to={`/${mediaType}/${movie.id}`} className="block group">
        <div className="relative overflow-hidden rounded-lg card-hover aspect-[2/3] bg-secondary">
          <div className="absolute top-2 right-2 z-10">
            <FavoriteButton movie={movie} />
          </div>
          <img
            src={img(movie.poster_path, "w500")}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.src = "/placeholder.svg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <div>
              <p className="text-sm font-semibold text-foreground line-clamp-2">{title}</p>
              <div className="flex items-center gap-2 mt-1">
                {movie.vote_average > 0 && (
                  <span className="flex items-center gap-1 text-xs text-primary">
                    <Star className="w-3 h-3 fill-primary" />
                    {movie.vote_average.toFixed(1)}
                  </span>
                )}
                {year && <span className="text-xs text-muted-foreground">{year}</span>}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 px-1">
          <p className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </p>
          {year && <p className="text-xs text-muted-foreground mt-0.5">{year}</p>}
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;

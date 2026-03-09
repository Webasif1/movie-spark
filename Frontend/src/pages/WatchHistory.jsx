import { useWatchHistory } from "@/contexts/WatchHistoryContext";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Clock, Trash2, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { img } from "@/lib/tmdb";
import { motion } from "framer-motion";

const WatchHistory = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { history, isLoading, clearHistory } = useWatchHistory();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl text-foreground flex items-center gap-3">
              <Clock className="w-8 h-8 text-primary" />
              Watch History
            </h1>
            <p className="text-muted-foreground mt-1">Your recently viewed movies & shows</p>
          </div>
          {history.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => clearHistory()} className="gap-2">
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          )}
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Loading history...</p>
        ) : history.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Film className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No watch history yet</p>
            <p className="text-sm mt-1">Start exploring movies and they'll show up here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {history.map((item, i) => (
              <motion.div
                key={item.tmdbId || item._id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  to={`/${item.mediaType || "movie"}/${item.tmdbId}`}
                  className="group block"
                >
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-secondary">
                    <img
                      src={item.poster ? (item.poster.startsWith("http") ? item.poster : img(item.poster, "w342")) : "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => { e.target.src = "/placeholder.svg"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="mt-2 text-sm font-medium text-foreground line-clamp-1">{item.title}</p>
                  {item.watchedAt && (
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.watchedAt).toLocaleDateString()}
                    </p>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchHistory;

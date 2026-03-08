import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import WatchHistory from "../pages/WatchHistory";

import Home from "../pages/Home";
import Movies from "../pages/MovieDetails";
import TVShows from "../pages/TVShows";
import MovieDetails from "../pages/MovieDetails";
import Favorites from "../pages/Favorites";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tvshows" element={<TVShows />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/history" element={
        <ProtectedRoute>
          <WatchHistory />
        </ProtectedRoute>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AppRouter;

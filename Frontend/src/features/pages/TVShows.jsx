import { useEffect, useState } from "react";
import { fetchTrendingTV, fetchPopularTV, fetchTopRatedTV } from "../api/tmdb";
import TVRow from "../components/TVRow";

const TVShows = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    fetchTrendingTV().then(res => setTrending(res.data.results));
    fetchPopularTV().then(res => setPopular(res.data.results));
    fetchTopRatedTV().then(res => setTopRated(res.data.results));
  }, []);

  return (
    <div className="p-6">
      <TVRow title="Trending TV Shows" shows={trending} />
      <TVRow title="Popular TV Shows" shows={popular} />
      <TVRow title="Top Rated TV Shows" shows={topRated} />
    </div>
  );
};

export default TVShows;

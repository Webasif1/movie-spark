import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";

import {
  fetchTrending,
  fetchPopular,
  fetchTopRated,
  fetchUpcoming,
} from "../api/tmdb";

import MovieRow from "../components/MovieRow";

const Home = () => {

  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {

    fetchTrending().then((res) => {
      setTrending(res.data.results);
    });

    fetchPopular().then((res) => {
      setPopular(res.data.results);
    });

    fetchTopRated().then((res) => {
      setTopRated(res.data.results);
    });

    fetchUpcoming().then((res) => {
      setUpcoming(res.data.results);
    });

  }, []);

  return (
  <div>

    <HeroBanner />

    <div className="p-6">

      <MovieRow title="Trending Movies" movies={trending} />
      <MovieRow title="Popular Movies" movies={popular} />
      <MovieRow title="Top Rated Movies" movies={topRated} />
      <MovieRow title="Upcoming Movies" movies={upcoming} />

    </div>

  </div>
);
};

export default Home;

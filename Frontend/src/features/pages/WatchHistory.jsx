import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const WatchHistory = () => {
  const { token } = useContext(AuthContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!token) return;
    axios.get("http://localhost:5000/api/watch", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setHistory(res.data));
  }, [token]);

  if (!history.length) return <p className="p-6">No movies watched yet.</p>;

  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {history.map((movie) => (
        <div key={movie.movieId}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
            className="rounded"
          />
          <p className="mt-2 text-sm">{movie.title}</p>
        </div>
      ))}
    </div>
  );
};

export default WatchHistory;

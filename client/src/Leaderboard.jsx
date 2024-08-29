import { useEffect } from "react";
import useFetch from "./useFetch";
import "./leaderboard.css";
import formattedTime from "./lib/time";
import { ArrowBigRight } from "lucide-react";
import { func } from "prop-types";

const Leaderboard = ({ setRoute }) => {
  const { data, error, isLoading, fetchData } = useFetch();
  useEffect(() => {
    fetchData("/leaderboard?limit=10");
  }, []);

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <main>
      <header className="header">
        <h1>leaderboard</h1>
        <button className="button-link" onClick={() => setRoute("game")}>
          go home
          <ArrowBigRight />
        </button>
      </header>
      {data && (
        <ol className="leaderboard-list" role="list">
          {data.map((entry, i) => (
            <li key={i}>
              <span className="rank">{i + 1}.</span>
              <span className="username"> {entry.username}</span>
              <span className="time"> ({formattedTime(entry.time)})</span>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
};
Leaderboard.propTypes = {
  setRoute: func,
};

export default Leaderboard;

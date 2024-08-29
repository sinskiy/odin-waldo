import { useEffect, useState } from "react";
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

  const [moreShown, setMoreShown] = useState(false);
  function handleClick() {
    setMoreShown(true);
    fetchData("/leaderboard");
  }

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
      {data && data.length > 0 ? (
        <>
          <ol className="leaderboard-list" role="list">
            {data.map((entry, i) => (
              <li key={i}>
                <span className="rank">{i + 1}.</span>
                <span className="username"> {entry.username}</span>
                <span className="time"> ({formattedTime(entry.time)})</span>
              </li>
            ))}
          </ol>
          {!moreShown && <button onClick={handleClick}>show more</button>}
        </>
      ) : (
        <p>Leaderboard is empty. Be first!</p>
      )}
    </main>
  );
};
Leaderboard.propTypes = {
  setRoute: func,
};

export default Leaderboard;

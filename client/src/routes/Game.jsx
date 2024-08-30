import { useEffect, useRef, useState } from "react";
import Dropdown from "../components/Dropdown";
import TargetsForm from "../components/TargetsForm";
import useFetch from "../hooks/useFetch";
import AddToLeaderboard from "../components/AddToLeaderboard";
import formattedTime from "../lib/time";
import { arrayOf, func, number, string } from "prop-types";
import Clicks from "../components/Clicks";

const EXPECTED_WIDTH = 3000;
const EXPECTED_HEIGHT = 2000;

const Game = ({ setRoute }) => {
  const dialogRef = useRef(null);
  function closeDialog() {
    dialogRef.current?.close();
  }

  const timerRef = useRef(null);
  const [time, setTime] = useState(0);
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => setTime((time) => time + 1000), 1000);
    timerRef.current = timer;
    return () => clearInterval(timer);
  }, []);

  const [dropdownShown, setDropdownShown] = useState(false);
  const [dropdownCoords, setDropdownCoords] = useState([0, 0]);
  const [agnosticCoords, setAgnosticCoords] = useState([null, null]);
  const [clickCoordsHistory, setClickCoordsHistory] = useState([]);

  const { data, fetchData } = useFetch();
  function getTarget(...args) {
    setClickCoordsHistory([...clickCoordsHistory, dropdownCoords]);
    fetchData(...args);
  }

  const [guessed, setGuessed] = useState([]);
  if (data && !guessed.includes(data.name)) {
    setGuessed([...guessed, data.name]);
  }
  if (guessed.length === 3) {
    dialogRef.current?.showModal();
    clearInterval(timerRef.current);
    if (!finished) {
      setFinished(true);
    }
  }

  function handleClick(event) {
    if (finished) return;

    setDropdownShown(!dropdownShown);
    setDropdownCoords(getDropdownCoords(event));

    setAgnosticCoords(getAgnosticCoords(event));
  }
  function getDropdownCoords(event) {
    const { pageX, pageY } = event;
    return [pageX, pageY];
  }
  function getAgnosticCoords(event) {
    const { left, top, width, height } = event.target.getBoundingClientRect();
    const { clientX, clientY } = event;
    const [x, y] = [clientX - left, clientY - top];

    const agnosticX = (EXPECTED_WIDTH / width) * x;
    const agnosticY = (EXPECTED_HEIGHT / height) * y;
    return [agnosticX, agnosticY];
  }
  return (
    <div>
      <img
        src="/pixelbattle2023.png"
        alt="screen readers are not supported"
        onClick={handleClick}
        className="game-image"
      />
      <Clicks clickCoordsHistory={clickCoordsHistory} />
      <GameHeader guessed={guessed} time={time} setRoute={setRoute} />
      {dropdownShown && (
        <Dropdown dropdownCoords={dropdownCoords}>
          <TargetsForm
            agnosticCoords={agnosticCoords}
            dropdownCoords={dropdownCoords}
            setClickCoordsHistory={setClickCoordsHistory}
            fetchData={getTarget}
            guessed={guessed}
          />
        </Dropdown>
      )}
      <dialog ref={dialogRef}>
        <AddToLeaderboard timeMs={time} closeDialog={closeDialog} />
      </dialog>
    </div>
  );
};
Game.propTypes = {
  setRoute: func,
};

const GameHeader = ({ guessed, time, setRoute }) => {
  return (
    <header className="topbar">
      <div className="card topbar-entry" aria-live="polite">
        {guessed.length}/3
      </div>
      <div className="card topbar-entry">{formattedTime(time)}</div>
      <nav
        className="card topbar-entry"
        style={{ display: "flex", alignItems: "center" }}
      >
        <button onClick={() => setRoute("leaderboard")} className="button-link">
          leaderboard
        </button>
      </nav>
    </header>
  );
};
GameHeader.propTypes = {
  guessed: arrayOf(string),
  time: number,
  setRoute: func,
};

export default Game;

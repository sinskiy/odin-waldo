import { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import TargetsForm from "./TargetsForm";
import useFetch from "./useFetch";
import AddToLeaderboard from "./AddToLeaderboard";
import { Circle } from "lucide-react";
import formattedTime from "./lib/time";

const EXPECTED_WIDTH = 3000;
const EXPECTED_HEIGHT = 2000;

export default function Game() {
  const dialogRef = useRef(null);
  function closeDialog() {
    dialogRef.current?.close();
  }

  const timerRef = useRef(null);
  const [time, setTime] = useState(0);
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
  }

  function handleClick(event) {
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
      <ul aria-label="clicks history">
        {clickCoordsHistory.map((click, i) => (
          <li
            aria-label={click}
            key={i}
            className="click"
            style={{ transform: `translate(${click[0]}px,${click[1]}px)` }}
          >
            <Circle size={48} strokeWidth={4} color="white" />
          </li>
        ))}
      </ul>
      <div className="topbar">
        <div className="card topbar-entry" aria-live="polite">
          {guessed.length}/3
        </div>
        <div className="card topbar-entry">{formattedTime(time)}</div>
      </div>
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
}

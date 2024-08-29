import { useRef, useState } from "react";
import Dropdown from "./Dropdown";
import TargetsForm from "./TargetsForm";
import useFetch from "./useFetch";
import AddToLeaderboard from "./AddToLeaderboard";
import { Check, X } from "lucide-react";

const EXPECTED_WIDTH = 3000;
const EXPECTED_HEIGHT = 2000;

export default function Game() {
  const dialogRef = useRef(null);

  const [dropdownShown, setDropdownShown] = useState(false);
  const [dropdownCoords, setDropdownCoords] = useState([0, 0]);
  const [agnosticCoords, setAgnosticCoords] = useState([null, null]);
  const [clickCoordsHistory, setClickCoordsHistory] = useState([]);

  const { data, error, fetchData } = useFetch();
  function getTarget() {
    fetchData();
    setClickCoordsHistory((history) => [
      ...history,
      [...dropdownCoords, data ? true : false],
    ]);
  }

  const [guessed, setGuessed] = useState([]);
  if (data && !guessed.includes(data.name)) {
    setGuessed([...guessed, data.name]);
  }
  if (guessed.length === 3) {
    dialogRef.current?.showModal();
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
            aria-label={
              click.slice(0, -1) + `, ${click[2] ? "match" : "not match"}`
            }
            key={i}
            className="click"
            style={{ transform: `translate(${click[0]}px,${click[1]}px)` }}
          >
            {click[2] ? (
              <Check size={36} strokeWidth={6} color="rgb(0 255 0)" />
            ) : (
              <X size={48} strokeWidth={4} color="red" fill="red" />
            )}
          </li>
        ))}
      </ul>
      <div className="topbar">
        <div className="card topbar-entry" aria-live="polite">
          {guessed.length}/3
        </div>
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
        <AddToLeaderboard timeMs={5000} />
      </dialog>
    </div>
  );
}

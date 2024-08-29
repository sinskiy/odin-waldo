import { useState } from "react";
import Dropdown from "./Dropdown";
import TargetsForm from "./TargetsForm";
import useFetch from "./useFetch";

const EXPECTED_WIDTH = 3000;
const EXPECTED_HEIGHT = 2000;

export default function Game() {
  const [dropdownShown, setDropdownShown] = useState(false);
  const [dropdownCoords, setDropdownCoords] = useState([0, 0]);
  const [agnosticCoords, setAgnosticCoords] = useState([null, null]);

  const { data, error, fetchData } = useFetch();
  function handleClick(event) {
    setDropdownShown(!dropdownShown);
    setDropdownCoords(getDropdownCoords(event));

    setAgnosticCoords(getAgnosticCoords(event));
  }
  function getDropdownCoords(event) {
    const { clientX, clientY } = event;
    return [clientX, clientY];
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
      {dropdownShown && (
        <Dropdown x={dropdownCoords[0]} y={dropdownCoords[1]}>
          <TargetsForm
            x={agnosticCoords[0]}
            y={agnosticCoords[1]}
            fetchData={fetchData}
          />
        </Dropdown>
      )}
    </div>
  );
}

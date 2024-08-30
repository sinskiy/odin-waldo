import { Circle } from "lucide-react";
import { arrayOf, object } from "prop-types";

const Clicks = ({ clickCoordsHistory }) => {
  return (
    <ul aria-label="clicks history">
      {clickCoordsHistory.map((click, i) => (
        <li
          aria-label={click}
          key={i}
          className="click"
          style={{
            transform: `translate(${click[0] - 20}px,${click[1] - 20}px)`,
          }}
        >
          <Circle size={48} strokeWidth={4} color="white" />
        </li>
      ))}
    </ul>
  );
};
Clicks.propTypes = {
  clickCoordsHistory: arrayOf(object),
};

export default Clicks;

import { Check, Circle, X } from "lucide-react";
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
          {click[2] ? (
            <Check size={48} strokeWidth={4} color="#00ff00" />
          ) : (
            <X size={48} strokeWidth={4} color="red" />
          )}
        </li>
      ))}
    </ul>
  );
};
Clicks.propTypes = {
  clickCoordsHistory: arrayOf(object),
};

export default Clicks;

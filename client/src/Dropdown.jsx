import { node, number } from "prop-types";

const Dropdown = ({ x, y, children }) => {
  return (
    <div
      className="card dropdown"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      {children}
    </div>
  );
};
Dropdown.propTypes = {
  x: number,
  y: number,
  children: node,
};

export default Dropdown;

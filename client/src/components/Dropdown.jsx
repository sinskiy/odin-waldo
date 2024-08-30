import { arrayOf, node, number } from "prop-types";

const Dropdown = ({ dropdownCoords, children }) => {
  return (
    <div
      className="card dropdown"
      style={{
        transform: `translate(${dropdownCoords[0]}px, ${dropdownCoords[1]}px)`,
      }}
    >
      {children}
    </div>
  );
};
Dropdown.propTypes = {
  dropdownCoords: arrayOf(number),
  children: node,
};

export default Dropdown;

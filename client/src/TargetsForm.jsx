import { arrayOf, func, number, string } from "prop-types";
import Target from "./Target";

const TargetsForm = ({ agnosticCoords, fetchData, guessed }) => {
  function handleSubmit(event) {
    event.preventDefault();
    fetchData(`/target?x=${agnosticCoords[0]}&y=${agnosticCoords[1]}`);
  }
  const targets = [
    {
      label: "leinster-coat-of-arms",
      src: "leinster-coat-of-arms.svg",
      text: "coat of arms of leinster",
    },
    {
      label: "xbox",
      src: "xbox.svg",
      text: "xbox logo",
    },
    {
      label: "two-cars",
      src: "two-cars.webp",
      text: "two cars",
    },
  ];
  return (
    <form method="post" onSubmit={handleSubmit} className="targets-form">
      {targets.map((target) => (
        <Target
          key={target.label}
          label={target.label}
          src={target.src}
          text={target.text}
          disabled={guessed.includes(target.label)}
        />
      ))}
      <button type="submit">submit</button>
    </form>
  );
};
TargetsForm.propTypes = {
  agnosticCoords: arrayOf(number),
  fetchData: func,
  guessed: arrayOf(string),
};

export default TargetsForm;

import { func, number } from "prop-types";
import Target from "./Target";

const TargetsForm = ({ x, y, fetchData }) => {
  function handleSubmit(event) {
    event.preventDefault();
    fetchData(`/target?x=${x}&y=${y}`);
  }
  return (
    <form method="post" onSubmit={handleSubmit} className="targets-form">
      <Target
        label="leinster-coat-of-arms"
        src="leinster-coat-of-arms.svg"
        text="coat of arms of leinster"
      />
      <Target label="xbox" src="xbox.svg" text="xbox logo" />
      <Target label="two-cars" src="two-cars.webp" text="two cars" />
      <button type="submit">submit</button>
    </form>
  );
};
TargetsForm.propTypes = {
  x: number,
  y: number,
  fetchData: func,
};

export default TargetsForm;

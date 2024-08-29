import Target from "./Target";

const TargetsForm = () => {
  return (
    <form className="targets-form">
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

export default TargetsForm;

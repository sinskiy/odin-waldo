import Target from "./Target";

const TargetsForm = () => {
  return (
    <form className="targets-form">
      <Target
        label="leinster-coat-of-arms"
        src="leinster-coat-of-arms.svg"
        text="coat of arms of leinster"
      />
      <Target
        label="leinster-coat-of-arms"
        src="leinster-coat-of-arms.svg"
        text="coat of arms of leinster"
      />
      <Target
        label="leinster-coat-of-arms"
        src="leinster-coat-of-arms.svg"
        text="coat of arms of leinster"
      />
      <button type="submit">submit</button>
    </form>
  );
};

export default TargetsForm;

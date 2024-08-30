import { bool, string } from "prop-types";
import classes from "./Target.module.css";

const Target = ({ label, src, text, disabled }) => {
  return (
    <div className={classes.imageSelect}>
      <input type="radio" name="target" id={label} disabled={disabled} />
      <label htmlFor={label}>
        <figure>
          <img src={src} alt="" />
          <figcaption>{text}</figcaption>
        </figure>
      </label>
    </div>
  );
};
Target.propTypes = {
  label: string,
  src: string,
  text: string,
  disabled: bool,
};

export default Target;

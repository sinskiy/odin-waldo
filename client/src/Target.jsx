import { string } from "prop-types";

const Target = ({ label, src, text }) => {
  return (
    <div className="image-select">
      <input type="radio" name="target" id={label} />
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
};

export default Target;

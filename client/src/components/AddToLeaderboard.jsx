import { func, number } from "prop-types";
import formattedTime from "../lib/time";
import useFetch from "../hooks/useFetch";
import classes from "./AddToLeaderboard.module.css";

const AddToLeaderboard = ({ timeMs, closeDialog }) => {
  const { error, isLoading, fetchData } = useFetch();
  function handleSubmit(event) {
    event.preventDefault();
    closeDialog();

    const formData = new FormData(event.target);
    fetchData("/leaderboard", {
      method: "post",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        time: timeMs,
        username: formData.get("username"),
      }),
    });
  }
  return (
    <form onSubmit={handleSubmit} method="post" className={classes.form}>
      {error && <p>{error}</p>}
      <h2>
        your time is <em>{formattedTime(timeMs)}</em>
      </h2>
      <div className={classes.inputEntry}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          id="username"
          required
          minLength={1}
          maxLength={30}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        add to leaderboard
      </button>
    </form>
  );
};
AddToLeaderboard.propTypes = {
  timeMs: number,
  closeDialog: func,
};

export default AddToLeaderboard;

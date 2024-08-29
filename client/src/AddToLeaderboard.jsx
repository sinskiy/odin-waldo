import { number } from "prop-types";
import time from "./lib/time";

const AddToLeaderboard = ({ timeMs }) => {
  return (
    <form method="post" className="add-to-leaderboard">
      <h2>
        your time is <em>{time(timeMs)}</em>
      </h2>
      <div className="input-entry">
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
      <button type="submit">add to leaderboard</button>
    </form>
  );
};
AddToLeaderboard.propTypes = {
  timeMs: number,
};

export default AddToLeaderboard;

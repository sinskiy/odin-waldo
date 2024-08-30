import { useState } from "react";
import Game from "./routes/Game";
import Leaderboard from "./routes/Leaderboard";

export default function App() {
  const [route, setRoute] = useState("game");
  if (route === "game") return <Game setRoute={setRoute} />;
  return <Leaderboard setRoute={setRoute} />;
}

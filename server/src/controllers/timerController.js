import jwt from "jsonwebtoken";

export function timerGet(req, res) {
  const bearerHeader = req.get("Authorization");
  const bearerToken = bearerHeader?.split(" ")[1];

  if (!bearerToken) {
    // TODO: handle users that play again
    const token = jwt.sign({ start: Date.now() }, process.env.SECRET);
    return res.json({ token: token });
  }

  const user = jwt.verify(bearerToken, process.env.SECRET);
  res.json({ time: Date.now() - user.start });
}

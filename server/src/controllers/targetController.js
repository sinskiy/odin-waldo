import { getMatchingTarget } from "../services/targetService.js";

export async function targetGet(req, res, next) {
  const { x, y } = req.query;
  try {
    const targetName = await getMatchingTarget(Number(x), Number(y));
    if (!targetName) {
      const error = new Error("Coords are incorrect.");
      error.statusCode = 400;
      throw error;
    }
    res.json(targetName);
  } catch (err) {
    next(err);
  }
}

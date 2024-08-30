import { getMatchingTarget } from "../services/targetService.js";

export async function targetGet(req, res, next) {
  const { x, y, name } = req.query;
  try {
    const target = await getMatchingTarget(Number(x), Number(y));
    if (target.name !== name) {
      const error = new Error("Coords are incorrect.");
      error.statusCode = 400;
      throw error;
    }
    res.json(target);
  } catch (err) {
    next(err);
  }
}

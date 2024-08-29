// import "dotenv/config";
import { Sequelize } from "sequelize";

const db = new Sequelize(process.env.DATABASE_URL);
// try {
//   await db.authenticate();
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }

export default db;

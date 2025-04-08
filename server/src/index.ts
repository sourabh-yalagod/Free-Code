import { config } from "dotenv";
import app from "./app";
import DBConnect from "./db";

config();
const port = process.env.PORT || 3000;
(async () => {
  const isDbConnected = await DBConnect.connectDB();
  if (isDbConnected) {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  } else {
    throw new Error("DB connection Failed");
  }
})();

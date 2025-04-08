import mongoose from "mongoose";

class DBConnection {
  private static connection: typeof mongoose | null = null;
  public static async connectDB(): Promise<typeof mongoose | null> {
    if (!DBConnection.connection) {
      try {
        DBConnection.connection = await mongoose.connect(
          process.env.MONGO_URL!,
          {
            dbName: "Free-Code",
          }
        );
        console.log("MongoDB connected successfully.");
      } catch (error) {
        console.error("MongoDB connection error:", error);
        DBConnection.connection = null;
        process.exit(1);
      }
    }
    return DBConnection.connection;
  }
}
export default DBConnection;

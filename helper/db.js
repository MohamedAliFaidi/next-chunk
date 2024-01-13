const mongoose = require("mongoose");

const  dbConnect = async () => {
  try {
    console.log("Connecting to database...");
    const conn = await mongoose.connect(
      process.env.MONGODB_URI,
    );
    mongoose.set("strictQuery", false);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect
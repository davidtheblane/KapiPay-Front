const mongoose = require("mongoose");
require('dotenv').config()

const db = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.log("Something went wrong with Database connection");
    process.exit(1);
  }
};
mongoose.Promise = global.Promise;
module.exports = connectDB;

const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connection with MongoDB : ON");
  } catch (e) {
    console.log("Error connecting to MogoDB: ", e);
    throw new Error("Error connecting to MogoDB: ");
  }
};

module.exports = { dbConnection };

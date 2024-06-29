// Import the mongoose module, which is used to interact with MongoDB databases.
const mongoose = require("mongoose");

// Define the URL constant for the MongoDB connection string (currently empty).
const URL = "";

// Mongoose settings to avoid deprecation warnings and use newer features.

// Set to use the new MongoDB URL parser for the connection string.
mongoose.set("useNewUrlParser", true);
// Disable the deprecated 'findAndModify' function and prefer using 'findOneAndUpdate' or 'findOneAndDelete'.
mongoose.set("useFindAndModify", false);
// Enable index creation using 'createIndex' instead of the older method.
mongoose.set("useCreateIndex", true);
// Configure the connection to use the new MongoDB connection management engine.
mongoose.set("useUnifiedTopology", true);

// Connect to the MongoDB database using the provided connection string in 'URL'.
mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to MongoDB database.");
  })
  .catch(() => {
    console.log(err);
  });

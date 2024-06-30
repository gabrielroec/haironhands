const mongoose = require("mongoose");

const URI =
  "mongodb+srv://roecwebdev:asuhasuh1@clusterhaironhandsdev.kv19iyc.mongodb.net/hair-on-hands?retryWrites=true&w=majority&appName=ClusterHairOnHandsDev";

let options = {};

mongoose
  .connect(URI, options)
  .then(() => console.log("DB is Up!"))
  .catch((err) => console.log(err));

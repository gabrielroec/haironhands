const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const busboy = require("connect-busboy");
const busboyBodyParser = require("busboy-body-parser");
require("./database");

//MIDDLEWARE
app.use(morgan("dev"));
app.use(morgan("dev"));
app.use(express.json());
app.use(busboy());
app.use(busboyBodyParser());
app.use(cors());

//VARIABLES
app.set("port", 8000);

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});

app.use("/salao", require("./src/routes/salao.routes"));
app.use("/servico", require("./src/routes/servico.routes"));
app.use("/horario", require("./src/routes/horario.routes"));

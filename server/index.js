const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

app.use("/static", express.static("static"));
app.use("/assets", express.static("assets"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.htm"));
});

app.listen(port, () => {
  console.log(`Game Jam app listening at http://localhost:${port}`);
});

const express = require('express');
const app = express();
const path = require("path");
const port = 3000;

app.use(express.static("static"));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.htm"));
});

app.listen(port, () => {
  console.log(`Game Jam app listening at http://localhost:${port}`);
});
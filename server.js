const express = require("express");
const app = express();

app.use(express.text());

app.post("/gsm", (req, res) => {
  console.log("DATA:", req.body);
  res.send("OK");
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});

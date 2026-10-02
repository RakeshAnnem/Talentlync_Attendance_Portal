const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const memberRoute = require("./routes/memberRoute");
const traineeRoute = require("./routes/traineeRoute");
const classRoute = require("./routes/classRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.get("/test-db", (req, res) => {
  db.query("SELECT 1", (err, result) => {
    if (err) {
      console.error("Database error:", err);

      return res.status(500).json({
        message: "Database connection failed",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "MySQL connected successfully",
      result,
    });
  });
});

app.use("/api/member", memberRoute);
app.use("/api/trainee", traineeRoute);
app.use("/api/class",classRoute);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require("express"),
  PORT = process.env.PORT || 5000;

const app = express();
const connectDB = require("./config/db");
const path = require("path");

connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    msg: "Welcome to the ContactKeeper API"
  });
});

app.use("/api", require("./routes/users"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set a static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});

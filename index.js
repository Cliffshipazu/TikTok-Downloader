/**
 * DannTeam
 * Instagram: @dannalwaysalone
 */

const express = require("express");
const helmet = require("helmet");
const { TiktokDownloader } = require("@tobyg74/tiktok-api-dl");

// Library
const author = process.env.AUTHOR || "Cliff";
const PORT = process.env.PORT || 8000;
const app = express();

app.use(helmet()); // Integrate Helmet for added security
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/tiktok", (req, res) => {
  const url = req.query.url;
  if (!url) {
    res.status(400).json({
      status: 400,
      message: "Input URL Tiktok!"
    })
  }
  TiktokDownloader(url, { version: "v2" })
    .then(data => {
      res.status(200).json({
        status: 200,
        author: author,
        result: data.result
      })
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        author: author,
        message: err.message
      })
    })
});

app.listen(PORT, () => {
  console.log(`Server is running listening on port ${PORT}`);
});

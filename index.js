const express = require("express");
const userRouter = require("./routes/user.routes");
const paramDB = require("./config/database");
const client = require("prom-client");
const { latency, rps, deleteResource } = require("./prom");

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.use("/health", (req, res) => {
  res.send('{"status":"OK"}');
});

app.use("/params", (req, res) => {
  res.json(paramDB.hrPool);
});

app.use("/make500", (req, res) => {
  const endLate = latency.startTimer({ method: req.method, endpoint: req.path });
  res.status(500).end();
  rps.labels({ method: req.method, endpoint: req.path, http_status: res.statusCode }).inc();
  endLate({ method: req.method, endpoint: req.path });
});

app.get("/metrics", async function (req, res) {
  res.status(200).set("Content-Type", "text/plain");
  res.end(await client.register.metrics());
});

app.use("/api", userRouter);

app.use("/", (req, res) => {
  res.status(200).end("My Service is working!");
});

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));

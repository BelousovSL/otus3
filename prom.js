const client = require("prom-client");

const rps = new client.Counter({
  name: "app_request_count",
  help: "Aplication Request Count",
  labelNames: ["method", "http_status", "endpoint"],
});

const latency = new client.Histogram({
  name: "app_request_latency_seconds",
  help: "Application Request Latency",
  labelNames: ["method", "endpoint"],
  buckets: [0.5, 0.95, 0.99],
});

const deleteResource = (endpoint) => {
  const arr = endpoint.split("/").filter((t) => t !== "");
  if (arr.length > 0 && !isNaN(arr[arr.length - 1])) {
    arr.pop();
  }
  return "/" + arr.join("/") + "/";
};

module.exports.rps = rps;
module.exports.latency = latency;
module.exports.deleteResource = deleteResource;

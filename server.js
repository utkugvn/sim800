const http = require("http");
const PORT = 3000;

const server = http.createServer((req, res) => {

  if (req.method === "POST" && (req.url === "/gsm" || req.url === "/temperature")) {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      console.log("=================================");
      console.log("Received data from GSM:");
      console.log(body);
      console.log("=================================");

      const responseBody = "OK\n";

      res.writeHead(200, {
        "Content-Type": "text/plain",
        "Content-Length": Buffer.byteLength(responseBody),
        "Connection": "close"
      });

      res.end(responseBody);
    });

    return;
  }

  if (req.method === "GET" && req.url === "/") {
    const msg = "Gateway is running\n";
    res.writeHead(200, {
      "Content-Type": "text/plain",
      "Content-Length": Buffer.byteLength(msg),
      "Connection": "close"
    });
    res.end(msg);
    return;
  }

  res.writeHead(404, {
    "Content-Type": "text/plain",
    "Connection": "close"
  });
  res.end("Not Found\n");
});

server.listen(PORT, () => {
  console.log(`Gateway listening on port ${PORT}`);
});

/* eslint-disable no-console */
"use strict";

const http = require("node:http");
const fs = require("fs");

function createServer() {
  return http.createServer((req, res) => {
    if (req.url.includes("../")) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Invalid path");

      return;
    }

    if (!req.url.startsWith("/file/")) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hint: Routes must start with /file/");

      return;
    }

    if (req.url.includes("//")) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Path has duplicated slashes");

      return;
    }

    const fileName = req.url.replace("/file/", "") || "index.html";

    fs.readFile(`./public/${fileName}`, (err, data) => {
      if (!err) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Non-existent file");
      }
    });
  });
}

module.exports = {
  createServer,
};

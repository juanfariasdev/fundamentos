import http from "node:http";
import { ParseRequestBody } from "./middleware/parseRequestBody.js";
import { Routes } from "./routes.js";

// GET, POST, PUT, PATCH, DELETE

// GET => get a information
// POST => Create a information in back-end
// PUT => Update a resource in back-end
// PATCH => Update a resource-specific information in the back-end
// DELETE => Delete a resource in back-end

// Stateful => They are only to save data in memory
// Stateless => Save data on external media

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await ParseRequestBody(req, res);

  const route = Routes.find(
    (route) => route.method === method && route.path === url
  );
  if (route) {
    return route.handler(req, res);
  }
  return res.writeHead(404).end();
});

server.listen(3333);

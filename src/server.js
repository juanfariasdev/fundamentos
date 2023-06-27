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

// Query Parameters: stateful = http://localhost:3334/users?userId=1&name=Juan => filters and paginations
// Route Parameters: http://localhost:3334/users/1 => Identification from resource
// Request Body: POST http://localhost:3334/users => Send information using body => forms

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await ParseRequestBody(req, res);

  const route = Routes.find(
    (route) => route.method === method && route.path.test(url)
  );
  if (route) {
    const routeParams = req.url.match(route.path);

    req.params = { ...routeParams.groups };

    return route.handler(req, res);
  }
  return res.writeHead(404).end();
});

server.listen(3333);

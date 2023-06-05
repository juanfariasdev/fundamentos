import http from "node:http";
import { ParseRequestBody } from "./middleware/parseRequestBody.js";

// GET, POST, PUT, PATCH, DELETE

// GET => get a information
// POST => Create a information in back-end
// PUT => Update a resource in back-end
// PATCH => Update a resource-specific information in the back-end
// DELETE => Delete a resource in back-end

// Stateful => They are only to save data in memory
// Stateless => Save data on external media

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await ParseRequestBody(req, res);

  if (method === "GET" && url === "/users") {
    return res.end(JSON.stringify(users));
  }
  if (method === "POST" && url === "/users") {
    if (req.body) {
      const { name, email, age } = req.body;

      if (name && email && age) {
        const user = {
          id: 1,
          name,
          age,
          email,
        };
        users.push(user);

        return res.writeHead(201).end();
      }
    }
    return res.writeHead(400).end("Error from register");
  }

  return res.writeHead(404).end();
});

server.listen(3333);

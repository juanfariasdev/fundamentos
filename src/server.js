import http from "node:http";

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
  const buffers = [];

  for await (const chunck of req) {
    buffers.push(chunck);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  if (method === "GET" && url === "/users") {
    return res
      .setHeader("Content-type", "application/json")
      .end(JSON.stringify(users));
  }
  if (method === "POST" && url === "/users") {
    if (req.body) {
      const { name, email, age } = req.body;
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

  return res.writeHead(404).end();
});

server.listen(3333);

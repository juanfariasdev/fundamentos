import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";
const database = new Database();
export const Routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { search } = req.query;
      const users = database.select(
        "users",
        search && {
          name: search,
          email: search,
        }
      );

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      if (req.body) {
        const { name, email, age } = req.body;

        if (name && email && age) {
          const user = {
            name,
            age,
            email,
          };
          database.insert("users", user);

          return res.writeHead(201).end();
        }
      }
      return res.writeHead(400).end("Error from register");
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete("users", id);

      res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { name, age, email } = req.body;

      database.update("users", id, { name, age, email });

      res.writeHead(202).end();
    },
  },
];
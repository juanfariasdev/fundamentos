import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";

const dbname = "../db.json";
const databasePath = new URL(dbname, import.meta.url);
export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf8")
      .then((file) => {
        this.#database = JSON.parse(file);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table] ?? [];

    return data;
  }

  insert(table, data) {
    data = { id: randomUUID(), ...data };
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }
}

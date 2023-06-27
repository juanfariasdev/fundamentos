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
  delete(table, id) {
    const rowIdx = this.#database[table].findIndex((row) => row.id === id);

    if (rowIdx > -1) {
      this.#database[table].splice(rowIdx, 1);
      this.#persist();
    }
  }
  update(table, id, data) {
    const rowIdx = this.#database[table].findIndex((row) => row.id === id);

    if (rowIdx > -1) {
      this.#database[table][rowIdx] = { id, ...data };

      this.#persist();
    }
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

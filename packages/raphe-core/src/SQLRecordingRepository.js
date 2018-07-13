import sqlite3 from "sqlite3";

export default class SQLRecordingRepository {
  constructor(dbPath) {
    this.db = new sqlite3.Database(dbPath);
    this.createTable();
  }

  async create({ name, args, result }) {
    this.db.serialize(() => {
      const params = {
        $name: name,
        $args: JSON.stringify(args),
        $result: JSON.stringify(result)
      };
      this.db.run(
        "INSERT INTO recordings (name, args, result) VALUES ($name, $args, $result);",
        params,
        err => {
          if (err) throw err;
        }
      );
    });
  }

  async getAll(name) {
    return new Promise((resolve, reject) => {
      const whereQuery = name ? "WHERE name = ?" : "";
      this.db.all(
        `SELECT id, name, args, result FROM recordings ${whereQuery}`,
        name,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(
              rows.map(row => ({
                id: row.id,
                name: row.name,
                args: JSON.parse(row.args),
                result: JSON.parse(row.result)
              }))
            );
          }
        }
      );
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      this.db.run("DELETE FROM recordings WHERE id = ?", id, err => {
        if (err) { 
          reject(err)
        } else {
          resolve()
        };
      });
    })
  }

  async deleteAll(name) {
    this.db.serialize(() => {
      this.db.run("DELETE FROM recordings WHERE name = ?", name, err => {
        if (err) throw err;
      });
    });
  }

  createTable() {
    this.db.serialize(() => {
      this.db.run(`
        CREATE TABLE IF NOT EXISTS recordings (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT, 
          args BLOB, 
          result BLOB
        )`);
    });
  }
}

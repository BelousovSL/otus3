const db = require("../db");
const { latency, rps, deleteResource } = require("../prom");

class UserController {
  async createUser(req, res) {
    const endLate = latency.startTimer({ method: req.method, endpoint: req.path });
    try {
      const { name, surname } = req.body;
      const newPerson = await db.query("INSERT INTO persons (name, surname) VALUES ($1, $2) RETURNING *", [name, surname]);
      res.status(200).json(newPerson.rows[0]);
    } catch (ex) {
      res.status(500).end("Error");
    }
    rps.labels({ method: req.method, endpoint: req.path, http_status: res.statusCode }).inc();
    endLate({ method: req.method, endpoint: req.path });
  }

  async getUsers(req, res) {
    const endLate = latency.startTimer({ method: req.method, endpoint: req.path });
    try {
      const users = await db.query("SELECT * FROM persons");
      res.status(200).json(users.rows);
    } catch (ex) {
      res.status(500).end("Error");
    }
    rps.labels({ method: req.method, endpoint: req.path, http_status: res.statusCode }).inc();
    endLate({ method: req.method, endpoint: req.path });
  }

  async getOnUser(req, res) {
    const endLate = latency.startTimer({ method: req.method, endpoint: deleteResource(req.path) });
    try {
      const id = req.params.id;
      const user = await db.query("SELECT * FROM persons where id=$1", [id]);
      res.status(200).json(user.rows[0]);
    } catch (ex) {
      res.status(500).end("Error");
    }
    rps.labels({ method: req.method, endpoint: deleteResource(req.path), http_status: res.statusCode }).inc();
    endLate({ method: req.method, endpoint: deleteResource(req.path) });
  }

  async updateUser(req, res) {
    const endLate = latency.startTimer({ method: req.method, endpoint: deleteResource(req.path) });
    try {
      const { id, name, surname } = req.body;
      const newPerson = await db.query("UPDATE persons SET name=$1, surname=$2 WHERE id=$3 RETURNING *", [name, surname, id]);
      res.status(200).json(newPerson.rows[0]);
    } catch (ex) {
      res.status(500).end("Error");
    }
    rps.labels({ method: req.method, endpoint: deleteResource(req.path), http_status: res.statusCode }).inc();
    endLate({ method: req.method, endpoint: deleteResource(req.path) });
  }

  async deleteUser(req, res) {
    const endLate = latency.startTimer({ method: req.method, endpoint: deleteResource(req.path) });
    try {
      const id = req.params.id;
      const user = await db.query("DELETE FROM persons where id=$1", [id]);
      res.status(200).json(user.rows[0]);
    } catch (ex) {
      res.status(500).end("Error");
    }
    rps.labels({ method: req.method, endpoint: deleteResource(req.path), http_status: res.statusCode }).inc();
    endLate({ method: req.method, endpoint: deleteResource(req.path) });
  }
}

module.exports = new UserController();

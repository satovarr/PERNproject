import pg from "pg";
import { PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT } from "../config.mjs";

const pool = new pg.Pool({
  user: PGUSER,
  host: PGHOST,
  password: PGPASSWORD,
  database: PGDATABASE,
  port: PGPORT,
  ssl: {
    rejectUnauthorized: false, // For development only; in production, you should have a valid SSL certificate
  },
});
pool.on("connect", (client) => {
  console.log("Connection to SQL sucessful!");
});
pool.on("error", (err, client) => {
  console.error(err);
  console.log(client);
});

export async function getUser(req, res, next) {
  try {
    console.log("GET /me");
    const { rows: data } = await pool.query("SELECT * from users");
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function createUser(req, res, next) {
  try {
    console.log("POST /me");
    const { username, email, role_id, oauth_id } = req.body;
    const result = await pool.query(
      "INSERT INTO users (username, email, role_id, oauth_id) VALUES ($1, $2, $3, $4)",
      [username, email, role_id, oauth_id]
    );
    const data = {
      username,
      email,
      role_id,
      oauth_id,
    };
    if (result.rowCount === 1) return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req, res, next) {
  try {
    console.log("PUT /me");
    const oauth_id = req.params.oauth_id;
    const { username, email } = req.body;
    const result = await pool.query(
      "UPDATE users SET username=$1, email = $2 WHERE oauth_id = $3",
      [username, email, oauth_id]
    );
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    console.log("DELETE /me");
    req.user = { oauth_id: "test_also" };
    const oauth_id = req.user.oauth_id;
    const result = await pool.query("DELETE FROM users WHERE oauth_id = $1", [oauth_id]);
    if (result.rowCount === 1) return res.sendStatus(204);
    else return res.sendStatus(404);
  } catch (error) {
    next(error);
  }
}

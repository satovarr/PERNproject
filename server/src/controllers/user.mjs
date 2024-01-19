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

const getUsers = async () => {
  try {
    console.log("GET all users");
    const result = await pool.query("SELECT * FROM users");
    const { rows: users } = result;
    console.log(users)
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUser = async (parent, args) => {
  try {
    console.log("GET user");
    const { oauth_id } = args;
    const { rows: user } = await pool.query(
      "SELECT * FROM users WHERE oauth_id = $1",
      [oauth_id]
    );
    return user[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (parent, args) => {
  try {
    console.log("PUT update user");
    const { oauth_id, username, email } = args;
    await pool.query(
      "UPDATE users SET username = $1, email = $2 WHERE oauth_id = $3",
      [username, email, oauth_id]
    );
    return { oauth_id, username, email };
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async (parent, args) => {
  try {
    console.log("DELETE user");
    const { oauth_id } = args;
    const result = await pool.query("DELETE FROM users WHERE oauth_id = $1", [
      oauth_id,
    ]);
    if (result.rowCount === 1) return { message: "User deleted successfully" };
    else return { message: "User not found" };
  } catch (error) {
    throw new Error(error.message);
  }
};

const createUser = async (parent, args) => {
  try {
    console.log("POST add user");
    const { username, email, oauth_id, role_id } = args;
    const { rows: user } = await pool.query(
      "INSERT INTO users (username, email, oauth_id, role_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, email, oauth_id, role_id]
    );
    return user[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

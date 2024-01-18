import dotenv from 'dotenv';
dotenv.config()

const PORT = process.env.PORT || 8001;

const PGUSER = process.env.PGUSER;
const PGHOST = process.env.PGHOST;
const PGPASSWORD = process.env.PGPASSWORD;
const PGDATABASE = process.env.PGDATABASE;
const PGPORT = process.env.PGPORT;

export {PORT, PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT};
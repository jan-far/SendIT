const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DEV_DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});

pool.on('connect', () => {
  console.log('connected to db');
});

const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        phone VARCHAR(128) NOT NULL,
        location VARCHAR(128) NOT NULL,
        role integer NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end(() => {});
    })
    .catch((err) => {
      console.log(err);
      pool.end(() => {});
    });
};

const createParcelTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS 
          parcels(
              id UUID PRIMARY KEY,
              email TEXT NOT NULL,
              weight TEXT NOT NULL,
              destination TEXT NOT NULL,
              phone TEXT NOT NULL,
              owner_id UUID NOT NULL,
              status TEXT NOT NULL,
              location TEXT NOT NULL,
              created_date TIMESTAMP,
              modified_date TIMESTAMP,
              FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
          )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end(() => {});
    })
    .catch((err) => {
      console.log(err);
      pool.end(() => {});
    });
};

const dropParcelTable = () => {
  const queryText = 'DROP TABLE IF EXISTS parcels ';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end(() => {});
    })
    .catch((err) => {
      console.log(err);
      pool.end(() => {});
    });
};

const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users ';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end(() => {});
    })
    .catch((err) => {
      console.log(err);
      pool.end(() => {});
    });
};

const createAllTables = () => {
  createUserTable();
  createParcelTable();
};

const dropAllTables = () => {
  dropParcelTable();
  dropUserTable();
};

module.exports = {
  createParcelTable,
  createUserTable,
  createAllTables,
  dropParcelTable,
  dropUserTable,
  dropAllTables,
};

require('make-runnable');

import knex from "knex";

const db = knex({
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING,
  pool: {
    min: 0,
    max: 7,
    afterCreate: (conn, done) => {
      console.log("Connection Established.");
      done();
    },
  },
});

export { db };

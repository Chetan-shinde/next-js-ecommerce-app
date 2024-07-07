import knex from "knex";
let connection;

export const getDatabaseConnector = () => {
  return () => {
    connection = knex({
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
    return connection;
  };
};

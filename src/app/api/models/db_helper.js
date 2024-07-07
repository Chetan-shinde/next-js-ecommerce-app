let db;

export const setDB = (requestdb) => {
  if (db) {
    return db;
  }
  db = requestdb;
  return db;
};

export const getDB = () => {
  console.log(`db is ${db}`);
  return db;
};

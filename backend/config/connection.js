const { MongoClient } = require("mongodb");
require("dotenv").config();

const state = {
  db: null,
};

module.exports.connect = (done) => {
  const uri = process.env["DB_URI"];
  const dbName = process.env["DB_NAME"];
  const client = new MongoClient(uri);
  client.connect();
  state.db = client.db(dbName);
};

module.exports.get = () => {
  return state.db;
};

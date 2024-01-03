const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const dotenv = require("dotenv");
dotenv.config();

let db;

const mongoConnector = () => {
  mongoClient
    .connect(process.env.MONGO_URL)
    .then((result) => {
      console.log("connected to mongodb");
      db = result.db();
      console.log(result);
    })
    .catch((err) => console.log(err));
};

const getDatabase = () => {
  if (db) {
    return db;
  } else {
    throw "No Databse";
  }
};

module.exports = { mongoConnector, getDatabase };

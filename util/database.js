const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const dotenv = require("dotenv");
dotenv.config();

const mongoConnector = () => {
  mongoClient
    .connect(process.env.MONGO_URL)
    .then((result) => {
      console.log("connected to mongodb");
      console.log(result);
    })
    .catch((err) => console.log(err));
};
module.exports = mongoConnector;

const { MongoClient } = require('mongodb');

require('dotenv').config();

const URI = `${[process.env.MONGO_URI]}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(URI);

let connection;

(async function connectToMongoDB() {
  if (connection) {
    return connection;
  }

  try {
    await client.connect();
    connection = client.db();
    console.log('Connected to MongoDB');

    return connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
})();

module.exports = client;

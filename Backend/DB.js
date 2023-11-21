const mongoose = require('mongoose');
const mongoURL = "";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log('connected to mongoose');
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectToMongo;

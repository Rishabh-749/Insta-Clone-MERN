const mongoose = require("mongoose");

const connectToDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB")
}

module.exports = connectToDB;
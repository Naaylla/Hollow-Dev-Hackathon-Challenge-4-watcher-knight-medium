const mongoose = require("mongoose")

async function connectToDB(url) {
    await mongoose.connect(url, {
        dbname: "backend",
    }
    )

    console.log("connected to the database")
}

module.exports = connectToDB;
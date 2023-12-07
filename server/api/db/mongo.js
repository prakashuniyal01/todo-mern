const mongoose = require('mongoose');
const { LOGGER } = require('../../common/logger')

const mongodb_connection = async () => {
    const URL = process.env.MONGO_URI;
    mongoose.connect(URL).then(() => {
        LOGGER.info("MongoDB Connected Successfully");
    }).catch(err =>{
        console.error(`Error Connecting to MongoDB: ${err}`);
        process.exit(1);
    })
}

module.exports = { mongodb_connection }
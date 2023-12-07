require('dotenv').config();

const {app} = require('./api/app');
const { LOGGER } = require('./common/logger')
const { mongodb_connection } = require('./api/db/mongo')

const PORT = process.env.PORT;

mongodb_connection();


app.listen(PORT, ()=>[
    LOGGER.info(`Server is running on port ${PORT}`),
])
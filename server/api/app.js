const express = require("express");
const morgan = require('morgan');
const cors = require('cors')
const {rateLimit } = require('express-rate-limit');

const { appRouter } = require('./routes');
const {logErrors, clientErrorHandler, errorHandler} = require('../common/error')





const app = express();
const apiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // limit each IP to 100 requests per 'windows'
    standardHeaders: 'draft-7', // set `rateLimit` amd rateLimit policy header;;
    legacyHeaders: false, // Disable the X-ratelimit-* header
})


// Apply the ate limiting middleware to API calls only

app.use(express.json()); // deserialization
app.use(cors());
app.use(morgan('combined')) // ragister entry.

app.use('/api', apiRateLimiter); // rate limiting
app.use('/api', appRouter) // health routes 


/**
 * always at the end!
 */

app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

module.exports = {app};
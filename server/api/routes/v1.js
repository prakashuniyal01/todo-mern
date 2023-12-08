const {Router} = require('express');
const { taskRouter } = require('../model/todo/routes');


const v1Router = Router();

v1Router.use('/tasks', taskRouter);
module.exports = {v1Router};
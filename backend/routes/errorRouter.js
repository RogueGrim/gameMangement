const { Router } = require('express')
const errorController = require('../controller/errorController') 

const errorRouter = Router()

errorRouter.use(errorController.handleError)


module.exports = errorRouter
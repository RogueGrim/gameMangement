const { Router } = require('express')
const Controller = require('../controller/categoriesController')

const categoriesRouter = Router()

categoriesRouter.get('/', Controller.getByCategories)

module.exports = categoriesRouter 
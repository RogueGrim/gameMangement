const { Router } = require('express')
const Controller = require('../controller/controller.js') 

const router = Router()

router.get('/', Controller.getAllItems)
router.get('/categories', Controller.getByCategories)

module.exports = router
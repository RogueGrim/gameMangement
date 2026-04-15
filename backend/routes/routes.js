const { Router } = require('express')
const Controller = require('../controller/controller.js') 

const router = Router()

router.get('/', Controller.getAllItems)
router.get('/categories', Controller.getByCategories)
router.get('/management', Controller.editItems)

router.get('/management/delete/:id', Controller.deleteEntry)

module.exports = router
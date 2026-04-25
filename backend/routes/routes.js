const { Router } = require('express')
const Controller = require('../controller/controller.js') 

const router = Router()

router.get('/', Controller.getAllItems)
router.get('/categories', Controller.getByCategories)
router.get('/management', Controller.editItems)

router.get('/management/delete/:id', Controller.deleteEntry)

router.get('/management/edit/:id', Controller.editEntry)
router.post('/management/edit/:id', Controller.updateEntry)

router.get('/management/addGame', Controller.addGame)
router.post('/management/addGame', Controller.handleGameData)

router.get('/management/addDev', Controller.addDev)
router.post('/management/addDev', Controller.handleDevData)

router.get('/management/addGenre', Controller.addGenre)
router.post('/management/addGenre', Controller.handleGenreData)



module.exports = router
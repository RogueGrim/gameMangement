const { Router } = require('express')
const Controller = require('../controller/controller.js') 

const router = Router()

router.get('/', Controller.getAllItems)
router.get('/categories', Controller.getByCategories)
router.get('/management', Controller.editItems)

router.get('/management/editDev/:id', Controller.editDev)
router.post('/management/editDev/:id', Controller.updateDev)
router.get('/management/deleteDev/:id', Controller.deleteDevEntry)

router.get('/management/editGenre/:id',Controller.editGenre)
router.post('/management/editGenre/:id',Controller.updateGenre)
router.get('/management/deleteGenre/:id',Controller.deleteGenreEntry)

router.get('/management/addGame', Controller.addGame)
router.post('/management/addGame/:id', Controller.handleGameData)

router.get('/management/addDev', Controller.addDev)
router.post('/management/addDev', Controller.handleDevData)

router.get('/management/addGenre/:id', Controller.addGenre)
router.post('/management/addGenre/:id', Controller.handleGenreData)



module.exports = router
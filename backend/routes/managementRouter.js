const { Router } = require('express')

const addController = require('../controller/addController')
const editController = require('../controller/editController') 
const deleteController = require('../controller/deleteController')

const managementRouter = Router()

managementRouter.get('/', editController.editItems)

managementRouter.get('/addDev', addController.addDev)
managementRouter.post('/addDev', addController.handleDevData)

managementRouter.get('/editDev/:id', editController.editDev)
managementRouter.post('/editDev/:id', editController.updateDev)

managementRouter.post('/deleteDev/:id', deleteController.deleteDevEntry)

managementRouter.get('/addGenre', addController.addGenre)
managementRouter.post('/addGenre', addController.handleGenreData)

managementRouter.get('/editGenre/:id',editController.editGenre)
managementRouter.post('/editGenre/:id',editController.updateGenre)

managementRouter.post('/deleteGenre/:id',deleteController.deleteGenreEntry)


managementRouter.get('/addGame', addController.addGame)
managementRouter.post('/addGame', addController.handleGameData)

managementRouter.get('/editGame/:id', editController.editGame)
managementRouter.post('/editGame/:id', editController.updateGame)

managementRouter.post('/deleteGame/:id', deleteController.deleteGameEntry)


module.exports = managementRouter
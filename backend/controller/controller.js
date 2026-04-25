const db = require('../db/queries')

//function to render the index and provide data to index
async function getAllItems(req, res) {
    const data = await db.getAllEntries()
    res.render('index',{title: 'Game Management App', data: data})
}

//function to render the categoies page and provide data to categories
async function getByCategories(req, res) {
    const data = await db.getGenreCount()
    res.render('categories',{data: data})
}

//function to render the items on manage inventory page
async function editItems(req, res) {
    const game_Data  = await db.getGameInfo()
    const dev_Data = await db.getDevInfo()
    const genre_Data = await db.getGenreInfo()
    res.render('manageInventory',{gameData: game_Data, devData: dev_Data, genreData: genre_Data })
}
//function to delete an entry from the inventory page
async function deleteEntry(req, res) {
    const id = req.params.id
    await db.deleteRow(id)
    res.redirect('/management')
}

//function to give data to form on edit page
 async function editEntry(req, res) {
    const id = req.params.id
    const  item  = await db.getRow(id)
    res.render('editForm',{item: item[0]})
}

//function to update the entry on edit page
 async function updateEntry(req, res) {
    const data = req.body
    const id = req.params.id
    await db.updateRow(id,data)
    res.redirect('/management')
}

//function to render a new form page and post data for game information
function addGame(req, res) {
    res.render('addGameForm')
}

//function to pass data to add new game
async function handleGameData(req, res) {
    const name = req.body.game_name
    await db.addNewGame(name)
    res.redirect('/management')
}
//function to render a new form page for Developer Information
function addDev(req, res) {
    res.render('addDevForm')
}
//function to pass data to add new developer
async function handleDevData(req, res) {
    const name = req.body.dev_name
    await db.addNewDev(name)
    res.redirect('/management')
}
//function to render a new form page and post data for new genre
function addGenre(req, res) {
    res.render('addGenreForm')
}

//function to pass data to add new genre
async function handleGenreData(req, res) {
    const genre = req.body.genre
    await db.addNewGenre(genre)
    res.redirect('/management')
}

module.exports = { 
    getAllItems,
    getByCategories,
    editItems,
    deleteEntry,
    editEntry,
    updateEntry,
    addGame,
    addDev,
    addGenre,
    handleDevData,
    handleGenreData,
    handleGameData
}
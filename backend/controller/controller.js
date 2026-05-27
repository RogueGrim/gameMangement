const db = require('../db/queries')

//function to render the index and provide data to index
async function getAllItems(req, res) {
    const data = await db.getAllEntries()
    res.render('index',{title: 'Game Management App', data: data})
}

//function to render the categoies page and provide data to categories
async function getByCategories(req, res) {
    const countData = await db.getGenreCount()
    const sortByGenre = await db.getGameByGenre()
    const sortByDev = await db.getGameByDev()
    res.render('categories',{sortByDev: sortByDev, sortByGenre: sortByGenre})
}

//function to render the items on manage inventory page
async function editItems(req, res) {
    const game_Data  = await db.getAllEntries()
    const dev_Data = await db.getDevInfo()
    const genre_Data = await db.getGenreInfo()
    res.render('manageInventory',{Data: game_Data, devData: dev_Data, genreData: genre_Data })
}

//function to delete a game entry from the inventory page
async function deleteGameEntry(req, res) {
    const id = req.params.id
    await db.deleteGame(id)
    res.redirect('/management')
}

//function to delete dev entry
async function deleteDevEntry(req, res, next) {
    const id = req.params.id
    try{
        await db.deleteDev(id,false)
        res.redirect('/management')
    }catch (err){
        next(err)
    }
    
}

//function to delete genre entry
async function deleteGenreEntry(req, res, next) {
    const id = req.params.id

    try{
        await db.deleteGenre(id, false)
        res.redirect('/management')
    }catch (err){
        next(err)
    }
}


//function to give data to form on edit page
async function editGame(req, res) {   
    const id = req.params.id
    const { gameData, devData, genreData } = await db.getGameRow(id)
    const genreInfo = await db.getGenreInfo()
    const devInfo = await db.getDevInfo()

    res.render('editGame',{
        gameData: gameData.rows[0], 
        genreData: genreData.rows[0], 
        devData: devData.rows[0], 
        devInfo: devInfo, 
        genreInfo: genreInfo
    })
}

//function to update the entry in game table
async function updateGame(req, res) {
    const id = req.params.id
    const data = req.body
    await db.updateGameEntry(id,data)
    res.redirect('/management')
}
//function to give data to form on edit page
 async function editDev(req, res) {
    const id = req.params.id
    const  item  = await db.getDevRow(id)
    res.render('editDev',{item: item[0]})
}

//function to update the entry on edit page
 async function updateDev(req, res) {
    const data = req.body
    const id = req.params.id
    await db.updateDevEntry(id,data)
    res.redirect('/management')
}

//function to get details from db and pass it to edit page
async function editGenre(req, res) {
    const id = req.params.id
    const item = await db.getGenreRow(id)
    res.render('editGenre',{item: item[0]})
}

//function to update the entry on edit page
async function updateGenre(req, res) {
    const data = req.body
    const id = req.params.id
    await db.updateGenreEntry(id,data)
    res.redirect('/management')
}

//function to render a new form page and post data for game information
async function addGame(req, res) {
    const genredata = await db.getGenreInfo() //pass genre information 
    const devData = await db.getDevInfo() // pass dev information
    const genreInfo = await db.getGenreEntry() //get all genres related to game

    res.render('addGameForm',{genre:genredata, dev: devData, genre_info: genreInfo})
}

//function to pass data to add new game
async function handleGameData(req, res) {
    const data = req.body
    await db.addNewGame(data)
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

//function to handle all errors
function handleError(err, req, res, next) {
    res.render('ErrorPage',{errorMessage: err.message})
    res.status(500)
}

module.exports = { 
    getAllItems,
    getByCategories,
    editItems,
    editGame,
    updateGame,
    deleteGameEntry,
    editDev,
    updateDev,
    deleteDevEntry,
    editGenre,
    updateGenre,
    deleteGenreEntry,
    addGame,
    addDev,
    addGenre,
    handleDevData,
    handleGenreData,
    handleGameData,
    handleError
}
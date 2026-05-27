const editDB = require('../db/queries/editQueries')
const indexDB = require('../db/queries/indexQueries')

//function to render the items on manage inventory page
async function editItems(req, res) {
    const game_Data  = await indexDB.getAllEntries()
    const dev_Data = await indexDB.getDevInfo()
    const genre_Data = await indexDB.getGenreInfo()
    res.render('manageInventory',{Data: game_Data, devData: dev_Data, genreData: genre_Data })
}

//function to give data to form on edit page
async function editGame(req, res) {   
    const id = req.params.id
    const { gameData, devData, genreData } = await indexDB.getGameRow(id)
    const genreInfo = await indexDB.getGenreInfo()
    const devInfo = await indexDB.getDevInfo()

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
    await editDB.updateGameEntry(id,data)
    res.redirect('/management')
}

//function to give data to form on edit page
 async function editDev(req, res) {
    const id = req.params.id
    const  item  = await indexDB.getDevRow(id)
    res.render('editDev',{item: item[0]})
}

//function to update the entry on edit page
 async function updateDev(req, res) {
    const data = req.body
    const id = req.params.id
    await editDB.updateDevEntry(id,data)
    res.redirect('/management')
}

//function to get details from db and pass it to edit page
async function editGenre(req, res) {
    const id = req.params.id
    const item = await indexDB.getGenreRow(id)
    res.render('editGenre',{item: item[0]})
}

//function to update the entry on edit page
async function updateGenre(req, res) {
    const data = req.body
    const id = req.params.id
    await editDB.updateGenreEntry(id,data)
    res.redirect('/management')
}

module.exports = {
    editGame,
    editDev,
    editGenre,
    updateGame,
    updateDev,
    updateGenre,
    editItems
}
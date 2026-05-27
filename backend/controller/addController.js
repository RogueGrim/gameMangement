const db = require('../db/queries/addQueries')

//function to render a new form page and post data for game information
async function addGame(req, res) {
    const genredata = await db.getGenreInfo() //pass genre information 
    const devData = await db.getDevInfo() // pass dev information
    
    res.render('addGameForm',{genre:genredata, dev: devData})
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

module.exports = {
    addGame,
    addDev,
    addGenre,
    handleGameData,
    handleDevData,
    handleGenreData
}
const db = require('../db/queries/deleteQueries')

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

module.exports = {
    deleteDevEntry,
    deleteGameEntry,
    deleteGenreEntry
}
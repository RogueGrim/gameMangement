const db = require('../db/queries/indexQueries')

//function to render the items on manage inventory page
async function editItems(req, res) {
    const game_Data  = await db.getAllEntries()
    const dev_Data = await db.getDevInfo()
    const genre_Data = await db.getGenreInfo()
    res.render('manageInventory',{Data: game_Data, devData: dev_Data, genreData: genre_Data })
}

module.exports = {
    editItems
}
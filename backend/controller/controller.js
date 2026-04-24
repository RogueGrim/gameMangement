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
    const data  = await db.getAllEntries()
    res.render('manageInventory',{items: data})
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

//fucnction to render a new form page and post data for game information
async function addGame(req, res) {
    res.render('addGameForm')
}
//fucnction to render a new form page and post data for developer information
async function addDev(req, res) {
    res.render('addDevForm')
}
//fucnction to render a new form page and post data for new genre
async function addGenre(req, res) {
    res.render('addGenreForm')
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
    addGenre
}
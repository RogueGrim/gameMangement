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

async function editItems(req, res) {
    const data  = await db.getAllEntries()
    res.render('manageInventory',{items: data})
}

module.exports = { 
    getAllItems,
    getByCategories,
    editItems
}
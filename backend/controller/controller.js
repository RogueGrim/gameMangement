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

//function to gove data to form on edit page
 async function editEntry(req, res) {
    const id = req.params.id
    const  item  = await db.getRow(id)
    console.log(item)
    res.render('editForm',{item: item[0]})
 }

module.exports = { 
    getAllItems,
    getByCategories,
    editItems,
    deleteEntry,
    editEntry
}
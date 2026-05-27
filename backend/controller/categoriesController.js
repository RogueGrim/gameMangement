const db = require('../db/queries/categoriesQueries')


//function to render the categoies page and provide data to categories
async function getByCategories(req, res) {
    const sortByGenre = await db.getGameByGenre()
    const sortByDev = await db.getGameByDev()
    res.render('categories',{sortByDev: sortByDev, sortByGenre: sortByGenre})
}

module.exports = {
    getByCategories
}
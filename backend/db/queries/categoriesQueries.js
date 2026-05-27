const pool = require("../pool")

//function to get all games by all the genres
async function getGameByGenre() {
    const SQL = `
        SELECT genre, ARRAY_AGG(game_name) AS game_names FROM genre_info 
        JOIN genre ON genre.genre_id = genre_info.genre_id 
        JOIN game_info ON genre_info.game_id = game_info.game_id
        GROUP BY genre;
    `

    const { rows } = await pool.query(SQL)
    return rows
}

//function to get all games by all the developers
async function getGameByDev() {
    const SQL = `
        SELECT dev_name, ARRAY_AGG(game_name) AS game_names FROM dev_info 
        JOIN data ON data.dev_id = dev_info.dev_id 
        JOIN game_info ON data.game_id = game_info.game_id
        GROUP BY dev_name;
    `
    const { rows } = await pool.query(SQL)
    return rows
}

async function getGameRow(id) {
    const gameInfo = `
        SELECT * FROM game_info
        WHERE game_id = $1;
    `
    const devInfo = `
        SELECT dev_info.dev_id, dev_name FROM dev_info
        JOIN data on dev_info.dev_id = data.dev_id
        WHERE game_id = $1;
    `
    const genreInfo = `
        SELECT ARRAY_AGG(genre_info.genre_id) AS genres_id FROM genre_info
        JOIN genre ON genre_info.genre_id = genre.genre_id
        WHERE game_id = $1;
    `
    const gameData = await pool.query(gameInfo,[id])
    const devData = await pool.query(devInfo,[id])
    const genreData = await pool.query(genreInfo,[id])
    

    return { gameData, devData, genreData }
}

//function to get details from dev_info table
async function getDevRow(id) {
    const SQL = `
        SELECT * FROM dev_info
        WHERE dev_id = $1;
    `
    const { rows } = await pool.query(SQL,[id])
    return rows
}

//function to get details from genre table
async function getGenreRow(id) {
    const SQL = `
        SELECT * FROM genre
        WHERE genre_id = $1;
    `
    const { rows } = await pool.query(SQL,[id])
    return rows
}

module.exports = {
    getGameByDev,
    getGameByGenre,
    getGameRow,
    getDevRow,
    getGenreRow
}

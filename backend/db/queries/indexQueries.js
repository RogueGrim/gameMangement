const pool = require('../pool');

//function to get all entries from database
async function getAllEntries() {
    const SQL = `
        SELECT id, data.game_id, data.dev_id, game_name, dev_name, 
        ARRAY_AGG(genre.genre) AS genres,
        ARRAY_AGG(genre.genre_id) AS genres_id FROM data 
        JOIN game_info ON data.game_id = game_info.game_id 
        JOIN dev_info ON data.dev_id = dev_info.dev_id
        JOIN genre_info ON data.game_id = genre_info.game_id
        JOIN genre ON genre_info.genre_id = genre.genre_id
        GROUP BY id, data.game_id, data.dev_id, game_name, dev_name;
    `
    const { rows } = await pool.query(SQL)
    return rows
}

//function to get all game entries from game_info table
async function getGameInfo() {
    const { rows } =  await pool.query('SELECT * FROM game_info')
    return rows
}

//function to get all developer entries from dev_info table
async function getDevInfo() {
    const { rows } = await pool.query('SELECT * FROM dev_info')
    return rows
}

//function to get all genre entries from genre table
async function getGenreInfo() {
    const { rows } = await pool.query('SELECT * FROM genre')
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
    getAllEntries,
    getGameInfo,
    getDevInfo,
    getGenreInfo,
    getGameRow,
    getDevRow,
    getGenreRow
}
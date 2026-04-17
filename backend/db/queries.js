const pool = require('./pool')

//fucntion to get all entries from database
async function getAllEntries() {
    const SQL = `
        select id, game_name, genre, dev_name from data 
        join game_info on data.game_id = game_info.game_id 
        join dev_info on data.dev_id = dev_info.dev_id;
    `
    const { rows } = await pool.query(SQL)
    return rows
}

//function to get a specific row
async function getRow(id) {
    const SQL = `
        SELECT id, game_name, data.game_id, genre, dev_name, data.dev_id FROM data
        JOIN game_info ON data.game_id = game_info.game_id
        JOIN dev_info ON data.dev_id = dev_info.dev_id
        WHERE id = $1
    `
    const { rows } = await pool.query(SQL,[id])
    return rows
}

//function to get the genre and count of each game in that genre
async function getGenreCount() {
    const SQL = `
        SELECT genre, COUNT(genre) as count from game_info
        GROUP BY genre;
    `    
    const { rows } = await pool.query(SQL)
    return rows
}

//function to get the developers and  count of each game by that developer
async function getDevCount() {
    const SQL = `
        SELECT dev_name, COUNT(game_name) AS count FROM data
        JOIN dev_info ON data.dev_id = dev_info.dev_id
        JOIN game_info ON data.game_id = game_info.game_id
        GROUP BY dev_name;
    `
    const { rows } = await pool.query(SQL)
    return rows
}

async function deleteRow(id) {

    const { rows }  = await pool.query(`SELECT game_id from data WHERE id = $1`,[id])
    const gameID = rows[0].game_id.toUpperCase()

    await pool.query(`DELETE FROM data WHERE id = $1;`,[id])
    await pool.query(`DELETE FROM game_info WHERE game_id = $1;`,[gameID])
    console.log('Deleted')
}

module.exports = {
    getAllEntries,
    getRow,
    getGenreCount,
    getDevCount,
    deleteRow,
}
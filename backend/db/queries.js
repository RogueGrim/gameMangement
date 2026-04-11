const pool = require('./pool')

//fucntion to get all entries from database
async function getAllEntries() {

    const SQL = `
        select game_name, genre, dev_name from data 
        join game_info on data.game_id = game_info.game_id 
        join dev_info on data.dev_id = dev_info.dev_id;
    `
    const { rows } = await pool.query(SQL)
    return rows
}

module.exports = {
    getAllEntries
}
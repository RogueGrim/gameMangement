const pool = require('../pool')

//function to update game entry, dev relation and genre relaion
async function updateGameEntry(id,data) {

    const { game_name, genres, dev_id} = data
    const genreList = Array.isArray(genres) ? genres : genres ? [genres] : []

    const DeleteGenre = `
        DELETE FROM genre_info
        WHERE game_id = $1;
    `

    const insertGenre = `
        INSERT INTO genre_info(game_id,genre_id)
        VALUES($1, $2);
    `

    const updateDev = `
        UPDATE data
        SET dev_id = $1
        WHERE game_id = $2;
    `

    const updateGame = `
        UPDATE game_info
        SET game_name = $1
        WHERE game_id = $2;
    `
    await pool.query(DeleteGenre,[id])
    console.log('Genre Relation Deleted')

    for(const genreID of genreList ){
        await pool.query(insertGenre,[id,genreID])
    }
    await pool.query(updateDev,[dev_id,id])
    console.log('Developer Table Updated')

    await pool.query(updateGame,[game_name,id])
    console.log('Game Table Updated')
}

//function to update Dev entry in dev_info table
async function updateDevEntry(id,data) {
    const SQL = `
        UPDATE dev_info
        SET dev_name = $1
        WHERE dev_id = $2;
    `
    await pool.query(SQL,[data.dev_name,id])
}

//function to update genre entry in genre table
async function updateGenreEntry(id,data) {
    const SQL = `
        UPDATE genre
        SET genre = $1
        WHERE genre_id = $2;    
    `
    await pool.query(SQL,[id,data])
}

module.exports = {
    updateGameEntry,
    updateDevEntry,
    updateGenreEntry
}
const pool = require('./pool')

//fucntion to get all entries from database
async function getAllEntries() {
    const SQL = `
        SELECT id, data.game_id, data.dev_id, game_name, dev_name, 
        STRING_AGG(genre.genre, ', ') AS genres,
        STRING_AGG(genre.genre_id, ', ') AS genres_id FROM data 
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

//function to get all details for a game
async function getRow(id) {
    const SQL = `
        SELECT id, game_name, data.game_id, dev_name, data.dev_id, 
        ARRAY_AGG(genre.genre) as genres,
        ARRAY_AGG(genre.genre_id) as genres_id FROM data
        JOIN game_info ON data.game_id = game_info.game_id
        JOIN dev_info ON data.dev_id = dev_info.dev_id
        JOIN genre_info ON data.game_id = genre_info.game_id
        JOIN genre ON genre_info.genre_id = genre.genre_id
        WHERE data.game_id = $1
        GROUP BY id, data.game_id, data.dev_id, game_name, dev_name;
    `
    const { rows } = await pool.query(SQL,[id])
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
        SELECT ARRAY_AGG(genre.genre_id) AS genres_id , ARRAY_AGG(genre.genre) AS genres FROM genre_info
        JOIN genre ON genre_info.genre_id = genre.genre_id
        WHERE game_id = $1
        GROUP BY genre.genre_id, genre.genre;
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

//function to get the genre and count of each game in that genre
async function getGenreCount() {
    const SQL = `
        SELECT genre, COUNT(genre) as count from genre
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

//function to delete a game and its relations
async function deleteGame(id) {

    const delDevRel = `
        DELETE FROM data
        WHERE game_id = $1;
    `
    const delGenreRel = `
        DELETE FROM genre_info
        WHERE game_id = $1;
    `

    const delGame = `
        DELETE FROM game_info
        WHERE game_id = $1;
    `

    await pool.query(delDevRel,[id])
    console.log('Deleted Dev Relation')

    await pool.query(delGenreRel,[id])
    console.log('Deleted Genre Ralation')

    await pool.query(delGame,[id])
    console.log('Deleted Game Entry')
}

//function to delete a row from dev_info and its relation in data table
async function deleteDev(id) {
    const deleteDevRelation = `
        DELETE FROM data
        WHERE dev_id = $1; 
    `

    const deleteDev = `
        DELETE FROM dev_info
        WHERE dev_id = $1;
    `

    await pool.query(deleteDevRelation,[id])
    console.log('Relation Deleted')

    await pool.query(deleteDev,[id])
    console.log('Dev Deleted')
}

//function to delete genre and its relation in genre_info
async function deleteGenre(id) {
    const deleteRelation = `
        DELETE FROM genre_info
        WHERE genre_id = $1;
    `
    const deleteGenre = `
        DELETE FROM genre
        WHERE genre_id = $1;
    `
    await pool.query(deleteRelation,[id])
    console.log('Relation Deleted')

    await pool.query(deleteGenre,[id])
    console.log('Genre Deleted')
}

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
        ($1, $2);
    `

    const updateDev = `
        UPDATE data
        SET dev_id = $1
        WHERE game_id = $2;
    `

    const updateGame = `
        UPDATE game_info
        SET game_name =$1
        WHERE game_id = $2;
    `
    await pool.query(deleteGenre)
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

//function to insert new developer information in dev info table
async function addNewDev(name) {
    const getCount = await pool.query(`SELECT COUNT(dev_id) from dev_info`); 
    const count =  parseInt(getCount.rows[0].count)   //to get count of all entries in table to get id for new entry
    const devID = `D${count+1}`

    const SQL = `
        INSERT INTO dev_info(dev_id,dev_name) VALUES
        ($1,$2)
        ON CONFLICT(dev_id) DO NOTHING;
    `
    await pool.query(SQL,[devID,name]) //increment count by 1 for new dev id
    console.log('Inserted')
}

//function to insert new genre information in genre table
async function addNewGenre(genre) {
    const getCount = await pool.query(`SELECT COUNT(genre_id) FROM genre`)
    const count = parseInt(getCount.rows[0].count) //to get count of all entries in table to get id for new entry
    const ID = count+1

    const SQL = `
        INSERT INTO genre(genre_id,genre) VALUES
        ($1,$2)
        ON CONFLICT(genre_id) DO NOTHING;
    `
    await pool.query(SQL,[ID,genre])
    console.log('Inserted')
}

//function to get all genre about a specific game
async function getGenreEntry(id) {
    const SQL = `
        SELECT genre FROM  genre 
        JOIN genre_info on genre.genre_id = genre_info.genre_id 
        WHERE game_id = $1;
    `
    const { rows } = await pool.query(SQL,[id])
    return rows
}

//function to get new gameId for inserting new game entry
async function getNewGameID(){
    const getCount = await pool.query('SELECT COUNT(game_id) FROM game_info')
    const count = parseInt(getCount.rows[0].count) //to get count of all entries in table to get id for new entry
    const gameID = `G${count+1}`

    return gameID
}

//function to insert new game information in game_info table
async function addNewGame(gameID,data) {
    const addGame = `
        INSERT INTO game_info(game_id,game_name) VALUES
        ($1,$2)
        ON CONFLICT(game_id) DO NOTHING;
    `
    const attachDev = `
        INSERT INTO data(game_id,dev_id) VALUES
        ($1, $2);
    `
    const attachGenre = `
        INSERT INTO genre_info(game_id, genre_id) VALUES
        ($1, $2);
    `
    const { game_name, dev_id, genres } = data
    const genreList = Array.isArray(genres) ? genres : genres ? [genres] : [] 
    
    await pool.query(addGame,[gameID,game_name])
    await pool.query(attachDev,[gameID,dev_id])

    for( const genreID of genreList){
        await pool.query(attachGenre,[gameID,genreID])
    }

    console.log('Inserted')
}


module.exports = {
    getAllEntries,
    getGameInfo,
    getGenreInfo,
    getDevInfo,
    getGameRow,
    getGenreCount,
    getDevCount,
    getDevRow,
    getGenreRow,
    deleteGame,
    deleteDev,
    deleteGenre,
    updateDevEntry,
    updateGenreEntry,
    updateGameEntry,
    addNewDev,
    addNewGenre,
    getGenreEntry,
    addNewGame,
    getNewGameID
}
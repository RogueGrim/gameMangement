const pool = require('../pool')

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

//function to insert new game information in game_info table
async function addNewGame(data) {

    const getCount = await pool.query('SELECT COUNT(game_id) FROM game_info')
    const count = parseInt(getCount.rows[0].count) //to get count of all entries in table to get id for new entry
    const gameID = `G${count+1}`

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
    addNewDev,
    addNewGame,
    addNewGenre
}
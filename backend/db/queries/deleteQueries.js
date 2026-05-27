const pool = require('../pool')

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
    
    try{
        await pool.query(deleteDevRelation,[id])
        console.log('Relation Deleted')

        await pool.query(deleteDev,[id])
        console.log('Dev Deleted')  
        
    }catch (err) {
        throw err
    }
    
}

//function to delete genre and its relation in genre_info
async function deleteGenre(id, force) {
    const deleteRelation = `
        DELETE FROM genre_info
        WHERE genre_id = $1;
    `
    const deleteGenre = `
        DELETE FROM genre
        WHERE genre_id = $1;
    `
    try{
        await pool.query(deleteRelation,[id])
        console.log('Relation Deleted')
        
        await pool.query(deleteGenre,[id])
        console.log('Genre Deleted')
    }catch (err){
        throw err
    }
}

module.exports = {
    deleteGame,
    deleteDev,
    deleteGenre
}
require('dotenv').config({path:'../.env'})
const { Client } = require('pg')
//sql query to reset the db
const resetDb = `
    DROP TABLE IF EXISTS data;
    DROP TABLE IF EXISTS genre_info;
    DROP TABLE IF EXISTS genre;
    DROP TABLE IF EXISTS game_info;
    DROP TABLE IF EXISTS dev_info;
    
`

//sql query to create table for game information
const createTableGame = `
    CREATE TABLE IF NOT EXISTS game_info(
       game_id VARCHAR(50) PRIMARY KEY,
       game_name VARCHAR(50)
    );
`
//sql query to create table for genre 
const createTableGenre = `
    CREATE TABLE IF NOT EXISTS genre(
        genre_id VARCHAR(50) PRIMARY KEY,
        genre VARCHAR(255) UNIQUE
    );
`

//sql query to create table for game and genre relation
const createTableGenre_data = `
    CREATE TABLE IF NOT EXISTS genre_info(
        game_id VARCHAR(50),
        genre_id VARCHAR(50),
        PRIMARY KEY (game_id,genre_id),
        FOREIGN KEY (game_id) REFERENCES game_info (game_id),
        FOREIGN KEY (genre_id) REFERENCES genre (genre_id)
    );
`

//sql query to create table for developer information
const createTableDev = `
 
    CREATE TABLE IF NOT EXISTS dev_info(
        dev_id VARCHAR(50) PRIMARY KEY,
        dev_name VARCHAR(50)
    );
`

//sql query to create tablr for game and developer information
const createTableMain = `

    CREATE TABLE IF NOT EXISTS data(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        game_id VARCHAR(50),
        dev_id VARCHAR(50),
        FOREIGN KEY (game_id) REFERENCES game_info(game_id),
        FOREIGN KEY (dev_id) REFERENCES dev_info(dev_id)
    );
`

const insertData1 = `
    
    INSERT INTO game_info (game_id, game_name) VALUES
    ('G1', 'Valorant'),
    ('G2', 'Minecraft'),
    ('G3', 'GTA V'),
    ('G4', 'Elden Ring'),
    ('G5', 'FIFA 24')
    ON CONFLICT(game_id) DO NOTHING;
`

const insertData4 = `
    INSERT INTO genre(genre_id,genre) VALUES
    ('1', 'FPS'),
    ('2', 'Sandbox'),
    ('3', 'Action'),
    ('4', 'RPG'),
    ('5', 'Sports')
    ON CONFLICT(genre_id) DO NOTHING;
`

const insertData5 = `
    INSERT INTO genre_info(game_id, genre_id) VALUES
    ('G1', '1'),
    ('G2', '2'),
    ('G3', '3'),
    ('G4', '4'),
    ('G5', '5')
    ON CONFLICT(game_id,genre_id) DO NOTHING;
`
const insertData2 = `

    INSERT INTO dev_info (dev_id, dev_name) VALUES
    ('D1', 'Riot Games'),
    ('D2', 'Mojang'),
    ('D3', 'Rockstar Games'),
    ('D4', 'FromSoftware'),
    ('D5', 'EA Sports')
    ON CONFLICT(dev_id) DO NOTHING;
`
const insertData3 = `

    INSERT INTO data (game_id, dev_id) VALUES
    ('G1', 'D1'),
    ('G2', 'D2'),
    ('G3', 'D3'),
    ('G4', 'D4'),
    ('G5', 'D5');
`
async function main() {
    console.log('Seeding')

    const client = new Client({
        connectionString: process.env.DATABASE_URL
    })

    await client.connect();

    await client.query(resetDb);
    console.log('Database Reset');

    await client.query(createTableDev);
    console.log('Dev Table Created');

    await client.query(createTableGame);
    console.log('Game Table Created');

    await client.query(createTableGenre);
    console.log('Genre Table Created');

    await client.query(createTableGenre_data);
    console.log('Genre Relation Table Created');

    await client.query(createTableMain);
    console.log('Main Table Created');


    await client.query(insertData1);
    await client.query(insertData2);
    await client.query(insertData3);
    await client.query(insertData4);
    await client.query(insertData5)
    console.log('Data inserted');
    await client.end();
    console.log('Done')
}

main()
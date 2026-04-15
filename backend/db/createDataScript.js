require('dotenv').config({path:'../.env'})
const { Client } = require('pg')

const createTableGame = `

    CREATE TABLE IF NOT EXISTS game_info(
       game_id VARCHAR(50) PRIMARY KEY,
       game_name VARCHAR(50),
       genre VARCHAR(255)
    );
`
const createTableDev = `
 
    CREATE TABLE IF NOT EXISTS dev_info(
        dev_id VARCHAR(50) PRIMARY KEY,
        dev_name VARCHAR(50)
    );
`

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
    
    INSERT INTO game_info (game_id, game_name, genre) VALUES
    ('G1', 'Valorant', 'FPS'),
    ('G2', 'Minecraft', 'Sandbox'),
    ('G3', 'GTA V', 'Action'),
    ('G4', 'Elden Ring', 'RPG'),
    ('G5', 'FIFA 24', 'Sports')
    ON CONFLICT(game_id) DO NOTHING;
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

    await client.query(createTableDev);
    console.log('Dev Table Created');

    await client.query(createTableGame);
    console.log('Game Table Created');

    await client.query(createTableMain);
    console.log('Main Table Created');


    await client.query(insertData1);
    await client.query(insertData2);
    await client.query(insertData3);
    console.log('Data inserted');
    await client.end();
    console.log('Done')
}

main()
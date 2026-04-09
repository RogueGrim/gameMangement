import express from 'express' 
import path from 'path'
import { createEngine } from 'express-react-views'
import dotenv from "dotenv";
dotenv.config();

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'jsx')

app.engine('jsx',createEngine())

app.use(express.urlencoded({extended: true}))


const port = process.env.connectionString || 3000

app.listen(port,() => {
    console.log(`Express listening on ${port}`)
})
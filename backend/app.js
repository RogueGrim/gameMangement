const express = require('express') 
const path = require('node:path')
const router = require('./routes/routes')
require('dotenv/config')

const app = express()

app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use('/',router)


const port = process.env.PORT || 3000

app.listen(port,() => {
    console.log(`Express listening on ${port}`)
})
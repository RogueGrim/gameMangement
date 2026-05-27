require('dotenv').config()
const express = require('express') 
const path = require('node:path')

const indexRouter = require('./routes/indexRouter.js')
const categoriesRouter = require('./routes/categoriesRouter')
const managementRouter = require('./routes/managementRouter')
const errorRouter = require('./routes/errorRouter')

const app = express()

app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs')

const assetPath = path.join(__dirname,'views/public')
app.use(express.static(assetPath))

app.use(express.urlencoded({extended: true}))
app.use('/', indexRouter)
app.use('/categories', categoriesRouter)
app.use('/management', managementRouter)
app.use(errorRouter)



const port = process.env.PORT || 3000

app.listen(port,() => {
    console.log(`Express listening on ${port}`)

})
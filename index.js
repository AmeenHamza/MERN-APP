const express = require('express')
// const { mongoose } = require('mongoose')
const app = express()
app.use(express.json())
require('dotenv').config()
const port = process.env.SERVER_PORT
const cors = require('cors');
const path = require('path');

const clientpath = path.join(__dirname, './Client/dist')

// For host on server

app.use('/', express.static(clientpath))

// Cors allows browser to hit the api correctly 
app.use(cors())
app.use('/api/user', require('./api/users/Router'))
app.use('/api/product', require('./api/products/Router'))
app.use('/api/brand', require('./api/brands/Router'))
app.use('/api/category', require('./api/categories/Router'))
app.use('/api/order', require('./api/orders/Router'))

// --------- Simple Database Connection through mongoose() to MongoDb -------- //

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log("Connected Successfully"))
//     .catch((err) => console.log(err))

// For serving you frontend on server

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Client/dist/index.html'))
})

app.listen(port, () => {
    console.log("App listening on port : http://localhost:" + port)
})

// To perform routing make a folder name as 'api' after making this folder create another two folders one is Controller and the second is Router
// Controller contains all of the functions or api's
// Router contains routes of api e.g : /api/user
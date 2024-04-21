// NPM & requires

const express = require('express');
const path = require('path')
const app = express()

const api_routes = require('./routes/api_routes')
// const api_routed = require('./Develop/public/notes/html')

const PORT = 3333

// Middleware routes

// GET route for every file inside public
app.use(express.static('public'))

// allow encoded url  to be sent to routes
app.use(express.urlencoded({extended: false}));

// JSON data can be sent to routes
app.use(express.json())


app.use('/api', api_routes)




// GET notes.html
app.get('/notes', (requestObj, responseObj) => {
    
    responseObj.sendFile(path.join(__dirname, './/public/notes.html'))
})


// Start the server

app.listen(PORT, () => {
    console.log('Server running on port', PORT)
})






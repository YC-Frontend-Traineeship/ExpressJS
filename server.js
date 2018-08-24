const express = require('express')
const bodyParser = require('body-parser')
// My SQL
const mysql = require('mysql')
// Server
const app = express()

// Database information
const connection = mysql.createConnection({
  host     : 'localhost', 
  port: 3307,
  user     : 'root',
  password : 'mysql',
  database : 'todo'
});

// Everythng that is in the map public will be accessible
app.use(express.static('public'));
// Print data with post to html
app.use(bodyParser.urlencoded({extended: true}));


// @localhost:3000 'Hello World!' will be printed
// Console log that @localhost:3000 is working
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(3000, () => console.log('Example app listening on port 3000!'))


// GET database @localhost:3000/db
app.get('/dbGet', (req, res) => {
  var name = req.param('name')
  var password = req.param('password')

  res.send('GET: ' + name + ' ' + password)
})


// POST database @localhost:3000/db
app.post('/dbPost', function (req, res) {
    console.log('get db')

    // Database starts connection
    connection.connect() 
    console.log('connect')

    // Select table todo from database
    // If there is a error console log the error
    // Else console log the results of database
    connection.query('SELECT * FROM todo', function (err, results) {
    if (err) console.log(err)
    console.log('The results from the database are: ', JSON.stringify(results))

    // print on html from form
    var name = req.body.name
    var password = req.body.password
    

    res.send('POST: ' + name + ' ' + password + ' ' + JSON.stringify(results))

    // Print text on page
    // res.send(JSON.stringify(results))
    })

  // Ends connection with database
  connection.end()
});



const express = require('express')
const bodyParser = require('body-parser')
// My SQL
const mysql = require('mysql')
// Server
const app = express()


// Everythng that is in the map public will be accessible
app.use(express.static('public'));

// @localhost:3000 'Hello World!' will be printed
// Console log that @localhost:3000 is working
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(3000, () => console.log('Example app listening on port 3000!'))


// Get database @localhost:3000/db
app.get('/db', function (req, res) {
    console.log('get db')

    // Database information
    var connection = mysql.createConnection({
        host     : 'localhost', 
        port: 3307,
        user     : 'root',
        password : 'mysql',
        database : 'todo'
      });
    
    // Database starts connection
    connection.connect() 
    console.log('connect')

    // Select table todo from database
    // If there is a error console log the error
    // Else console log the results of database
    connection.query('SELECT * FROM todo', function (err, results) {
    if (err) console.log(err)
    console.log('The results from the database are: ', results)

    // Print text on page
    res.send('GET request to the homepage')
    })

  // Ends connection with database
  connection.end()
})







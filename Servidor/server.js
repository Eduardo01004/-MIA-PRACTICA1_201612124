const express = require('express')
const app = express()
var mysql = require('mysql');

var session = require('./routes/server_routes');
app.use("/",session);

app.listen( 3000, (err) => {
    console.log('Server running on port ' + (3000))
});
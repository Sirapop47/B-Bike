'use strict'
require('./models/database')

const express = require('express')
const app = express()
var path  = require("path")
const port = 8080



var bodyparser = require('body-parser')

//controllers
var indexControllers = require('./controllers/indexControllers')
var mapControllers = require('./controllers/mapControllers')
var c_serviceControllers = require('./controllers/c_serviceControllers')
var driverControllers = require('./controllers/driverControllers')
var customerControllers = require('./controllers/customerControllers')





app.use(express.static(path.join(__dirname, "public")))
// Middleware & Static Files
app.use('/public', express.static('public'))

app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine', 'ejs')





mapControllers(app);
app.use(indexControllers);
app.use(driverControllers);
app.use(c_serviceControllers);
app.use(customerControllers);



// app.get('/testDB', function (req, res, next) {
//     //res.render('test2', { output: req.params.id })
    
//     res.render('test')
// })

// app.post('/testDB', function (req, res, next) {
//     res.redirect('/testDB2')

    
// })
// app.get('/testDB2', function (req, res, next) {
//     //res.render('test2', { output: req.params.id })
//     res.render('test2',{dataDB : "yourLocalVar"})
// })


// app.get('/testmap', function (req, res) {
//     res.render('test3')
// })









app.listen(port, () => console.log('app listening on port' + port))
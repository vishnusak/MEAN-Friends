var exp     = require('express'),
    bp      = require('body-parser'),
    PORT    = 8000

var app = exp()
app.use(exp.static(__dirname + '/client'))
app.use(exp.static(__dirname + '/client/static'))
app.use(exp.static(__dirname + '/node_modules'))
app.use(bp.urlencoded({extended: true}))
app.use(bp.json())

var routes = require('./server/config/routes')(app)

app.listen(PORT, function(){
  console.log(`Server is running on Port: ${PORT}`)
})

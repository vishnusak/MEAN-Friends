console.log(`Router is loaded`)
var controller = require('../controllers/controller.js')

function allRoutes(app){
  app.get('/friends', controller.index)
  app.get('/friends/:id', controller.show)
  app.post('/friends', controller.add)
  app.put('/friends/:id', controller.edit)
  app.delete('/friends/:id', controller.delete)
}

module.exports = allRoutes

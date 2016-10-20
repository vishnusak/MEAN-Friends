console.log(`Controller Loaded`)
var db = require('../config/db.js')

module.exports = {
  index: function(req, res){
    db.find({})
      .exec(function(err, friends){
        if (err){
          console.log(`Error while getting all records`)
          console.log(err)
        } else {
          res.json(friends)
        }
      })
  },

  show: function(req, res){
    db.findOne({'_id': req.params['id']})
      .exec(function(err, friend){
        if (err){
          console.log(`Error while getting Friend record`)
          console.log(err)
        } else {
          res.json(friend)
        }
      })
  },

  add: function(req, res){
    var newFriend = new db(req.body)
    newFriend.save(function(err, addedFriend){
      if (err){
        console.log(`Error adding new Friend record`)
        console.log(err)
      } else {
        res.json(addedFriend)
      }
    })
  },

  edit: function(req, res){
    db.findOneAndUpdate({'_id': req.params['id']}, req.body, {new: true}, function(err, updatedFriend){
      if (err){
        console.log(`Error updating Friend record`)
        console.log(err)
      } else {
        res.json(updatedFriend)
      }
    })
  },

  delete: function(req, res){
    db.findByIdAndRemove(req.params['id'], function(err){
      if (err){
        console.log(`Error deleting Friend record`)
        console.log(err)
      } else {
        res.json({deleted: true})
      }
    })
  }
}

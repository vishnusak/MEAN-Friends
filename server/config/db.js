console.log(`db config is loaded`)
var mg = require('mongoose')

mg.connect('mongodb://localhost/friendsDB', function(err){
  if (err){
    console.log(`Unable to establish connection`)
    console.log(err)
  } else {
    console.log(`Connection to DB established`)
  }
})

var FriendSchema = new mg.Schema({
  fname: String,
  lname: String,
  dob: Date
},
{
  timestamps: true
})

var Friends = mg.model("Friends", FriendSchema)

module.exports = Friends

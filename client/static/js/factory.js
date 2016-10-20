// trying the object creation way of returning a factory
app.factory('friendsFactory', ['$http', function($http){
  function friendsClass(){
// All the externally visible methods and properties
    this.index = function(callback){
      getAllDataFromServer(callback)
    }

    this.show = function(id, callback){
      getFriendFromServer(id, callback)
    }

    this.add = function(friend, callback){
      addFriendToServer(friend, callback)
    }

    this.edit = function(id, friend, callback){
      editFriendOnServer(id, friend, callback)
    }

    this.delete = function(id, callback){
      deleteFriendOnServer(id, callback)
    }
  }

// ------------------------------------------------------------
    // All private methods, variables go here:

    function getAllDataFromServer(callback){
      $http({
        method: 'GET',
        url: '/friends'
      }).then(function(serverData){
        // console.log(`Get AllServerData seccessful`)
        callback(serverData.data)
      }, function(err){
        console.log(`Get AllServerData FAILED`)
        console.log(err)
      })
    }

    function getFriendFromServer(id, callback){
      $http({
        method: 'GET',
        url: `/friends/${id}`
      }).then(function(serverData){
        // console.log(`Get FriendData successful`)
        callback(serverData.data)
      }, function(err){
        console.log(`Get FriendData FAILED`)
        console.log(err)
      })
    }

    function addFriendToServer(friend, callback){
      return new Promise(function(resolve, reject){
        $http({
          method: 'POST',
          url: `/friends`,
          data: friend
        }).then(function(){
            // console.log(`ADD FriendData successful`)
            callback()
        }, function(err){
            console.log(`ADD FriendData FAILED`)
            console.log(err)
        })
      })
    }

    function editFriendOnServer(id, friend, callback){
      $http({
        method: 'PUT',
        url: `/friends/${id}`,
        data: friend
      }).then(function(serverData){
        // console.log(`UPDATE FriendData successful`)
          callback()
      }, function(err){
        console.log(`UPDATE FriendData FAILED`)
        console.log(err)
      })
    }

    function deleteFriendOnServer(id, callback){
      $http({
        method: 'DELETE',
        url: `/friends/${id}`
      }).then(function(serverData){
        // console.log(`DELETE FriendData successful`)
        callback()
      }, function(){
        console.log(`DELETE FriendData FAILED`)
        console.log(err)
      })
    }

// ------------------------------------------------------------

  return (new friendsClass())
}])

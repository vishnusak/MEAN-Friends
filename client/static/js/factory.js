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

    this.getYears = function(){
      return years
    }

    this.getMonths = function(year){
      var monthList = [],
          lastMonthInList = '',
          dateNow = new Date(),
          curYear = dateNow.getFullYear(),
          curMon  = dateNow.toDateString().replace(/\u200E/g, '').substring(4, 7)

      if (year === curYear){ lastMonthInList = curMon }

      for (mon in months){
        monthList.push(mon)
        if (mon === lastMonthInList){ break }
      }

      return monthList
    }

    this.getDaysForMonth = function(year, month){
      var dayList = [],
          days    = 0,
          dateNow = new Date(),
          curYear = dateNow.getFullYear(),
          curMon  = dateNow.toDateString().replace(/\u200E/g, '').substring(4, 7),
          curDay  = dateNow.getDate()

      if (month == 'Feb'){
        days = (isLeap(year) ? 28 : 27)
      } else if((year === curYear) && (month === curMon)){
        days = curDay
      } else {
        days = months[month]
      }

      for (let i = 1; i <= days; i++){
        dayList.push(i)
      }

      return dayList
    }

  }

// ------------------------------------------------------------
    // All private methods, variables go here:
    var years  = [],
        months = { Jan: 31, Feb: 27, Mar: 31, Apr: 30, May: 31, Jun: 30, July: 31, Aug: 31, Sep: 30, Oct: 31, Nov: 30, Dec: 31 },
    // toLocaleDateString will give current date in mm/dd/yyyy format
    // The replace(/\u200E/g, '') is to remove the non-visible hex character 8206 inserted into the date string in MS Edge. Not sure why it is inserted and what that characrter is.
    //refer:  http://stackoverflow.com/questions/32099053/microsoft-edge-javascript-tolocaletimestring-incorrect-spacing
        curDate= new Date().toLocaleDateString().replace(/\u200E/g, ''),
        curMM  = Number(curDate.substring(0, 2)),
        curDD  = Number(curDate.substring(3, 5)),
        curYYYY= Number(curDate.substring(6))

    for (let i = 0; i < 150; i++){
      years.push(curYYYY)
      curYYYY -= 1
    }

    function isLeap(year){
      if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
          return true
      } else {
          return false
      }
    }

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

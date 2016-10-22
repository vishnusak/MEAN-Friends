app.controller('indexController', ['$scope', 'friendsFactory', function($scope, FF){

  $scope.friends = []

  FF.index(function(allFriends){

    $scope.friends = allFriends

  })

}])

//----------------------------------------------------------------------

app.controller('showController', ['$scope', '$routeParams', 'friendsFactory', function($scope, $routeParams, FF){

  $scope.form               = {}

  FF.show($routeParams['id'], function(friend){

    var friendDob = new Date(friend['dob']).toDateString().replace(/\u200E/g, '').substring(4).replace(/ /g, '-')

    var friendCreatedAt = new Date(friend['createdAt']).toDateString().replace(/\u200E/g, '').substring(4).replace(/ /g, '-')

    $scope.form['fname']      = friend['fname']
    $scope.form['lname']      = friend['lname']
    $scope.form['dob']        = friendDob
    $scope.form['createdAt']  = friendCreatedAt
    $scope.form['header']     = "Friend Details"
    $scope.form['class']      = "readOnly"
    $scope.form['buttonText'] = ""

  })

}])

//----------------------------------------------------------------------

app.controller('addController', ['$scope', '$location', 'friendsFactory', function($scope, $location, FF){

  $scope.years              = FF.getYears()
  $scope.months             = []
  $scope.days               = []
  $scope.form               = {}
  $scope.form['header']     = "Add Friend Details"
  $scope.form['class']      = ""
  $scope.form['buttonText'] = "Add Friend"
  $scope.form['fname']      = ""
  $scope.form['lname']      = ""
  $scope.form['dob']        = {}
  $scope.form['dob']['year']= ""
  $scope.form['dob']['month']= ""
  $scope.form['dob']['day'] = ""
  $scope.form['error']      = {}
  $scope.form['error']['fname'] = ""
  $scope.form['error']['lname'] = ""
  $scope.form['error']['dob'] = ""

  $scope.getMonths = function(year){
    $scope.months = FF.getMonths(year)
  }

  $scope.getDays   = function(year, mon){
    $scope.days   = FF.getDaysForMonth(year, mon)
  }

  $scope.formSubmit = function(){
    if (!$scope.form['fname']){
      $scope.form['error']['fname'] = "Please fill in First Name"
    } else {
      $scope.form['error']['fname'] = ""
    }

    if (!$scope.form['lname']){
      $scope.form['error']['lname'] = "Please fill in Last Name"
    } else {
      $scope.form['error']['lname'] = ""
    }

    if ((!$scope.form['dob']['year']) || (!$scope.form['dob']['month']) || (!$scope.form['dob']['day'])){
      $scope.form['error']['dob'] = "Please fill in Year/Month/Day for Birthday"
    } else {
      $scope.form['error']['dob'] = ""
    }

    if (!$scope.form['error']['fname'] && !$scope.form['error']['lname'] && !$scope.form['error']['dob']){

      var dobString = `${$scope.form['dob']['month']} ${$scope.form['dob']['day']} ${$scope.form['dob']['year']}`,
      friend = {
        fname: $scope.form['fname'],
        lname: $scope.form['lname'],
        dob: new Date(dobString)
      }

      FF.add(friend, function(){
        $location.url('/friends')
      })
    }

  }

}])

//----------------------------------------------------------------------

app.controller('editController', ['$scope', '$location', '$routeParams', 'friendsFactory', function($scope, $location, $routeParams, FF){

  var retrievedFriend = {}

  FF.show($routeParams['id'], function(friend){
    retrievedFriend = friend
    var dob = new Date(friend['dob']).toDateString().replace(/\u200E/g, '').substring(4)

    $scope.years              = FF.getYears()
    $scope.months             = []
    $scope.days               = []
    $scope.form               = {}
    $scope.form['header']     = "Edit Friend Details"
    $scope.form['class']      = ""
    $scope.form['buttonText'] = "Save Edit"
    $scope.form['fname']      = friend['fname']
    $scope.form['lname']      = friend['lname']
    $scope.form['dob']        = {}
    $scope.form['dob']['year']= Number(dob.substring(7))
    $scope.form['dob']['month']=dob.substring(0, 3)
    $scope.form['dob']['day'] = Number(dob.substring(4, 6))
    $scope.form['createdAt']  = ""
    $scope.form['error']      = {}
    $scope.form['error']['fname'] = ""
    $scope.form['error']['lname'] = ""
    $scope.form['error']['dob'] = ""

    $scope.getMonths = function(year){
      $scope.months = FF.getMonths(year)
    }

    if (!$scope.months.length){
      $scope.getMonths($scope.form['dob']['year'])
    }

    $scope.getDays   = function(year, mon){
      $scope.days   = FF.getDaysForMonth(year, mon)
    }

    if (!$scope.days.length){
      $scope.getDays($scope.form['dob']['year'], $scope.form['dob']['month'])
    }
  })


  $scope.formSubmit = function(){
    if (!$scope.form['fname']){
      $scope.form['error']['fname'] = "Please fill in First Name"
    } else {
      $scope.form['error']['fname'] = ""
    }

    if (!$scope.form['lname']){
      $scope.form['error']['lname'] = "Please fill in Last Name"
    } else {
      $scope.form['error']['lname'] = ""
    }

    if ((!$scope.form['dob']['year']) || (!$scope.form['dob']['month']) || (!$scope.form['dob']['day'])){
      $scope.form['error']['dob'] = "Please fill in Year/Month/Day for Birthday"
    } else {
      $scope.form['error']['dob'] = ""
    }

    if (!$scope.form['error']['fname'] && !$scope.form['error']['lname'] && !$scope.form['error']['dob']){
      var dobString = `${$scope.form['dob']['month']} ${$scope.form['dob']['day']} ${$scope.form['dob']['year']}`

      if ((retrievedFriend['fname'] == $scope.form['fname']) && (retrievedFriend['lname'] == $scope.form['lname']) && (new Date(retrievedFriend['dob']).toDateString() === new Date(dobString).toDateString())){
        $scope.form['error']['dob'] = "Details are same as in DB. If there are no changes, press the Home button to go back"
      } else {

        var friend = {
          fname: $scope.form['fname'],
          lname: $scope.form['lname'],
          dob: new Date(dobString)
        }
        
        FF.edit($routeParams['id'], friend, function(){
          $location.url(`/friends/${$routeParams['id']}`)
        })
      }

    }

  }

}])

//----------------------------------------------------------------------

app.controller('deleteController', ['$scope', '$location', '$routeParams', 'friendsFactory', function($scope, $location, $routeParams, FF){

  FF.delete($routeParams['id'], function(){
    $location.url('/friends')
  })

}])

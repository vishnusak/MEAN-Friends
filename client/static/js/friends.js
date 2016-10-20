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

    var dob       = new Date(friend['dob']),
        createdAt = new Date(friend['createdAt'])

    $scope.form['fname']      = friend['fname']
    $scope.form['lname']      = friend['lname']
    $scope.form['dob']        = dob.toLocaleDateString().replace(/(.*)\/(.*)\/(.*)/g, '$2-$1-$3')
    $scope.form['createdAt']  = createdAt.toLocaleDateString().replace(/(.*)\/(.*)\/(.*)/g, '$2-$1-$3')
    $scope.form['header']     = "Friend Details"
    $scope.form['class']      = "readOnly"
    $scope.form['buttonText'] = ""

  })

}])

//----------------------------------------------------------------------

app.controller('addController', ['$scope', '$location', 'friendsFactory', function($scope, $location, FF){

  $scope.form               = {}
  $scope.form['header']     = "Add Friend Details"
  $scope.form['class']      = ""
  $scope.form['buttonText'] = "Add Friend"
  $scope.form['fname']      = ""
  $scope.form['lanme']      = ""
  $scope.form['dob']        = ""

  $scope.formSubmit = function(){
    var friend = {
      fname: $scope.form['fname'],
      lname: $scope.form['lname'],
      dob: $scope.form['dob']
    }

    FF.add(friend, function(){
      $location.url('/friends')
    })

  }

}])

//----------------------------------------------------------------------

app.controller('editController', ['$scope', '$location', '$routeParams', 'friendsFactory', function($scope, $location, $routeParams, FF){

  FF.show($routeParams['id'], function(friend){

    var dob = new Date(friend['dob'])

    $scope.form               = {}
    $scope.form['header']     = "Edit Friend Details"
    $scope.form['class']      = ""
    $scope.form['buttonText'] = "Save Edit"
    $scope.form['fname']      = friend['fname']
    $scope.form['lname']      = friend['lname']
    $scope.form['dob']        = dob.toLocaleDateString().replace(/\//g, '-')
    $scope.form['createdAt']  = ""

  })


  $scope.formSubmit = function(){
    var friend = {
      fname: $scope.form['fname'],
      lname: $scope.form['lname'],
      dob: $scope.form['dob']
    }

    FF.edit($routeParams['id'], friend, function(){
      $location.url(`/friends/${$routeParams['id']}`)
    })

  }

}])

//----------------------------------------------------------------------

app.controller('deleteController', ['$scope', '$location', '$routeParams', 'friendsFactory', function($scope, $location, $routeParams, FF){

  FF.delete($routeParams['id'], function(){
    $location.url('/friends')
  })

}])

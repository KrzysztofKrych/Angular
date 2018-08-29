angular.module('app', [])

.controller('page', function($scope, $http, $timeout){
    const root = 'http://jsonplaceholder.typicode.com';
    $scope.editView = false;
    $scope.addingUser = false;
    $scope.indexOfEditUser = null;
    $scope.newUser = {};
    $scope.new = angular.element(document.querySelector('.show'));

    $http.get(root + '/users/')
    .then(function(res){
        $scope.users = res.data;
    })
    $scope.editUser = function(index){
        $scope.editView = true;
        $scope.indexOfEditUser = index;
    }
    $scope.saveUser = function(id,name, username, email, phone, address){
        var objToSend = {name: name, username: username, email:email, phone:phone, address: {city: address}}
        $scope.editView = false;
        $http.put(root + '/users/' + id, objToSend)
        .then(function(res){
            for(var i in $scope.users){
                if($scope.users[i].id == res.data.id){
                    $scope.users[i] == res.data;
                }
            }
        })
    }
    $scope.deleteUser = function(id){
            $http.delete(root + '/users/' + id)
                .then(function(res){
                    for(var i in $scope.users){
                        if($scope.users[i].id == id){
                            $scope.users.splice(i, 1);
                        }
                    }
                }, function(rejection){
                    console.log(rejection);
                    for(var i in $scope.users){
                        if($scope.users[i].id == id){
                            $scope.users.splice(i, 1);
                        }
                    }
                })
               
        
    }
    $scope.createUser = function(){
        $http.post(root + '/users', $scope.newUser)
        .then(function(res){
            $scope.users.push(res.data);
            $scope.addingUser = false;
            $scope.newUser = {}
        })
    }
    $scope.addUser = function(){
        $scope.addingUser = true;
        $scope.editView = false;
    }
    $scope.backFromAddView = function(){
        $scope.addingUser = false;
        $scope.editView = false;
    }
    $scope.validate = function(value){
        if(value == 'new' || value == 'start'){
            $scope.validateFields = false;
            var newElements = angular.element(document.querySelectorAll('.check'));
            if(!newElements.length){
                $scope.validateFields = true;
            }
            for(var i = 0; i < newElements.length; i++){
                if((newElements[i].value == undefined || newElements[i].value == ""|| !newElements[i].value) && i != "length"){
                    $scope.validateFields = true;
                    break;
                }
            }
        } else if(value == 'edit' || value == 'start'){
            $scope.validateSaveFields = false;
            var saveElements = angular.element(document.querySelectorAll('.checkSave'));
            for(var i = 0; i < saveElements.length; i++){
                if((saveElements[i].value == undefined || saveElements[i].value == ""|| !saveElements[i].value) && i != "length"){
                    $scope.validateSaveFields = true;
                    break;
                }
            }
        }
    }
})
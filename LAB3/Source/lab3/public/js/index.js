/**
 * Created by user on 23/10/2016.
 */
var myapp = angular.module('demoMongo',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});

myapp.controller('MongoRestController',function($scope,$http){

    $scope.insertData = function(){
        var req = $http.post('https://cs5551lab3.herokuapp.com/insert',$scope.formData);
        req.success(function(data) {
            alert("Add Success")
            console.log(data);
        });
        req.error(function(data) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
        var x = document.getElementById("addPart");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    };
    $scope.searchData = function(){
        var name = $scope.searchData.search2;
        var dataUp = { name: name };
        var req = $http.post('https://cs5551lab3.herokuapp.com/search',dataUp);
        req.success(function(doc) {
            $scope.message = doc;
            if($scope.message.items[0] == null){
                alert("No product found")
            }
            else{
                alert("Search Success")
            }
            console.log(doc);
            // alert( "message1: " + doc);
        });
        req.error(function(data) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };
    $scope.updateData = function(){
        $scope.upData.id = $scope.message.items[0]._id
        console.log($scope.upData.id)
        console.log($scope.upData)
        alert("Update Success")

        var req = $http.post('https://cs5551lab3.herokuapp.com/updata',$scope.upData);
        req.success(function(data) {
            console.log(data);
        });
        req.error(function(data) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });

        var x = document.getElementById("myDIV3");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        var x = document.getElementById("myDIV");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        var x = document.getElementById("myDIV2");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }

    };
    $scope.deleteData = function(){

        var id1 = $scope.message.items[0]._id
        console.log(id1)
        alert("Delete Success")

        var req = $http.post('https://cs5551lab3.herokuapp.com/delete',{id:$scope.message.items[0]._id});
        req.success(function(data) {
            console.log(data);
        });
        req.error(function(data) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
        var x = document.getElementById("myDIV");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        var x = document.getElementById("myDIV3");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    };


});
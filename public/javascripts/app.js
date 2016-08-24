var battleshipApp = angular.module('battleshipApp', ['ngRoute']);
battleshipApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl : 'index'
    })
    .when('/:name', {
        templateUrl : 'setup'
    })
    .when('/:name/game', {
        templateUrl : 'game'
    })
    .otherwise({
    	redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
}]);

battleshipApp.controller('battleshipCtrl', ['$scope', '$http', '$window', '$routeParams', function($scope, $http, $window, $routeParams){
    $scope.setupBoard = function(){
        $http.post('/', name).success(function(res){
            window.location = "/" + $scope.name;
        });
    };
    $scope.placeShips = function(){
        var coords = [
            { "x0" : $("#ship-0x").val(), "y0" : $("#ship-0y").val()},
            { "x1" : $("#ship-1x").val(), "y1" : $("#ship-1y").val()},
            { "x2" : $("#ship-2x").val(), "y2" : $("#ship-2y").val()},
            { "x3" : $("#ship-3x").val(), "y3" : $("#ship-3y").val()},
            { "x4" : $("#ship-4x").val(), "y4" : $("#ship-4y").val()},
            { "x5" : $("#ship-5x").val(), "y5" : $("#ship-5y").val()},
            { "x6" : $("#ship-6x").val(), "y6" : $("#ship-6y").val()},
            { "x7" : $("#ship-7x").val(), "y7" : $("#ship-7y").val()},
            { "x8" : $("#ship-8x").val(), "y8" : $("#ship-8y").val()},
            { "x9" : $("#ship-9x").val(), "y9" : $("#ship-9y").val()}
        ];
        $http.post('/:name/game', coords).success(function(res){
            window.location = window.location.href + '/game';
        });
    }
    $scope.fire = function(){
        var fireCoords = { "fireX" : $("#fireX").val(), "fireY" : $("#fireY").val()}
        console.log(fireCoords);
    };
}]);





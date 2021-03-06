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
    .when('/:name/game/fire', {
        templateUrl : 'fire'
    })
    .when('/gameover', {
        templateUrl : 'gameover'
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
        // Remove jQuery
        var coords = [
            { "x" : $("#ship-0x").val(), "y" : $("#ship-0y").val()},
            { "x" : $("#ship-1x").val(), "y" : $("#ship-1y").val()},
            { "x" : $("#ship-2x").val(), "y" : $("#ship-2y").val()},
            { "x" : $("#ship-3x").val(), "y" : $("#ship-3y").val()},
            { "x" : $("#ship-4x").val(), "y" : $("#ship-4y").val()},
            { "x" : $("#ship-5x").val(), "y" : $("#ship-5y").val()},
            { "x" : $("#ship-6x").val(), "y" : $("#ship-6y").val()},
            { "x" : $("#ship-7x").val(), "y" : $("#ship-7y").val()},
            { "x" : $("#ship-8x").val(), "y" : $("#ship-8y").val()},
            { "x" : $("#ship-9x").val(), "y" : $("#ship-9y").val()}
        ];
        $http.post('/:name/game', coords).success(function(res){
            // Use $location
            window.location = window.location.href + '/game';
        });
    }
    $scope.fire = function(){
        // Remove jQuery
        var fireCoords = { "fireX" : $("#fireX").val(), "fireY" : $("#fireY").val()}
        $http.post('/:name/game/fire', fireCoords).success(function(res){
            if(res.playerWon == true){
                window.location = window.location.href + '/win';
            } else if(res.cpuWon == true){
                window.location = window.location.href + '/lose';
            }
            $("#yourResult").html(res.message + " The CPU has " + res.cpuShipsLeft + " ships left.");
            $("#cpuResult").html("The enemy shot at: " + res.cpuX + ", " + res.cpuY + ". You have " + res.playerShipsLeft + " ships left.");
        });
    };

    $scope.quit = function(){
        window.location = '/';
    };

}]);





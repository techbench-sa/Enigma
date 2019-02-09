/*
	Hackathon points dashboared

	Single page web app based on AngularJS

	Author: Ghazi Alghamdi

*/

(function() {
    var app = angular.module('hackathon', []);

    app.controller('gameController', ['$http', '$interval', function($http,$interval){
        var game = this;
        game.players = [];
        $http.get('getPlayers.php').success(function(data){
            game.players = data;
        });

        $interval(function() {
            $http.get('getPlayers.php').success(function(data){
                game.players = data;
                console.log("Update occurred");
            });
        }, 10000); 
        //30 seconds
        game.heat = function(number){
            if (number == 0){
                return "darken-4"
            }
            if (number == 1){
                return "darken-3"
            }
            if (number == 2){
                return "darken-2"
            }

            if (number == 3){
                return "darken-1"
            }
                        if (number == 4){
                return "lighten-1"
            }
            
          if (number == 4){
                return "lighten-2"
            }

            return "lighten-2"

        }
    }]);

    app.controller('playersController', ['$scope','$http', function($scope,$http) {

        var t = this;
        t.player = {};
        t.player.points = 0;

        this.addPlayer = function() {

            $http({method:'POST', url:'./addPlayer.php', params: t.player}).
            success(function(data) {
                $scope.game.players = data;

                t.player = {};
            }).
            error(function(data, status, headers, config) {
                alert("Unable to connect to server, please check your connection. Error: "+status);
            });

        };

    }]);

    app.controller('editController', ['$scope','$http', function($scope,$http) {
        var e = this;
        e.point = 0;
        this.show = false;
        var sc = $scope.game.players;


        this.add = function(player) {

            var p = e.point;
            if(angular.isNumber(p) && p != NaN){

                player.points +=p;
                $http({method:'POST', url:'./updatePoints.php', params: player}).
                success(function(data) {

                }).
                error(function(data, status, headers, config) {
                    alert("Unable to connect to server, please check your connection. Error: "+status);
                });
                this.show = !this.show;
                this.point = 0;
            }

        };

        this.subtract = function(player) {
            var p = this.point;
            if(angular.isNumber(p) && p != NaN){
                player.points -= p; // (parseInt(player.points,10)-parseInt(this.point,10));
                $http({method:'POST', url:'./updatePoints.php', params: player}).
                success(function(data) {

                }).
                error(function(data, status, headers, config) {
                    alert("Unable to connect to server, please check your connection. Error: "+status);
                });
                this.show = !this.show;
                this.point = 0;
            }
        };

        this.toggle = function(player){
            this.show = !this.show;
        }
    }]);

    app.directive("editPlayer", function() {
        return {
            restrict: "A",
            templateUrl: "edit.html",
            controller: "editController",
            controllerAs: "editor"
        };
    });


})();
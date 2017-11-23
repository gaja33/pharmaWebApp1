'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
    .controller('HomeCtrl', function ($scope,$http) {
        $http.get('/api/CategoryNames').then(function(resp){
			console.log("resp",resp.data)
			$scope.categoryNames = resp.data;
		})
    });

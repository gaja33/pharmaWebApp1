'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
	.controller('ModifyCategoryCtrl', function ($scope, $http, $location, $timeout, $routeParams) {

			$scope.Update = true;
			$scope.Add = false;
		
		$scope.category = {};
		
		var currentId = $routeParams.id;
			$http.get('/api/CategoryNames/'+currentId).then(function(resp){
				console.log(resp)
				$scope.category = resp.data;
			})
		
		
		$scope.categoryUpdate = function (obj) {
			console.log("obj", obj)
			$http.put('/api/CategoryNames', obj).then(function (resp) {
				if (resp.status == 200) {
					$scope.category = {};
					$scope.Category.$setPristine();
					$scope.Category.$setUntouched();
					
					$timeout(function(){
						$location.path('/view-category')
					},500)
					
				}
			})
		}
		
		
		
	});

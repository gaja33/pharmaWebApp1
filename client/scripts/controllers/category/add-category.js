'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
	.controller('AddCategoryCtrl', function ($scope,$rootScope, $http, $location, $timeout, $routeParams) {
		
			$scope.Update = false;
			$scope.Add = true;
		if($location.path() == '/add-category'){
			$rootScope.active = 'active';
		}
		
		$scope.category = {};

		$scope.categorySave = function (obj) {
			console.log("obj", obj)
			$http.post('/api/CategoryNames', obj).then(function (resp) {
				console.log("resp", resp)
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

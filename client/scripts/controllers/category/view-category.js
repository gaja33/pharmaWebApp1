'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
	.controller('ViewCategoryCtrl', function ($scope, $http, $route) {
		$http.get('/api/CategoryNames').then(function (resp) {
			console.log("resp", resp)
			$scope.categoryNames = resp.data;
		})
	
	
		$scope.deleteCategory = function (item) {
            console.log("item", item);
            $http.delete('api/CategoryNames/' + item).then(function (res) {
                console.log("res", res);
				$route.reload();
            })
        };
	
	});

'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
	.controller('ViewSupplierCtrl', function ($scope, $http, $route) {
		$http.get('/api/suppliers').then(function (resp) {
			console.log("resp", resp)
			$scope.suppliers = resp.data;
		})
	
	
		$scope.deleteCategory = function (item) {
            console.log("item", item);
            $http.delete('api/suppliers/' + item).then(function (res) {
                console.log("res", res);
				$route.reload();
            })
        };
	
	});

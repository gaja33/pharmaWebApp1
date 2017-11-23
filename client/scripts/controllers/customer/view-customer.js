'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
	.controller('ViewCustomerCtrl', function ($scope, $http, $route) {
		$http.get('/api/customers').then(function (resp) {
			console.log("resp", resp)
			$scope.customers = resp.data;
		})
	
	
		$scope.deleteCategory = function (item) {
            console.log("item", item);
            $http.delete('api/customers/' + item).then(function (res) {
                console.log("res", res);
				$route.reload();
            })
        };
	
	});

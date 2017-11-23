'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
	.controller('AddCustomerCtrl', function ($scope, $rootScope, $http, $location, $timeout, $routeParams) {

		$scope.Update = false;
		$scope.Add = true;

		$scope.customer = {};

		$scope.customerSave = function (obj) {
			console.log("obj", obj)
			$http.post('/api/customers', obj).then(function (resp) {
				console.log("resp", resp)
				if (resp.status == 200) {
					$scope.customer = {};
					$scope.Customer.$setPristine();
					$scope.Customer.$setUntouched();

					$timeout(function () {
						$location.path('/view-customer')
					}, 500)

				}
			})
		}


	});

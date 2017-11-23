'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
	.controller('AddPurchaseCtrl', function ($scope, $rootScope, $http, $location, $timeout, $routeParams) {

		$scope.Update = false;
		$scope.Add = true;

		$scope.purchase = {};
	
		$http.get('/api/suppliers').then(function (resp) {
			console.log("resp", resp)
			$scope.supplierNames = resp.data;
		})

		$scope.purchaseSave = function (obj) {
			console.log("obj", obj)
			$http.post('/api/purchases', obj).then(function (resp) {
				console.log("resp", resp)
				if (resp.status == 200) {
					$scope.purchase = {};
					$scope.Purchase.$setPristine();
					$scope.Purchase.$setUntouched();

					$timeout(function () {
						$location.path('/view-purchase')
					}, 500)

				}
			})
		}


	});

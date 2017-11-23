'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
	.controller('ModifyCustomerCtrl', function ($scope, $http, $location, $timeout, $routeParams) {

			$scope.Update = true;
			$scope.Add = false;
		
		$scope.customer = {};
		
		var currentId = $routeParams.id;
			$http.get('/api/customers/'+currentId).then(function(resp){
				console.log(resp)
				$scope.customer = resp.data;
			})
		
		
		$scope.customerUpdate = function (obj) {
			console.log("obj", obj)
			$http.put('/api/customers', obj).then(function (resp) {
				if (resp.status == 200) {
					$scope.customer = {};
					$scope.Customer.$setPristine();
					$scope.Customer.$setUntouched();
					
					$timeout(function(){
						$location.path('/view-customer')
					},500)
					
				}
			})
		}
		
		
		
	});

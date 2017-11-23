'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
    .controller('AddSaleCtrl', function ($scope, $http, $timeout) {

        $scope.sale = {};

       
        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.getLocation = function (val) {

            var URL = '/api/medicines?filter[where][medicineName][like]=%' + val + '%';
            return $http.get(URL).then(function (response) {
                //console.log(response)
                return response.data;
            });
        };

        $scope.onMedSelect = function (item, model, label, event) {
            //console.log("item", item)
            //console.log("model", model)
            //console.log("label", label)
            //console.log("event", event)



            $scope.sale = item;
            $scope.sale.expDate = new Date(item.expDate);
        }

        $scope.calculateTotal = function (val) {
            $scope.sale.amount = val * $scope.sale.selPrice;
            console.log("$scope.sale.amount", $scope.sale.amount)
        }

        $scope.checkForDuplicate = function(sourceArray, val) {
            for (var i = 0; i < sourceArray.length; i++) {
                if (sourceArray[i].id == val.id) {
                    return "exist"
                } else {
                    return "not exist"
                }
            }
        }

        $scope.tableData = [];
        $scope.loopData = [];

        $scope.addToTable = function (obj) {

            var dataToPushed = angular.copy(obj);
            if ($scope.tableData.length != 0) {

                var booleanData = $scope.checkForDuplicate($scope.tableData, obj);

                if (booleanData == "not exist") {
                    $scope.tableData.push(dataToPushed);
                    $scope.loopData = angular.copy($scope.tableData);
                } else {
                    console.log("exist")
                }
            } else {
                $scope.tableData.push(dataToPushed);
                $scope.loopData = angular.copy($scope.tableData);
            }

        }
		
		 $scope.showEditFlag = false;
	
		$scope.showEdit = function(){
			$scope.showEditFlag = true;
		}
		
		$scope.saveEditedData = function(edited){
			$scope.showEditFlag = false;
			console.log("edited",edited);
			console.log("$scope.tableData",$scope.tableData);
			$scope.tableData[0].amount = $scope.tableData[0].selPrice * edited.currQuantity;
			
		}

    });

'use strict';

/**
 * @ngdoc function
 * @name jewelleryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jewelleryApp
 */
angular.module('kamakshiJewellersApp')
    .controller('AddSaleCtrl', function ($scope, $http, $timeout, $route) {

        $scope.sale = {};
        $scope.invoiceDate = new Date();

        $http.get('/api/sales').then(function (resp) {
            console.log("saleR", resp.data)
            if (resp.data.length == 0) {
                $scope.invoice = 1001;
            } else {
                $http.get('/api/sales?filter[order]=invoice%20DESC&filter[limit]=1').then(function (resp) {
                    console.log("invoice", resp.data[0])

                    $scope.invoice = resp.data[0].invoice + 1;

                });
            }
        })


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

            if (item.quantity == 0) {
                $scope.sale = item;
                $scope.sale.expDate = new Date(item.expDate);

                console.log("Out od Stock")
            } else {
                $scope.sale = item;
                $scope.sale.expDate = new Date(item.expDate);
            }
        }

        $scope.calculateTotal = function (val) {
            $scope.sale.amount = val * $scope.sale.selPrice;
            console.log("$scope.sale.amount", $scope.sale.amount)
        }

        $scope.checkForDuplicate = function (sourceArray, val) {

            for (var i = 0; i < sourceArray.length; i++) {
                if (sourceArray[i].id == val.id) {
                    i = sourceArray.length - 1;
                    if (i == sourceArray.length - 1) {
                        return "exist"
                    }
                } else {
                    if (i == sourceArray.length - 1) {
                        return "not exist"
                    }

                }
            }

        }

        $scope.tableData = [];
        $scope.loopData = [];


        $scope.addToTable = function (obj, inv,invDate) {
            obj.invoice = inv;
            obj.invoiceDate = invDate;
            
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

            $scope.sale = {};
            console.log("$scope.tableData", $scope.tableData);

            $scope.totalAmount = 0;
            for (var i = 0; i < $scope.tableData.length; i++) {
                $scope.totalAmount += $scope.tableData[i].amount;
            }
            console.log("$scope.totalAmount", $scope.totalAmount);
        }


        $scope.delItem = function (idx) {
            $scope.tableData.splice(idx, 1);
            $scope.totalAmount = 0;
            for (var i = 0; i < $scope.tableData.length; i++) {
                $scope.totalAmount += $scope.tableData[i].amount;
            }
        }

        $scope.showEditFlag = false;

        $scope.showEdit = function (idx) {
            $scope.editIndex = idx;
            $scope.showEditFlag = true;
        }

        $scope.saveEditedData = function (idx, edited) {
            $scope.editIndex = -1;
            $scope.showEditFlag = false;
            console.log("edited", edited);
            console.log("$scope.tableData", $scope.tableData);
            $scope.tableData[idx].amount = $scope.tableData[idx].selPrice * edited.currQuantity;

        }

        $scope.calculateGrandAmount = function (dis) {
            $scope.disAmount = ($scope.totalAmount * parseInt(dis)) / 100;

            $scope.grandAmount = $scope.totalAmount - $scope.disAmount;
        }

        $scope.saveSalesDetails = function (arr) {
            console.log("sale", arr)

            $http.post('/api/sales', arr).then(function (resp) {
                console.log("saleresp", resp)
            })
        }



        $scope.printData = function (arr) {
            console.log("arr1", arr)


            var divToPrint = document.getElementById("printTable");
            var newWin = window.open("");
            //console.log(divToPrint)
            newWin.document.write(divToPrint.outerHTML);
            newWin.print();
            newWin.close();

            var r = confirm("Did you print the bill?");
            if (r == true) {

                for (var i = 0; i < arr.length; i++) {
                    arr[i].medicineid = arr[i].id;

                    var quan = arr[i].quantity - arr[i].currQuantity;
                    $http.put('/api/medicines/' + arr[i].id, {
                        "quantity": quan
                    }).then(function (resp) {
                        console.log("saleresp", resp)
                    })
                }


                for (var j = 0; j < arr.length; j++) {
                    delete arr[j].id;
                }

                console.log("PostArray", arr)

                $http.post('/api/sales', arr).then(function (resp) {
                    console.log("saleresp", resp)
                })

                $route.reload();
            } else {
                console.log("Canceled")
            }

        }


        /**/



    });

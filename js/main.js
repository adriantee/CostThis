/* Author: Adrian Tee (Jan 2016)
======================================
-References:
http://www.kinvey.com/app-cost-estimator
http://www.formotus.com/14018/blog-mobility/figuring-the-costs-of-custom-mobile-business-app-development
http://www.otreva.com/calculator/#
* Each resource: 160 h per month
====================================== */ 

angular.module('mainApp', ['ui.bootstrap-slider'])
	.config(function(){

	})
	.run(function($rootScope){

	})
	.controller('MainController', function($scope, $rootScope){

			// json items
			$scope.hourRate = 0;
			$scope.project_type = [];
			$scope.platform_type = [];
			$scope.feature_type = [];
			// selection
			$scope.selected = {project:0, platform: 0}; 
			$scope.numPages = 25;
			$scope.numRefPages = 20; // 80% of page num ?
			$scope.newProject = true; //switch
			$scope.featurecart = [];
			
			// calculation
			$scope.basehours = 0;
			$scope.pagehours = 0;
			$scope.feathours = 0;
			$scope.costmultiplier = 0;

			$scope.totalhours = 0;
			$scope.totalcost = 0;
			$scope.basicPageHourCost = 0.5; // 1 page takes how many hours to create
			
			// get settings
			$.ajax({
				type: "GET",
				url: "settings.json"

			}).done(function(data) {
				console.log(data);

				$scope.project_type = data.projects;
				$scope.platform_type = data.platforms;
				$scope.feature_type = data.features;
				$scope.hourRate = data.hourly_rate;

				for(var i in $scope.feature_type){
					$scope.featurecart[i]={id:i, selected:false};
				}
				// console.log($scope.featurecart);

				$scope.$apply();

			}).error(function(data){
				console.warn("error");				
			});


			// +++++++++++++++++++ FUNCTIONS DEFINITION BELOW +++++++++++++++++++
			$scope.refreshCost = function(){
				console.info("refresh cost");
				// 1.project type
				// 2.platform
				// 2b.page num
				// 3.feature
				$scope.basehours = $scope.project_type[$scope.selected.project].base_hours;
				$scope.pagehours = $scope.basicPageHourCost * ($scope.numPages + ($scope.numRefPages * 0.5));
				$scope.costmultiplier = $scope.platform_type[$scope.selected.platform].multiplier;
				$scope.feathours = 0;

				for(var i in $scope.featurecart){
					var obj=$scope.featurecart[i];
					// console.log(obj.selected, obj);
					if(obj.selected){
						if($scope.feature_type[i].hours){
							// console.log("hours");
							$scope.feathours += $scope.feature_type[i].hours;	
						}else if($scope.feature_type[i].multiplier){
							// console.log("multiplier");
							$scope.costmultiplier *= $scope.feature_type[i].multiplier;
						}						
					}

				}
				// (BASE HOURS + PAGE HOURS + FEAT HOURS) X MULTIPLIER X HOUR RATE = $ TOTAL COST

				console.log("base",$scope.basehours);
				console.log("pagehours",$scope.pagehours);
				console.log("feathours",$scope.feathours);
				console.log("costmultiplier",$scope.costmultiplier);

				$scope.totalhours = ($scope.basehours + $scope.pagehours + $scope.feathours) * $scope.costmultiplier;
				$scope.totalcost = $scope.totalhours * $scope.hourRate;
				console.log("hours",Math.ceil($scope.totalhours) , "cost", $scope.totalcost);
			}
			$scope.toggleFeature = function(n){
				$scope.featurecart[n].selected=!$scope.featurecart[n].selected;
			}




});















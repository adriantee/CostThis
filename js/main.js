/* Author: Adrian Tee (Aug 2014)
======================================
-References:
http://www.kinvey.com/app-cost-estimator
http://www.formotus.com/14018/blog-mobility/figuring-the-costs-of-custom-mobile-business-app-development
http://www.otreva.com/calculator/#
====================================== */ 

var mainApp = angular.module('mainApp', ["ngAnimate"]);

var controllers = {};

controllers.MainController = function($scope) {
	
	// $scope.platform_iphone = false;
	// $scope.platform_ipad = false;
	// $scope.platform_android = false;

	$scope.basiccart = [];
	$scope.featurecart = [];

	// $scope.basecost = 1500;
	$scope.personnel = 3;
	$scope.totalhours = 0;
	$scope.totalcost = 0;
	$scope.newconcept = false;
	$scope.complexity = 1;
	$scope.layoutdesc = ['screens (basic)','screens (mixed)','screens (advanced)'];
	$scope.creativedesc = ['New creative concept','Adaptation of creative'];
	$scope.feature_selected = {
		'iphone':false,
		'ipad':true,
		'irep':false,
		'android':false,
		'androidtab':false,
		'custom_ui':false,
		'login_email':false,
		'login_social':false,
		'userprofile':false,
		'pdfpopup':false,
		'message':false,
		'pushno':false,
		'share':false,
		'armarker':false,
		'qrcode':false,
		'drseg':false,
		'3dmodel':false,
		'3danim':false,
		'analytic':false,
		'geomap':false,
		'audio':false,
		'gallery':false,
		'3rdparty':false,
		'quiz':false,
		'survey':false,
		'stencil':false,
		'game':false,
		'usermg':false,
		'datacoll':false,
		'cms':false,
		'datasync':false,
		'dashboard':false,
		'deploy_store':false,
		'deploy_internal':false
	};
	$scope.hoursrequired = {
		'iphone':39,
		'ipad':39,
		'irep':41,
		'android':43,
		'androidtab':43,
		'custom_ui':17,
		'userprofile':18,
		'login_email':22,
		'login_social':16,
		'pdfpopup':3,
		'message':28,
		'pushno':12,
		'share':8,
		'armarker':32,
		'qrcode':24,
		'drseg':33,
		'3dmodel':30,
		'3danim':38,
		'analytic':16,
		'geomap':14,
		'audio':12,
		'gallery':20,
		'3rdparty':24,
		'quiz':15,		//quiz doesnt have results from others
		'survey':20,	//survey gets results from others
		'stencil':5,
		'game':40,
		'usermg':18,
		'datacoll':18,
		'cms':33,
		'datasync':16,
		'dashboard':16,
		'deploy_store':5,
		'deploy_internal':7
	};
	$scope.featuredesc = {
		'iphone':'iPhone App Framework',
		'ipad':'iPad App Framework',
		'irep':'iRep Framework & Packaging',
		'android':'Android Phone Framework',
		'androidtab':'Android Tablet Framework',
		'custom_ui':'Customised Layout',
		'userprofile':'User Profiles',
		'login_email':'Email Login',
		'login_social':'Social Media Login',
		'pdfpopup':'PDF Popup',
		'pushno':'Push Notification',
		'message':'In-App Messaging',
		'share':'Social Media Sharing',
		'armarker':'Augmented Reality',
		'qrcode':'QR Code',
		'drseg':'Doctor Segmentation',
		'3dmodel':'3D Model',
		'3danim':'3D Animation',
		'analytic':'Analytic',
		'geomap':'Geolocation & Map',
		'audio':'Audio / Music',
		'gallery':'Photo/Video Gallery',
		'3rdparty':'3rd Party API',
		'quiz':'Quiz',		//quiz doesnt have results from others
		'survey':'Survey',	//survey gets results from others
		'stencil':'Stencil',
		'game':'Mini-game',
		'usermg':'User Management',
		'datacoll':'Data Collection',
		'cms':'Content Management System',
		'datasync':'Data Syncing',
		'dashboard':'Admin Dashboard',
		'deploy_store':'',
		'deploy_internal':'App Deployment'
	};
	$scope.hourlyrate = 85; // DL
	$scope.hourlyrateStudio = 70; 
	$scope.hourlyrateCreative = 150; 
	$scope.basicPageHourCost = 0.83; // 1 page takes how many hours to create
	$scope.animatedPageHourCost = 1.2; //
	// $scope.creativePageHourCost = 0.5;

	// +++++++++++++++++++ FUNCTIONS DEFINITION BELOW +++++++++++++++++++

	$scope.refreshCost = function(){
		// console.log('refresh');
		$scope.personnel = 3;
		$scope.totalhours = 0;
		$scope.totalcost = 0;
		$scope.itemcost = 0;
		$scope.basiccart = [];
		$scope.featurecart = [];

		//feature cost
		for (test in $scope.feature_selected) {
			// console.log(test + " > " + $scope.feature_selected[test]);
			if($scope.feature_selected[test]){
				$scope.itemcost = $scope.hoursrequired[test] * $scope.hourlyrate;
				$scope.totalcost += $scope.itemcost;
				$scope.totalhours += $scope.hoursrequired[test];
				$scope.featurecart.push({'desc':$scope.featuredesc[test], 'cost': $scope.itemcost});
				if(test == '3dmodel') $scope.personnel++;
				if(test == '3danim') $scope.personnel++;
			}
		};
		// console.log($scope.featurecart);

		//creative
		if($scope.newconcept==true) {
			//new
			$scope.itemcost = ($scope.hourlyrateCreative*8) + Math.ceil(parseInt($('#slider1').attr('data-slider')) * 0.3 * $scope.hourlyrateCreative);
			$scope.totalcost += $scope.itemcost;
			$scope.basiccart.push({'desc': $scope.creativedesc[0], 'cost': $scope.itemcost});
		}else{
			//adapt
			$scope.itemcost = ($scope.hourlyrateCreative*4) + Math.ceil(parseInt($('#slider1').attr('data-slider')) * 0.15 * $scope.hourlyrateCreative);
			$scope.totalcost += $scope.itemcost;
			$scope.basiccart.push({'desc': $scope.creativedesc[1], 'cost': $scope.itemcost});
		}

		//layout
		$scope.itemcost = Math.ceil(parseInt($('#slider1').attr('data-slider')) * $scope.complexity/2 * $scope.hourlyrateStudio);
		$scope.basiccart.push({'desc': 'Layout for ' + $('#slider1').attr('data-slider') + ' '+ $scope.layoutdesc[$scope.complexity-1], 'cost': $scope.itemcost});
		$scope.totalcost += $scope.itemcost;

		//basic cost
		if($scope.feature_selected['iphone'] || 
				$scope.feature_selected['ipad'] || 
				$scope.feature_selected['irep'] || 
				$scope.feature_selected['android'] || 
				$scope.feature_selected['androidtab'] || 
				$scope.feature_selected['irep']){
			$scope.itemcost = Math.ceil(parseInt($('#slider1').attr('data-slider')) * $scope.basicPageHourCost * $scope.hourlyrate);
			$scope.totalcost += $scope.itemcost;
			$scope.basiccart.push({'desc': 'Development for '+ $('#slider1').attr('data-slider')+' screens', 'cost': $scope.itemcost});
			$scope.personnel++;
			$scope.personnel++;
		}
		// $scope.totalcost += Math.ceil(parseInt($('#slider2').attr('data-slider')) * $scope.animatedPageHourCost * $scope.hourlyrate);

		$scope.totalhours += Math.ceil(parseInt($('#slider1').attr('data-slider')) * $scope.basicPageHourCost);
		// console.log('feature_selected:', $scope.feature_selected['iphone']);
		// console.log('hoursrequired:', $scope.hoursrequired['iphone']);
		$scope.totalhours = Math.ceil($scope.totalhours/4.5);
		console.log('totalcost:', $scope.totalcost);
	}

	$('[data-slider]').on('change.fndtn.slider', function(){
	  // do something when the value changes
		// console.log($('#slider1').attr('data-slider'));
		$scope.refreshCost();
		$scope.$apply();
	});

	$scope.refreshCost();

};




mainApp.controller(controllers);
// mainApp.controller('MainController', function($scope) {} );



// ++ mobile slide in
mainApp.directive("slideIn", function($animate){
  return function(scope, element, attrs) {
	 scope.$watch(attrs.slideIn, function(newVal) {
		// console.log('watched!', newVal);
		if(newVal) {
		  $animate.addClass(element, "slidein");
		} else {
		  $animate.removeClass(element, "slidein");
		}
	 })
  }
});
mainApp.animation('.slidein', function() {
	return {
		addClass: function(element, className) {
			console.log('addclass');
			// TweenMax.to(element, 1, {opacity:1});
			TweenMax.to(element, .5, {bottom:"50px"});
		 },
		removeClass: function(element, className) {
			console.log('removeclass');
			TweenMax.to(element, .5, {bottom:"-320px"});
		}/*,
		enter: function(element, done) {
			console.log('enter');
			// TweenMax.from(element, 1, {opacity:0, onComplete:done});
			// TweenMax.from(element, 1, {opacity:0, onComplete:null});
		},
		leave: function(element, done) {
			console.log('leave');
			// TweenMax.to(element, 0.5, {opacity:0, onComplete:null});
		}*/
  };
});







// ++ sliding content/posts

mainApp.directive('curPosition', function() {
	return function (scope, element, attrs) {
		scope.$watch(attrs.curPosition, function (newVal) {
			// console.log('curScrollPage:'+scope.curScrollPage);
			// console.log(element);
			if (newVal) {
				TweenMax.to(element, .5, {left:(scope.curScrollPage-1)*-313 });
				//$animate.addClass(element, "test-move");
			}
		})
	}
});

mainApp.directive('curPostPosition', function() {
	return function (scope, element, attrs) {
		scope.$watch(attrs.curPostPosition, function (newVal) {
			// console.log('curScrollPage:'+scope.curScrollPage);
			// console.log(element);
			if (newVal) {
				TweenMax.to(element, .5, {left:(scope.curRecentPost-1)*-278.5 });
				//$animate.addClass(element, "test-move");
			}
		})
	}
});








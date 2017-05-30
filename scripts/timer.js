var app = angular.module('TimerApp', ['ngMaterial']);

app.controller("TimerCtrl", function($scope, $interval) {

	$scope.startButton = "Start";
	$scope.time = 500;
	$scope.timePlaceHolder = $scope.time/100;
	$scope.timerPromise = false;
	$scope.isEditing = false;

	$scope.reset = function(){
		if ($scope.timerPromise){
			$scope.stop()
		}
		$scope.isEditing = true;
		$scope.startButton = "Start";

	}

	$scope.startButtonClick = function(){
		if ($scope.startButton == "Start") {
			$scope.isEditing = false;
			$scope.time = $scope.timePlaceHolder *100;
			$scope.startButton = "Pause";
			$scope.run();
		} else if ($scope.startButton == "Pause") {
			$scope.startButton = "Resume";
			$scope.stop()
		} else if ($scope.startButton == "Resume") {
			$scope.startButton = "Pause";
			$scope.run();
		}
	}

	$scope.tick =  function(){
		if ($scope.time == 0) {
			$scope.reset()
		} else {
			$scope.time--;
		}
	}

	$scope.run = function() {
		if (! $scope.timerPromise) {
			$scope.timerPromise = $interval($scope.tick, 10);
		}
	}

	$scope.stop = function() {
		if ($scope.timerPromise) {
			$interval.cancel($scope.timerPromise)
			$scope.timePlaceHolder = $scope.time;
			$scope.timerPromise = false;
		}
	}

	$scope.checkKey = function($event) {
		if ($event.keyCode == 13){
			$scope.isEditing = false;
			$scope.time = $scope.timePlaceHolder *100;
		} else if ($event.keyCode > 57 && $event.keyCode < 48) {
			window.alert("Numbers only.");
		}
	}
	


});
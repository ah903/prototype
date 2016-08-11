///////////////////////////////////////////////////////////////////////////////
// Event Controller
// Controller To Manage Dashboard Display of Events
///////////////////////////////////////////////////////////////////////////////
angular.module("LockChain").controller("EventController", ["$scope", "$rootScope","EventFactory", function($scope,$rootScope,EventFactory){

	console.log("Entered EventController");

	///////////////////////////////////////////////////////////////////////
	// Enumerated Status Events
	///////////////////////////////////////////////////////////////////////
	$scope.watchStatus = {
		NotWatching:"NOT WATCHING",
		Watching : "WATCHING FOR EVENTS",
		Received: "Received New Event"
	};

	$scope.eventStatus = $scope.watchStatus.NotWatching;
	var event;

	///////////////////////////////////////////////////////////////////////
	// Toggle Blockchain Event Trace
	///////////////////////////////////////////////////////////////////////
	$scope.toggleEventTrace = function(){
		//if($scope.eventStatus == $scope.watchStatus.NotWatching){
		//	startEventTrace();
		//}
		//else{
		//	stopEventTrace();
		//}
		getTransactionLog();
		getEventLog();
	}

	function getTransactionLog(){
		var lockAPIContract = LockAPI.deployed();
		var filterOptions  = {address: lockAPIContract.address, fromBlock: 0, toBlock: 'latest'};
		EventFactory.getTransactionLog(filterOptions,function(error,result){
			console.log(result);	
		});
	}

	function getEventLog(){
		var lockAPIContract = LockAPI.deployed();
		var filterOptions  = {address: lockAPIContract.address, fromBlock: 0, toBlock: 'latest'};
		EventFactory.getEventLog(filterOptions,function(error,result){
			console.log(result);	
		});
	}

	///////////////////////////////////////////////////////////////////////
	// Start Blockchain Event Trace
	///////////////////////////////////////////////////////////////////////
	function startEventTrace(){
	
		///////////////////////////////////////////////////////////////////////
		// Register A New Event With the Factory 
		///////////////////////////////////////////////////////////////////////
		event = EventFactory.registerForEvents();
		$scope.eventStatus = $scope.watchStatus.Watching;

		///////////////////////////////////////////////////////////////////////
		// Start Watching for Events 
		///////////////////////////////////////////////////////////////////////
		EventFactory.startWatching(event, function(error, result){
			if(!error){
				result.args.messageToAscii=web3.toAscii(result.args.message);
				$scope.$apply(function(){
					$scope.eventStatus = $scope.watchStatus.Received + " " + result.event;
		        	$scope.event = result;
		        });
			}

		});		
	}

	///////////////////////////////////////////////////////////////////////
	// Stop Blockchain Event Trace
	///////////////////////////////////////////////////////////////////////
	function stopEventTrace(){

		EventFactory.stopWatching(event);
		$scope.eventStatus = $scope.watchStatus.NotWatching;
		
	}


}]);
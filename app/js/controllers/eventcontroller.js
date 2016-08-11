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
	$scope.eventLog = getEventLog();
	$scope.transactionLog = null;
	var eventWatcher;

	///////////////////////////////////////////////////////////////////////
	// Toggle Blockchain Event Trace
	///////////////////////////////////////////////////////////////////////
	$scope.toggleEventTrace = function(){
		if($scope.eventStatus == $scope.watchStatus.NotWatching){
			startEventWatch();
		}
		else{
			stopEventWatch();
		}
		//getTransactionLog();
		//getEventLog();
	}

	///////////////////////////////////////////////////////////////////////
	// Covefrsion Utility For Displaying Hex Strings As Text
	///////////////////////////////////////////////////////////////////////
	$scope.toAscii = function(item){
		console.log(item);
		if(item){return web3.toAscii(item)};
	}

	///////////////////////////////////////////////////////////////////////
	// Get Blockchain Transaction Log
	///////////////////////////////////////////////////////////////////////
	function getTransactionLog(){
		var lockAPIContract = LockAPI.deployed();
		var lastBlock = web3.eth.getBlock("latest").transactions[0].blockNumber;
		var filterOptions  = {address: lockAPIContract.address, fromBlock: lastBlock-20, toBlock: 'latest'};
		EventFactory.getTransactionLog(filterOptions,function(error,result){
			$scope.transactionLog=result;	
			console.log(result);
		});
	}

	///////////////////////////////////////////////////////////////////////
	// Get Blockchain Event Log
	///////////////////////////////////////////////////////////////////////
	function getEventLog(){
		var lockAPIContract = LockAPI.deployed();
		var lastBlock = web3.eth.getBlock("latest").transactions[0].blockNumber;
		var filterOptions  = {address: lockAPIContract.address, fromBlock: lastBlock-20, toBlock: 'latest'};
		EventFactory.getEventLog(filterOptions,function(error,result){
			$scope.eventLog = result;
			console.log(result);	
		});
	}

	///////////////////////////////////////////////////////////////////////
	// Start Blockchain Event Trace
	///////////////////////////////////////////////////////////////////////
	function startEventWatch(){
	
		///////////////////////////////////////////////////////////////////
		// Register A New Event With the Factory 
		///////////////////////////////////////////////////////////////////
		eventWatcher = EventFactory.registerForEvents();
		$scope.eventStatus = $scope.watchStatus.Watching;

		///////////////////////////////////////////////////////////////////
		// Start Watching for Events 
		///////////////////////////////////////////////////////////////////
		EventFactory.startWatching(eventWatcher, function(error, result){
			if(!error){
				//result.args.messageToAscii=web3.toAscii(result.args.message);
				$scope.$apply(function(){
					$scope.eventStatus = $scope.watchStatus.Received + " " + result.event;
		        	$scope.event = result;
		        	getEventLog();
		        });
			}

		});		
	}

	///////////////////////////////////////////////////////////////////////
	// Stop Blockchain Event Trace
	///////////////////////////////////////////////////////////////////////
	function stopEventWatch(){

		EventFactory.stopWatching(eventWatcher);
		$scope.eventStatus = $scope.watchStatus.NotWatching;
		
	}

}]);
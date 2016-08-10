angular.module("LockChain").factory("EventFactory", function(){

	
	var registerForEvents = function(filterOptions){

		var lockAPIContract = LockAPI.deployed();
		var webEvent = lockAPIContract.RegisterChanged({},filterOptions);
		return webEvent;	
	};

	var startWatching =function(webEvent){
		webEvent.watch(function(error, result){
  		if (!error)
  			var resource = result.args.resource;
			var sender   = result.args.by;
			var message  = web3.toAscii(result.args.message);
			var blockNo  = result.blockNumber
    		console.log(result);
		});
	};


	var stopWatching=function(webEvent){
		webEvent.stopWatching();
	};


	var getHistory=function(webEvent){
		return webEvent.get();
	};

	return{
		registerForEvents: registerForEvents,
		startWatching:startWatching,
		stopWatching:stopWatching,
		getHistory:getHistory

	};
});


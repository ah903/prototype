///////////////////////////////////////////////////////////////////////////////
// Event Factory
// Sets Up, Shutsdown and Monitors The Blockchain for new events using
// Filters supplied by consuming applications
///////////////////////////////////////////////////////////////////////////////
angular.module("LockChain").factory("EventFactory", function(){

	///////////////////////////////////////////////////////////////////////////
	// Event Registration
	// Provides a Hook for client code to register an event
	// Returns the event instance
	///////////////////////////////////////////////////////////////////////////
	var registerForEvents = function(filterOptions){

		var lockAPIContract = LockAPI.deployed();
		var eventWatcher = lockAPIContract.StateChanged({},filterOptions);
		return eventWatcher;	
	};


	///////////////////////////////////////////////////////////////////////////
	// Event Start Watching
	// Start Watching the Event, registers a callback to return the event
	// Results so these may then be boiund to a controller
	///////////////////////////////////////////////////////////////////////////
	var startWatching =function(eventWatcher, callback){
		eventWatcher.watch(function(error, result){
  			console.log(result);
  			callback(error,result);
    	});
	};

	///////////////////////////////////////////////////////////////////////////
	// Event Stop Watching
	// Stop Watching the Event, Disables the event on the chain 
	///////////////////////////////////////////////////////////////////////////
	var stopWatching=function(eventWatcher){
		eventWatcher.stopWatching();
	};

	///////////////////////////////////////////////////////////////////////////
	// Get Event History
	// Returns the event History based on the filter options
	// Useful when not wishing to start an event
	///////////////////////////////////////////////////////////////////////////
	var getEventHistory=function(eventWatcher){
		return eventWatcher.get();
	};

	return{
		registerForEvents: registerForEvents,
		startWatching:startWatching,
		stopWatching:stopWatching,
		getEventHistory:getEventHistory

	};
});


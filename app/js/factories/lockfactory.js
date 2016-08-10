angular.module("LockChain").factory("LockFactory", function(){
	
	var lock = function(account, address, callback){
		var contract = LockManager.deployed();
		
		contract.lock(address,true, {from:account})
		.then(function(response){
			console.log("Locked Device With Tx " + response);
			callback(response);
		})
		.catch(function(e){
			console.log(e);
		});
	};

	var unlock = function(account, address, callback){
		var contract = LockManager.deployed();
		contract.unlock(address,true, {from:account})
		.then(function(response){
			console.log("Unlocked Device With Tx " + response);
			callback(response);
		})
		.catch(function(e){
			console.log(e);
		});
	};

	return{
		lock: lock,
		unlock:unlock
	};

});

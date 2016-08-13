///////////////////////////////////////////////////////////////////////////////
// Home Factory
///////////////////////////////////////////////////////////////////////////////
// LD042 Advanced Web Engineering
// Andrew Hall 2016
///////////////////////////////////////////////////////////////////////////////
angular.module("LockChain").factory("RegisterFactory", function(){
	
	///////////////////////////////////////////////////////////////////////////
	// getRegistered
	// Gets The Registered Devices For The Specified Account y calling web3 RPC
	// Interface To Blockchain
	///////////////////////////////////////////////////////////////////////////
	var getRegistered = function(){
		var contract = LockManager.deployed();
	};

	///////////////////////////////////////////////////////////////////////////
	// Register
	// Registers A New Device y calling web3 RPC
	// Interface To Blockchain
	///////////////////////////////////////////////////////////////////////////
	var register = function(account, address, callback){
		var contract = LockManager.deployed();
		
		contract.register(address,true, {from:account})
		.then(function(response){
			console.log("Registered Device With Tx " + response);
			callback(response);
		})
		.catch(function(e){
			console.log(e);
		});
	};

	///////////////////////////////////////////////////////////////////////////
	// UnRegistered
	// Unregisters A Previously Registered Device by calling web3 RPC
	// Interface To Blockchain
	///////////////////////////////////////////////////////////////////////////
	var unregister = function(account, address, callback){
		var contract = LockManager.deployed();
		contract.unregister(address,false, {from:account})
		.then(function(response){
			console.log("Unregistered Device With Tx " + response);
			callback(response);
		})
		.catch(function(e){
			console.log(e);
		});
	};

	return{
		register: register,
		unregister:unregister
	};

});

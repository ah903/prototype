///////////////////////////////////////////////////////////////////////////////
// Lock Factory
///////////////////////////////////////////////////////////////////////////////
// Manages the Lock API Smart Contract Calling the Locked and Unlocked
// Functions of the contract
///////////////////////////////////////////////////////////////////////////////
// LD042 Advanced Web Engineering
// Andrew Hall 2016
///////////////////////////////////////////////////////////////////////////////
angular.module("LockChain").factory("LockFactory", function(){
	
	///////////////////////////////////////////////////////////////////////////
	// Function Pointer Lock
	// Locks the Specified Resource by posting a trnsaction on the blockchain
	///////////////////////////////////////////////////////////////////////////
	// Parameters
	// account 	: sender account
	// address  : address of the resource to lock
	// callback : function to execute when done
	///////////////////////////////////////////////////////////////////////////
	var lock = function(account, address, callback){
		var contract = LockAPI.deployed();
		contract.Lock(address, {from:account})
		.then(function(response){
			callback(response);
		})
		.catch(function(e){
			console.log(e);
		});
	};

	///////////////////////////////////////////////////////////////////////////
	// Function Pointer Unlock
	// UnLocks the Specified Resource by posting transaction on the blockchain
	///////////////////////////////////////////////////////////////////////////
	// Parameters
	// account 	: sender account
	// address  : address of the resource to lock
	// callback : function to execute when done
	///////////////////////////////////////////////////////////////////////////
	var unlock = function(account, address, callback){
		var contract = LockAPI.deployed();
		contract.Unlock(address,{from:account})
		.then(function(response){
			callback(response);
		})
		.catch(function(e){
			console.log(e);
		});
	};

	/*var lock = function(account, address, callback){
		var contract = LockAPI.deployed();
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
		var contract = LockAPI.deployed();
		contract.unlock(address,true, {from:account})
		.then(function(response){
			console.log("Unlocked Device With Tx " + response);
			callback(response);
		})
		.catch(function(e){
			console.log(e);
		});
	};
	*/

	return{
		lock: lock,
		unlock:unlock
	};

});

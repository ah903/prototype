///////////////////////////////////////////////////////////////////////////////
// Account Factory
///////////////////////////////////////////////////////////////////////////////
// Factory To Manage User Blockchain Accounts. These are assumed to be running
// Locally on the Node although all calls are asynchronous.
// Follows standrad angular factory pattern returning an object instance
// of the interface 
///////////////////////////////////////////////////////////////////////////////
// LD042 Advanced Web Engineering
// Andrew Hall 2016
///////////////////////////////////////////////////////////////////////////////
angular.module("LockChain").factory("AccountFactory", function(){
	
	///////////////////////////////////////////////////////////////////////////
	// Function getAccounts
	///////////////////////////////////////////////////////////////////////////
	// Gets The Initial Set of Accounts Configured On The Node Using 
	// Account Factory As The Data Source. 
	///////////////////////////////////////////////////////////////////////////
	var getAccounts = function(callback){
		return web3.eth.accounts;
	};

	///////////////////////////////////////////////////////////////////////////
	// Function Initialise
	///////////////////////////////////////////////////////////////////////////
	// Gets The Initial Set of Accounts Configured On The Node Using 
	// Account Factory As The Data Source. Default account is set as
	// The accounts[0] Coinbase
	///////////////////////////////////////////////////////////////////////////
	var getDefaultAccount = function(callback){
		return web3.eth.coinbase;
	};

	return{
		getAccounts: getAccounts,
		getDefaultAccount:getDefaultAccount
	};

});

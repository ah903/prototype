angular.module("LockChain").controller("HomeController", ["$scope", "$rootScope","HomeFactory", "AccountFactory", function($scope,$rootScope,HomeFactory,ConfigFactory){


	console.log("Entered HomeController");
	$scope.accounts = ConfigFactory.getAccounts();
	$scope.defaultAccount = ConfigFactory.getDefaultAccount();
	$scope.selectedAccount = $scope.defaultAccount;
	loadDataforAccount($scope.selectedAccount);
	
	function loadDataforAccount(account){
		
		var locations = [];
		locations.push({Id:"0x94f683fe1e5cc9a1b24143b2f8b6b989b017a368", Location:"Front Gate", Description:"Front Gate Lock", Address:"0x94f683fe1e5cc9a1b24143b2f8b6b989b017a368", Locked:false});
		locations.push({Id:"0xa630192f6f6c2199365d5ee5b5c6dcdc2337f4aa", Location:"Garage", Description:"Garage Lock", Address:"0xa630192f6f6c2199365d5ee5b5c6dcdc2337f4aa", Locked:true});
		locations.push({Id:"0x1a03d157ff78930ff5baac7f4a0ce20706dce6f9", Location:"Front Door", Description:"Front Door Lock", Address:"0x1a03d157ff78930ff5baac7f4a0ce20706dce6f9", Locked:true});
		locations.push({Id:"0xc43bed3d259841940df847938af85a883321193e", Location:"Bank Door", Description:"Back Door Lock", Address:"0xc43bed3d259841940df847938af85a883321193e", Locked:true});
		if(account==$scope.accounts[2]){
		   locations.push({Id:"0x332d91f81e96bf091b967f61f64db6e7d4ee8ed5", Location:"Ground Floor", Description:"Motion Detection", Address:"0x332d91f81e96bf091b967f61f64db6e7d4ee8ed5", Locked:true});
		}
		$scope.household = locations;
	}

	$scope.selectedAccountChanged = function(){
		loadDataforAccount($scope.selectedAccount);
	}

	/*$scope.sendIt = function(){
		var contract = test.deployed();
		console.log($scope.ValueToSend);
		return contract.setData($scope.ValueToSend, {from: ConfigFactory.getDefaultAccount()}).then(function(transactionId){
			console.log(transactionId);	
		});
	}
	$scope.getItBack = function(){
		var contract = test.deployed();
		return contract.getData.call(ConfigFactory.getDefaultAccount()).then(function(data) {
        	$scope.$apply(function(){
        		$scope.ValueSet = web3.toAscii(data);
        	});
    	});
	}

	$scope.getTupleBack = function(){
		var contract = test.deployed();
		return contract.getTuple.call(ConfigFactory.getDefaultAccount()).then(function(data) {
        	$scope.$apply(function(){
        		console.log(data);
        	});
    	});
	}

	$scope.register = function(account, address){
		DeviceFactory.register(account,address,function(response){
			if(response){
				console.log("TXN = " + response)			
			}
			else{
				$scope.errorMessage=ErrorMessages.ErrorRegistrationMessage;
			}
		})
	};

	$scope.unregister = function(account, address){
		DeviceFactory.unregister(account,address,function(response){
			if(response){
				console.log("TXN = " + response)			
			}
			else{
				$scope.errorMessage=ErrorMessages.ErrorUnRegistrationMessage;
			}
		})
	};
	*/
	
}]);
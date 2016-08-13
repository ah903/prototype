angular.module("LockChain").controller("RegisterController", ["$scope", "$routeParams","RegisterFactory", "AccountFactory", function($scope,$routeParams,HomeFactory,AccountFactory){

	console.log("Entered RegisterController");
	$scope.accounts = AccountFactory.getAccounts();
	$scope.defaultAccount = AccountFactory.getDefaultAccount();
	$scope.selectedAccount=$routeParams.accountId;
	initialise();

	function initialise(){
		$scope.attributes = [];
		$scope.attributes.push({name:"Owner",value:$scope.selectedAccount,readOnly:true});
		$scope.attributes.push({name:"Description",value:"Smart Lock",readOnly:true});
		$scope.attributes.push({name:"Model",value:"TX14596V2",readOnly:true});
		$scope.attributes.push({name:"Manufacturer",value:"Samsung",readOnly:true});
	}


	$scope.addAttribute= function(){

		for(i=0; i < $scope.attributes.length; i++){
			if($scope.newAttribute.name==$scope.attributes[i].name){
				$scope.attributes[i].value=$scope.newAttribute.value;
				return;
			}
		}

		$scope.attributes.push({name:$scope.newAttribute.name,value:$scope.newAttribute.value,readOnly:true});
		$scope.newAttribute.name="";
		$scope.newAttribute.value="";			
	}
	

}]);
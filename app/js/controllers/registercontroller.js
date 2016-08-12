angular.module("LockChain").controller("RegisterController", ["$scope", "$rootScope","HomeFactory", "AccountFactory", function($scope,$rootScope,HomeFactory,ConfigFactory){

	console.log("Entered RegisterController");
	initialise();

	function initialise(){
		$scope.attributes = [];
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
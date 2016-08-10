contract Permissioned{
	
	mapping(address=>mapping(address=>bool)) public resourceOwners;
	mapping(address=>mapping(address=>bool)) public ownerResources;
	
	function Permissioned(){}

	function Grant(address resource, address to) returns (bool result){
		resourceOwners[resource][to] = true;
		ownerResources[to][resource] = true;
		result=true;
	}

	function Revoke(address resource, address from) returns (bool result){
		resourceOwners[resource][from] = false;
		ownerResources[from][resource] = false;
		result=true;
	}

	function IsAuthorised(address requester, address resource) returns (bool result){
		result = resourceOwners[resource][requester];
	}	

}
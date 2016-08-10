/////////////////////////////////////////////////////////////////////////////////
// Test Data Accounts
/////////////////////////////////////////////////////////////////////////////////
//"0xd8eb19bbaae32c36229a2c71cf434661a1df3476" device
//"0xca35b7d915458ef540ade6068dfe2f44e8fa733c" orig
//"0x14723a09acff6d2a60dcdf7aa4aff308fddc160c" granter
/////////////////////////////////////////////////////////////////////////////////
import "./Permissioned.sol";

contract LockAPIBase is Permissioned{
	
	////////////////////////////////////////////////////////////////////////////
	// Private Member Declarations
	////////////////////////////////////////////////////////////////////////////
	address public sender;
    
    ////////////////////////////////////////////////////////////////////////////
	// Overrideable Modifers
	////////////////////////////////////////////////////////////////////////////
	modifier requireAuthorisation(address resource){
        sender = msg.sender;
        if(!IsAuthorised(msg.sender,resource)) {throw;} _
    }
	////////////////////////////////////////////////////////////////////////////
	// Abstract Interface Specification
	////////////////////////////////////////////////////////////////////////////
	function Lock(address resource) requireAuthorisation(resource) returns (bool result);
	function Unlock(address resource) requireAuthorisation(resource) returns (bool result);
	function IsLocked(address resource) requireAuthorisation(resource) constant returns (bool locked);
}

contract LockAPI is LockAPIBase{

	////////////////////////////////////////////////////////////////////////////
	// Private Declarations
	////////////////////////////////////////////////////////////////////////////
	mapping(address=>bool) resourceState;


	////////////////////////////////////////////////////////////////////////////
	// Event Declarations
	////////////////////////////////////////////////////////////////////////////
	event LockStateChanged(address indexed resource, address indexed by, bytes32 message);
	event RegisterChanged(address indexed resource, address indexed by, bytes32 message);
	event Tracer(address indexed resource, address indexed by, bytes32 message);

	
    function Register(address resource){
        resourceState[resource]=false; 
        Grant(resource,msg.sender);
        RegisterChanged(resource, msg.sender, "Registered");
    }
    ////////////////////////////////////////////////////////////////////////////
	// Base Class Implementation
	////////////////////////////////////////////////////////////////////////////
	function Lock(address resource) requireAuthorisation(resource) returns (bool result){
		resourceState[resource]=false;
		LockStateChanged(resource, msg.sender, "Locked");
		result=true;
	}

	function Unlock(address resource) requireAuthorisation(resource) returns (bool result){
		resourceState[resource]=true;
		LockStateChanged(resource, msg.sender, "Unlocked");
		result=true;
	}
	
	function IsLocked(address resource) requireAuthorisation(resource) constant returns (bool locked){
		locked=!resourceState[resource];
		Tracer(resource, msg.sender,"IsLocked Query");
	}

   
}






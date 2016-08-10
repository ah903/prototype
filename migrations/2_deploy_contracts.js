module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
  //deployer.autolink();
  deployer.deploy(Disposable);
  deployer.deploy(Permissioned);
  deployer.deploy(LockAPI);
  
  
};

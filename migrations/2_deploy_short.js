var ShirleyShorToken = artifacts.require("ShirleyShorToken");
ShirleyShorToken.synchronization_timeout = 3000;

module.exports = function(deployer) {
  deployer.deploy(ShirleyShorToken);
};

var ShirleyShorArtRegistry = artifacts.require("ShirleyShorArtRegistry");
ShirleyShorArtRegistry.synchronization_timeout = 3000;

module.exports = function(deployer) {
  deployer.deploy(ShirleyShorArtRegistry);
};

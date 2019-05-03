const Migrations = artifacts.require("Migrations");
Migrations.synchronization_timeout = 3000;

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};

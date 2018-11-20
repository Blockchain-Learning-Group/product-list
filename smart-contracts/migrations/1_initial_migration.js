var Migrations = artifacts.require("./Migrations.sol");
var ProductRegistry = artifacts.require("./ProductRegistry1.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(ProductRegistry);
};
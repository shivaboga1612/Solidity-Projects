const SmartVotingSystem = artifacts.require("./SmartVotingSystem.sol");

module.exports = function (deployer) {
  deployer.deploy(SmartVotingSystem);
};

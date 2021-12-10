const UnoToken = artifacts.require("./UnoToken.sol");
const UnoTokenICO = artifacts.require("./UnoTokenICO.sol");

module.exports = function (deployer) {
  deployer.deploy(UnoToken, 100).then(()=>{
    //var tokenInstance = instance;
    const tokenPrice = 1000;
    return deployer.deploy(UnoTokenICO,tokenPrice,UnoToken.address);
  })
};

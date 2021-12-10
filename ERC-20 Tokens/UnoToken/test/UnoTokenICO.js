const UnoTokenICO = artifacts.require("./UnoTokenICO.sol");
const UnoToken = artifacts.require("./UnoToken.sol");

contract(UnoTokenICO,(accounts)=>{
    var token;
    var tokenICO;
    var admin = accounts[0];
    var buyer1 = accounts[1];
    var buyer2 = accounts[2];
    var tokensForSale = 75;
    const tokenPrice = 1000;
    var noOfTokens;

    it('ICO token transfer testcase',()=>{
        return UnoToken.deployed().then((instance)=>{
            token= instance;
            return UnoTokenICO.deployed();
        }).then((instance)=>{
            tokenICO = instance;
            return token.transfer(tokenICO.address,tokensForSale);
        }).then((receipt)=>{
            return token.balanceOf(tokenICO.address);
        }).then((result)=>{
            assert.equal(result.toNumber(),75,'No.of tokens transfer testcase')
            return tokenICO.buyTokens.call(10,{from:buyer1, value:10*tokenPrice });
        }).then((result)=>{
            assert.equal(result,true,'Token buying testcase');
            return tokenICO.buyTokens(10,{from:buyer1, value:10*tokenPrice });
        }).then((receipt)=>{
            assert.equal(receipt.logs[0].event,'Sell','Sell event trigger testcase');
            assert.equal(receipt.logs[0].args._buyer,buyer1,'buyer verification testcase');
            assert.equal(receipt.logs[0].args._value,10,'No.of tokens purchased testcase');
        })

})
})
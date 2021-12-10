var UnoToken = artifacts.require("./UnoToken.sol");

contract('UnoToken', (accounts)=>{
    var tokenInstance;
    it('initializes contract with correct values', ()=>{
        return UnoToken.deployed().then((instance)=>{
            tokenInstance = instance;
            return tokenInstance.name();

        }).then((result)=>{
            assert.equal(result,"UnoToken","Name test case");
            return tokenInstance.symbol();
        }).then((symbol)=>{
            assert.equal(symbol,"UNO", "Symbol test case");
        })
    });

    it('checks the total supply',()=>{
        return UnoToken.deployed().then((instance)=>{
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then((supply)=>{
            assert.equal(supply.toNumber(),100,"Total supply test case");
            return tokenInstance.balanceOf(accounts[0]);
        }).then((bal)=>{
            assert.equal(bal.toNumber(),100,'Admin balance test case');
        })
    });

    it('checks token transfer',()=>{
        return UnoToken.deployed().then((instance)=>{
            tokenInstance=instance;
            return tokenInstance.transfer.call(accounts[1],25,{from: accounts[0]});
        }).then((result)=>{
            assert.equal(result,true,'token transfer test case');
            return tokenInstance.transfer(accounts[1],30,{from: accounts[0]});
        }).then((receipt)=>{
            assert.equal(receipt.logs[0].event,'Transfer','Event trigger test case');
            assert.equal(receipt.logs[0].args._to, accounts[1],'To address testcase');
            assert.equal(receipt.logs[0].args._value,30,'transfer value testcase');
            return tokenInstance.balanceOf(accounts[1]);
        }).then((bal)=>{
            assert.equal(bal.toNumber(),30,'balance of _to testcase');
            return tokenInstance.balanceOf(accounts[0]);
        }).then((result)=>{
            assert.equal(result.toNumber(),70,'balance of admin after transfer testcase');
        })
    })

    it('checks allowance',()=>{
        return UnoToken.deployed().then((instance)=>{
            tokenInstance=instance;
            return tokenInstance.approve.call(accounts[2],10,{from: accounts[0]});
        }).then((success)=>{
            assert.equal(success,true,'approval success testcase')
            return tokenInstance.approve(accounts[3],20,{from:accounts[0]})
        }).then((receipt)=>{
            assert.equal(receipt.logs[0].event,'Approval','Approval event trigger testcase');
            assert.equal(receipt.logs[0].args._spender,accounts[3],'Spender testcase');
            assert.equal(receipt.logs[0].args._value.toNumber(),20,'Allowed value testcase');
        })
    })

    it('checks TransferFrom function',()=>{
        return UnoToken.deployed().then((instance)=>{
            tokenInstance= instance;
            return tokenInstance.approve(accounts[1],10,{from:accounts[0]});
        }).then(()=>{
            return tokenInstance.transferFrom.call(accounts[0],accounts[3],5,{from:accounts[1]});
        }).then((result)=>{
            assert.equal(result,true,'transferFrom testcase');
            return tokenInstance.transferFrom(accounts[0],accounts[3],5,{from:accounts[1]});
        }).then((receipt)=>{
            assert.equal(receipt.logs[0].event,'Transfer','Transfer event check testcase');
            assert.equal(receipt.logs[0].args._from,accounts[0],'_from address testcase');
            assert.equal(receipt.logs[0].args._to,accounts[3],'_to address testcase');
            assert.equal(receipt.logs[0].args._value.toNumber(),5,'_value transferred testcase');
            return tokenInstance.allowance(accounts[0],accounts[1]);
        }).then((result)=>{
            assert.equal(result.toNumber(),5,'alllowance after transfer testcase');
        })
    })


    



    

})
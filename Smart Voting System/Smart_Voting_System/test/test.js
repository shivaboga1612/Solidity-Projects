var SVS = artifacts.require("./SmartVotingSystem.sol");

contract(SVS, (accounts)=>{
    it('Contract deployed', ()=>{
        return SVS.deployed().then((instance)=>{
            contractinstance = instance;
            return contractinstance.admin();
        }).then((admin)=>{
            assert.equal(admin,accounts[0],'Test case for setting admin');
            return contractinstance.voting();
        }).then((voting)=>{
            assert.equal(voting,true,'Test case for checking if voting is started');   
        })
    })

    it('Add Candidate',()=>{
        return SVS.deployed().then((instance)=>{
            candInstance = instance;
            return candInstance.addCandidate("John","Hand",38, {from: accounts[0], value: 100});
        }).then((result)=>{
            
        })
    })
})
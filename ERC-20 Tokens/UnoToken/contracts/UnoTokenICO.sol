pragma solidity <0.9.0;

import "./UnoToken.sol";

contract UnoTokenICO{

    //********Variables*** */
    UnoToken public token;
    address public admin;
    uint256 public tokenPrice;
    uint256 public tokensSold;

     //*******events****** */
    event Sell(address indexed _buyer, uint256 _value);


    //**********Functions*************/
    constructor(uint256 _tokenPrice, UnoToken _token){
        admin = msg.sender;
        tokenPrice = _tokenPrice;
        token = _token;   
    }
    

    function buyTokens(uint256 _value) public payable returns(bool success){
        require(msg.value >=_value*tokenPrice,'Insufficent ether');
        require(token.balanceOf(address(this))>=_value,'Insufficeint tokens');
        require(token.transfer(msg.sender,_value));
        tokensSold += _value;
        emit Sell(msg.sender,_value);
        return true;
    }

    function endSale() public {
        require(msg.sender == admin,'Only admin can end the Sale');
        require(token.transfer(admin, token.balanceOf(address(this))));
        payable(admin).transfer(address(this).balance);

    }


}
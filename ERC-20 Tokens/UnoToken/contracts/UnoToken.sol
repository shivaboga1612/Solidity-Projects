pragma solidity <0.9.0;

contract UnoToken{

    //******Variables
    string public name= "UnoToken";
    string public symbol = "UNO";
    uint256 public totalSupply;
    address public admin;

    //*********Mappings
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address =>uint256)) public allowance;

    //*********Events
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);



    // *********Functions*******

    constructor(uint256 _supply){
        admin=msg.sender;
        balanceOf[admin] = _supply;
        totalSupply = _supply;
    }


    function transfer(address _to, uint256 _value) public returns(bool success){
        require(balanceOf[msg.sender]>= _value, "Insufficeint tokens");
        balanceOf[msg.sender]-= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(allowance[_from][msg.sender]>=_value,"Allowed token are insufficent");
        allowance[_from][msg.sender]-=_value;
        balanceOf[_from]-= _value;
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success){
        allowance[msg.sender][_spender]= _value;
        emit Approval(msg.sender,_spender,_value);
        return true;
    }

    



}
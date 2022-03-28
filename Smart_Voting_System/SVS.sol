pragma solidity <0.9.0;


contract SmartVotingSystem{

    uint256 noOfCandidates; // records no of candidates nominated
    uint256 totalVotes; // records total no of votes
    address admin; 
    bool voting;  // boolean variable for verifying if voting has ended or not

    constructor(){
        admin = msg.sender;
        voting = true;

    }

    // struct to store all the details of a candidate
    struct Candidate{

        string name;
        uint256 number;
        uint256 age;
        string symbol;

    }

    // modifier for allowing only owner callable functions
    modifier onlyOwner(){
        require(msg.sender == admin,"Only owner can add candidate");
        _;
    }

    // *********Mappings*********
    mapping(string => Candidate) internal candDetailsBySymbol;  // mapping for fetching candidate details by symbol
    mapping(uint256 => Candidate) internal candDetailsByNumber; // mapping for fetching candidate details by candidate number
    mapping(address => bool) internal verifyVote;               // mapping for verifying if the particular address has already voted or not
    mapping(uint256 => uint256) internal score;                 // mapping for storing no of votes for each candidate
    
    Candidate cand;
 

    //************Functions*****************

    /* function to add candidate and all his details to the database  Any candidate can nominate himself if they meet the age criteria. 
        It takes below as the input parameters and returns all details along with candidate number.
            candidate Name
            candidate Symbol
            candidate Age
       
    */

    function addCandidate(string memory _candName, string memory _candSymbol, uint256 _candAge) external payable returns(uint256,string memory,uint256,string memory){
        require(msg.value==0.01 ether,"Nomination fee is 0.01 ether");
        require(_candAge<60 && _candAge>30,"Candidate should be between 30 and 60 years to nominate");
        noOfCandidates+=1;
        cand = Candidate(_candName,noOfCandidates,_candAge,_candSymbol);
        candDetailsBySymbol[_candSymbol]=cand;
        candDetailsByNumber[noOfCandidates] = cand;
        return(noOfCandidates,_candName,_candAge,_candSymbol);

    }


    /* function to show all the details of a cadidate which takes below as input parameter
        candidate Symbol
    */

    function showCandidate(string memory _candSymbol) public returns(uint256,string memory, uint256,string memory){
         
        cand = candDetailsBySymbol[_candSymbol];
        return(cand.number,cand.name,cand.age,cand.symbol);

    }

    /* function to vote which can be accessible by everyone to record their vote and it verifies if the person has already voted or not
        and also verifies if the voting is still open. It takes below as input parameters.
            candidate Symbol
    */

    function vote(string memory _symbol) external{
        require(verifyVote[msg.sender]==false,"Your vote has already been recorded");
        require(voting==true,"Voting is ended");
        cand = candDetailsBySymbol[_symbol];
        uint256 num = cand.number;
        score[num]+=1;
        verifyVote[msg.sender]=true;
    }

    /* function to end voting and can only be called by owner which sets the voting variable to false
    */

    function endVoting() external payable onlyOwner {
        voting = false;
        payable(admin).transfer(address(this).balance);


    }

    /* function to show the final result of the voting. It shows the winner by displaying all the details of the winner along with the 
        no of votes of that candidate.
    */

    function showResult() public view onlyOwner returns(string memory,uint256,uint256,string memory,uint256){
        uint256 result=0;
        uint256 candNo ;
	    for(uint256 i=1;i<=noOfCandidates;i++)
		    if(result<score[i]){
                result=score[i];
                candNo = i;
            }
	    Candidate memory winner = candDetailsByNumber[candNo];
        return(winner.name,winner.number,winner.age,winner.symbol,score[winner.number]);
   
    }

}
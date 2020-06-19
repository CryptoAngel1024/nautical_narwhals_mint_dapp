// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "hardhat/console.sol";
contract NauticalNarwhals is ERC721, Ownable, VRFConsumerBase, ReentrancyGuard {
  using Counters for Counters.Counter;
  using Strings for uint256; //allows for uint256var.tostring()

  Counters.Counter private _mintedSupply;

  string public baseURI;
  string public notRevealedURI;
  uint256 constant TOKEN_PRICE = 0.04 ether;
  uint256 constant MAX_SUPPLY = 5757;
  uint256 constant MAX_PER_TRANSACTION = 10;
  uint256 private _randomShift;
  uint256 immutable LINK_FEE;
  bytes32 internal immutable LINK_KEY_HASH;
  address public immutable LINK_TOKEN;
  bool public paused = true ;
  bool public presale;
  bool public revealed;

  mapping(address => bool) private whitelistedAddresses;


  constructor(
    string memory _initbaseURI,
    string memory _initNotRevealedURI,
    address _LINK_TOKEN,
    address _LINK_VRF_COORDINATOR_ADDRESS,
    bytes32 _LINK_KEY_HASH,
    uint256 _LINK_FEE
  ) ERC721("Nautical Narwhals", "NN") 
  VRFConsumerBase(_LINK_VRF_COORDINATOR_ADDRESS, _LINK_TOKEN){
    baseURI = _initbaseURI;
    notRevealedURI = _initNotRevealedURI;
    LINK_TOKEN = _LINK_TOKEN;
    LINK_KEY_HASH = _LINK_KEY_HASH;
    LINK_FEE = _LINK_FEE;
  }

  function mintPreSale(uint256 _mintAmount) public payable {
    require(presale, "Presale is not active");
    require(whitelistedAddresses[msg.sender], "Sorry, no access unless you're whitelisted");
    require(msg.value == TOKEN_PRICE * _mintAmount, "Incorrect ether amount");

    _mint(_mintAmount);
  }

  function mintPublicSale(uint256 _mintAmount) public payable{
    require(!presale, "Presale is active");
    require(msg.value == TOKEN_PRICE * _mintAmount, "Incorrect ether amount");

    _mint(_mintAmount);
  }


  function isWhitelisted(address _user) external view returns (bool){
    return whitelistedAddresses[_user];
  }

  function mintedAmount() external view returns (uint256){
    return _mintedSupply.current();
  }

  /// ============ INTERNAL ============

  function _mint(uint256 _mintAmount) internal nonReentrant{
    require(!paused, "Please wait until unpaused");
    require(_mintAmount > 0, "Mint at least one token");
    require(_mintAmount <= 10, "Max 10 Allowed.");
    require(_mintedSupply.current() + _mintAmount <= MAX_SUPPLY, "Not enough tokens left to mint that many");
   
    for(uint256 i = 1; i <= _mintAmount; i++){
      _mintedSupply.increment();
      _safeMint(msg.sender, _mintedSupply.current());
    }
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  //Callback function used by Chainlink VRF Coordinator.
  function fulfillRandomness(bytes32, uint256 randomness) internal override {
    _randomShift = (randomness % MAX_SUPPLY) + 1;
  }

  /// ============ ONLY OWNER ============

  //Requests randomness from Chainlink
  function getRandomNumber() public onlyOwner returns (bytes32 requestId) {
    require(
      LINK.balanceOf(address(this)) >= LINK_FEE,
      "Not enough LINK"
    );
    return requestRandomness(LINK_KEY_HASH, LINK_FEE);
  }

  function airdrop(address[] memory _users) external onlyOwner nonReentrant{
    require(_mintedSupply.current() + _users.length <= MAX_SUPPLY, "Not this many tokens left");
    for(uint256 i = 1; i <= _users.length; i++){
      _mintedSupply.increment();
      _safeMint(_users[i-1], _mintedSupply.current());
    }
  }

  function withdraw() external onlyOwner {
    (bool success, ) = payable(owner()).call{value: address(this).balance}("");
    require(success);
  }

  function setBaseURI(string calldata _newBaseURI) external onlyOwner { 
    baseURI = _newBaseURI;
  }

  function setNotRevealedURI(string memory _notRevealedURI) external onlyOwner {
    notRevealedURI = _notRevealedURI;
  }

  function setReveal(bool _reveled) external onlyOwner {
    revealed = _reveled;
  }

  function setPresale(bool _presale) external onlyOwner {
    presale = _presale;
  }

  function setPaused(bool _paused) external onlyOwner {
    paused = _paused;
  }

  function setWhitelist(address[] calldata _users) external onlyOwner {
    for(uint256 i = 0; i < _users.length; i++){
      whitelistedAddresses[_users[i]] = true;
    }
  }

}
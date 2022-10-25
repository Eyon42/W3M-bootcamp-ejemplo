// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CatAdoption is ERC721URIStorage {
    event NewCat(uint256 catId, address poster);
    event AdoptionOffer(uint256 catId, address currentOwner);
    event Adoption(uint256 catId, address newOwner, address prevOwner);
    event Pet(uint256 catId, address petter, uint256 amount);
    event PetCollection(uint256 catId, address collecter, uint256 amount);

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => bool) private adopted;
    mapping(uint256 => uint256) private _accumulatedPets;

    constructor() ERC721("NFT", "ITM") {}

    function postCat(string memory tokenURI, bool forAdoption)
        public
        returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _tokenIds.increment();
        adopted[newItemId] = !forAdoption;
        emit NewCat(newItemId, msg.sender);
        return newItemId;
    }

    function isAdopted(uint256 catId) public view returns (bool) {
        return adopted[catId];
    }

    function adoptCat(uint256 catId) external {
        require(!isAdopted(catId), "This cat is adopted");
        emit Adoption(catId, msg.sender, ownerOf(catId));
        transferFrom(ownerOf(catId), msg.sender, catId);
    }

    function petCat(uint256 catId) external payable {
        _accumulatedPets[catId] = _accumulatedPets[catId] + msg.value;
        emit Pet(catId, msg.sender, msg.value);
    }

    function collect(uint256 catId) external {
        require(ownerOf(catId) == msg.sender, "You don't own this cat");

        uint256 amount = _accumulatedPets[catId];
        _accumulatedPets[catId] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        emit PetCollection(catId, msg.sender, amount);
        require(sent, "Failed to send Ether");
    }

    function accumulatedPets(uint256 catId) public view returns (uint256) {
        return _accumulatedPets[catId];
    }

    function giveInAdoption(uint256 catId) external {
        require(isAdopted(catId), "This cat is already listed for adoption");
        require(ownerOf(catId) == msg.sender, "This is not your cat");
        adopted[catId] = false;
        emit AdoptionOffer(catId, msg.sender);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        if (!isAdopted(tokenId)) {
            require(
                _isApprovedOrOwner(_msgSender(), tokenId),
                "ERC721: caller is not token owner nor approved"
            );
        }
        _transfer(from, to, tokenId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }
}

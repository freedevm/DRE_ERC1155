// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DRE is ERC1155, Ownable {
    string public name = "Jhandre El Ghost";
    string public symbol = "DRE";

    enum CollectionType { Music, Artwork }
    
    struct Collection {
        string baseURI;
        bool revealed;
    }
    
    mapping(CollectionType => Collection) public collections;
    mapping(uint256 => CollectionType) public tokenCollection;
    uint256 private _tokenIdCounter;
    
    constructor() ERC1155("") {
        collections[CollectionType.Music] = Collection("", false);
        collections[CollectionType.Artwork] = Collection("", false);
    }
    
    function setBaseURI(CollectionType _type, string memory _uri) external onlyOwner {
        collections[_type].baseURI = _uri;
    }
    
    function reveal(CollectionType _type) external onlyOwner {
        collections[_type].revealed = true;
    }
    
    function mint(address to, uint256 amount, CollectionType _type) external onlyOwner {
        uint256 tokenId = _tokenIdCounter++;
        tokenCollection[tokenId] = _type;
        _mint(to, tokenId, amount, "");
    }
    
    function uri(uint256 tokenId) public view override returns (string memory) {
        CollectionType _type = tokenCollection[tokenId];
        Collection memory collection = collections[_type];
        
        require(bytes(collection.baseURI).length > 0, "Base URI not set");
        
        if (!collection.revealed) {
            return string(abi.encodePacked(collection.baseURI, "hidden.json"));
        }
        return string(abi.encodePacked(collection.baseURI, Strings.toString(tokenId), ".json"));
    }
}

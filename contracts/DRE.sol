// SPDX-License-Identifier: MIT
//  ██████╗ ██████╗ ███████╗
//  ██╔══██╗██╔══██╗██╔════╝
//  ██████╔╝██████╔╝███████╗
//  ██╔═══╝ ██╔═══╝ ╚════██║
//  ██║     ██║     ███████║
//  ╚═╝     ╚═╝     ╚══════╝
//  DRE - NFT COLLECTION CONTRACT
//  Smart Contract for ERC-1155 NFTs with Reveal Feature

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract DRE is ERC1155, Ownable {
    string public name = "Jhandre El Ghost";
    string public symbol = "DRE";

    // 🎵 Collection Types: Music & Artwork 🎨
    enum CollectionType { Music, Artwork }
    
    struct Collection {
        string baseURI;
        bool revealed;
    }

    // Mapping collections to their metadata storage
    mapping(CollectionType => Collection) public collections;
    mapping(uint256 => CollectionType) public tokenCollection;
    uint256 private _tokenIdCounter;
    
    constructor() ERC1155("") Ownable(msg.sender) {
        // Initializing both collections with empty base URIs
        collections[CollectionType.Music] = Collection("", false);
        collections[CollectionType.Artwork] = Collection("", false);
    }
    
    // 🎭 Set Base URI for a specific collection
    function setBaseURI(CollectionType _type, string memory _uri) external onlyOwner {
        collections[_type].baseURI = _uri;
    }
    
    // 🔓 Reveal NFTs for a specific collection
    function reveal(CollectionType _type) external onlyOwner {
        collections[_type].revealed = true;
    }
    
    // 🎨 Mint NFTs in a specific collection
    function mint(address to, uint256 amount, CollectionType _type) external onlyOwner {
        require(uint256(_type) < 2, "Invalid Type");

        uint256 tokenId = _tokenIdCounter++;
        tokenCollection[tokenId] = _type;
        _mint(to, tokenId, amount, "");
    }
    
    // 📜 Get the metadata URI based on whether NFTs are revealed or not
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

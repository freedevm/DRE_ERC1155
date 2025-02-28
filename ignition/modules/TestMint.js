const hre = require("hardhat");

const contractAddress = '0x5711995e40ad8eba9748fd546cd399bbb6baf15c';
const ownerAddress = '0xEA38026AF023cc689659a9D2A35046f8980821f2';

async function mint() {
    const contract = await hre.ethers.getContractAt("DRE", contractAddress);

    // await contract.mint(ownerAddress, amount, collection ID);
    // amount = 1

    await contract.mint(ownerAddress, 1, 0); // Mint 1 Music NFT
    await contract.mint(ownerAddress, 1, 1); // Mint 1 Artwork NFT

    console.log("Minted 1 Music NFT:", await dre.balanceOf(ownerAddress, 0))
    console.log("Minted 1 Artwork NFT:", await dre.balanceOf(ownerAddress, 1))

    
}
  
  mint()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

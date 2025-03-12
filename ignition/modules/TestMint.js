const hre = require("hardhat");

const contractAddress = '0x7C2a827254B7a6b8dE57F1547409c8677188A1dd';
const ownerAddress = '0xEA38026AF023cc689659a9D2A35046f8980821f2';

async function mint() {
    const dre = await hre.ethers.getContractAt("DRE", contractAddress);

    // await dre.mint(ownerAddress, amount, collection ID);
    // amount = 1

    await dre.mint(ownerAddress, 1, 0); // Mint 1 Music NFT
    // await dre.mint(ownerAddress, 1, 1); // Mint 1 Artwork NFT

    console.log("Minted 1 Music NFT:", await dre.balanceOf(ownerAddress, 0))
    // console.log("Minted 1 Artwork NFT:", await dre.balanceOf(ownerAddress, 1))

    
}
  
  mint()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

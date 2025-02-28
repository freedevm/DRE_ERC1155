const hre = require("hardhat");

const contractAddress = '0x5711995e40ad8eba9748fd546cd399bbb6baf15c';

async function mint() {
    const contract = await hre.ethers.getContractAt("DRE", contractAddress);

    await contract.reveal(0); // Reveal For Music Collection
    await contract.reveal(1); // Reveal For Artwork Collection

    console.log("Music Base URI:", await contract.uri(0))
    console.log("Artwork Base URI:", await contract.uri(1))
}
  
mint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});

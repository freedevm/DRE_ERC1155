const hre = require("hardhat");

const contractAddress = '0x5711995e40ad8eba9748fd546cd399bbb6baf15c';
const ownerAddress = '0xEA38026AF023cc689659a9D2A35046f8980821f2';
const baseUri = "https://ipfs.io/ipfs/bafybeia3tvaiuvxrq5orcg6etxw2qqmg5fw4vxq44sros3kb2wwuu5di2m/";

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

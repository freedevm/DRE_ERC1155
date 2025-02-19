const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const DRE = await hre.ethers.getContractFactory("DRE");

    // Deploy the contract
    const dre = await DRE.deploy();
    //   await dre.deployed();

    console.log(dre);
    console.log(`DRE contract deployed to: ${dre.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
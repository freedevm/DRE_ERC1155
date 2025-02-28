# DRE #

This is DRE NFT using ERC1155 smart contract.

For setting up project following this task:
```
git clone https://github.com/freedevm/DRE_ERC1155.git
cd DRE_ERC1155
cp .env.sample .env
```


```
npm install

npx hardhat compile
npx hardhat run ignition/modules/Deploy.js --network mainnet
npx hardhat verify 0xfffffffffffffffffffffff(deployed address)  --network mainnet
```

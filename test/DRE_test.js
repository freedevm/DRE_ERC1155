const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DRE Collection", function () {
    let DRE, dre, owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        DRE = await ethers.getContractFactory("DRE");
        dre = await DRE.deploy();
    });

    it("Should set the correct name and symbol", async function () {
        expect(await dre.name()).to.equal("Jhandre El Ghost");
        expect(await dre.symbol()).to.equal("DRE");
    });

    it("Should allow owner to set base URI", async function () {
        await dre.setBaseURI(0, "ipfs://test-music/");
        // expect(await dre.collections(0)).to.deep.include({ baseURI: "ipfs://test-music/" });
        const collection0 = await dre.collections(0);
        expect(collection0.baseURI).to.equal("ipfs://test-music/");
    });

    it("Should allow owner to mint NFTs", async function () {
        await dre.mint(addr1.address, 1, 0);
        expect(await dre.balanceOf(addr1.address, 0)).to.equal(1);
    });

    it("Should allow owner to mint Two NFTs", async function () {
        await dre.mint(addr1.address, 1, 0);
        expect(await dre.balanceOf(addr1.address, 0)).to.equal(1);

        await dre.mint(addr1.address, 1, 0);
        expect(await dre.balanceOf(addr1.address, 1)).to.equal(1);
    });

    it("Should return correct collection Type By TokenID", async function () {
        await dre.mint(addr1.address, 1, 0);
        expect(await dre.balanceOf(addr1.address, 0)).to.equal(1);

        await dre.mint(addr1.address, 1, 0);
        expect(await dre.balanceOf(addr1.address, 1)).to.equal(1);

        // Music Collection
        expect(await dre.tokenCollection(0)).to.equal(0);
        expect(await dre.tokenCollection(1)).to.equal(0);

        await dre.mint(addr1.address, 1, 1);
        expect(await dre.balanceOf(addr1.address, 0)).to.equal(1);

        await dre.mint(addr1.address, 1, 1);
        expect(await dre.balanceOf(addr1.address, 1)).to.equal(1);

        // Artwork Collection
        expect(await dre.tokenCollection(2)).to.equal(1);
        expect(await dre.tokenCollection(3)).to.equal(1);
    });

    it("Should return correct hidden URI before reveal", async function () {
        await dre.setBaseURI(0, "ipfs://test-music/");
        expect(await dre.uri(0)).to.equal("ipfs://test-music/hidden.json");
    });

    it("Should return correct token URI after reveal", async function () {
        await dre.setBaseURI(0, "ipfs://test-music/");
        await dre.reveal(0);
        expect(await dre.uri(0)).to.equal("ipfs://test-music/0.json");

        await dre.reveal(0);
    });
});
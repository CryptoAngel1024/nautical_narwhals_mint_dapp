// const { expect } = require("chai");
// const { ethers, waffle } = require("hardhat");
// require("dotenv").config();

// const linkArtifact = require('../frontend/src/artifacts/@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol/LinkTokenInterface.json');
// const narwhalsArtifact = require('../frontend/src/artifacts/contracts/NauticalNarwhalsNFT.sol/NauticalNarwhals.json');

// describe("Nautical Narwhals - VRF Consumer", () => {
//   const secretURI = 'secret-uri.com/';
//   const nftAddress = process.env.NFT_NARWHALS_ADDRESS;
//   const keyHash = process.env.KEY_HASH;
//   const vrfCoordinator = process.env.VRF_COORDINATOR;
//   const linkAddress = process.env.LINK_TOKEN;

//   let nft, link, owner, alice;

//   const oneNFT = 1;

//   before(async () => {
//     [owner, alice, bob, _] = await ethers.getSigners();
//     link = new ethers.Contract(linkAddress, linkArtifact.abi, waffle.provider);
//     nft = new ethers.Contract(nftAddress, narwhalsArtifact.abi, waffle.provider);

//     const tx = await nft.connect(owner).setPaused(false);
//     await tx.wait();
//   });

//   it('Should allow owner to get random number', async () => {
//     const nftLinkBalance = link.connect(owner).balanceOf(link.address);
    
//     if(nftLinkBalance < ethers.utils.parseUnits("0.1", 18)){
//       console.log("funding contract with Link")
//       const tx1 = await link.connect(owner).transfer(nft.address, ethers.utils.parseUnits("0.1", 18));
//       await tx1.wait();
//     }

//     const tx = await nft.connect(owner).getRandomNumber();
//     const receipt = await tx.wait();

//     expect(receipt.status).to.equal(1);
//   });

//   it('Should return the not reveled token URI', async () => {
//     const tx1 = await nft.connect(owner).setReveal(false);
//     await tx1.wait();

//     const tx2 = await nft.connect(alice).mintPublicSale(oneNFT, {value: ethers.utils.parseEther("0.04")});
//     await tx2.wait();
//     const lastTokenId = await nft.mintedAmount();

//     const tokenURI = await nft.tokenURI(lastTokenId);
    
//     expect(tokenURI).to.equal(secretURI)
//   });

//   it('Should return the reveled token URI', async () => {
//     const tx1 = await nft.connect(owner).setReveal(true);
//     await tx1.wait();

//     const tx2 = await nft.connect(alice).mintPublicSale(oneNFT, {value: ethers.utils.parseEther("0.04")});
//     await tx2.wait();

//     const lastTokenId = await nft.mintedAmount();
//     const tokenURI = await nft.tokenURI(lastTokenId);
    
//     expect(tokenURI).to.not.equal(secretURI)
//   });
// });
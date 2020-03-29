const { ethers } = require("hardhat");
require('dotenv').config();

const narwhalsArtifact = require('../artifacts/contracts/NauticalNarwhalsNFT.sol/NauticalNarwhals.json')
const linkArtifact = require('../artifacts/@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol/LinkTokenInterface.json');

const INFURA_URL = "https://rinkeby.infura.io/v3/" + process.env.INFURA_API_KEY;
const PK = process.env.PK;
const narwhalsAddress = process.env.NFT_NARWHALS_ADDRESS;
const linkAddress = process.env.LINK_TOKEN;


async function main() {
  const provider = await new ethers.providers.JsonRpcProvider(INFURA_URL);

  const wallet = new ethers.Wallet(PK, provider);
  const nft = new ethers.Contract(narwhalsAddress, narwhalsArtifact.abi, wallet);
  const link = new ethers.Contract(linkAddress, linkArtifact.abi, wallet);
  
  console.log(await nft.name());

  // console.log("balance owner: ", await link.balanceOf(wallet.address));
  // await link.transfer(nft.address, ethers.utils.parseUnits("0.1", 18));
  // console.log("balance nft: ", await link.balanceOf(nft.address))

  // const tx = await nft.getRandomNumber();
  // await tx.wait();

  // setTimeout(() => console.log("wait fo the Chainlink oracle to fulfill the request for a random number"), 5000);

  const randomShift = await nft.randomShift();
  console.log("randomShift: ", randomShift);


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
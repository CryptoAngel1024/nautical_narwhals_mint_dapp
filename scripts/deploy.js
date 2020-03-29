const hre = require("hardhat");

async function main(){
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance}`);

  const keyHash = process.env.KEY_HASH;
  const vrfCoordinator = process.env.VRF_COORDINATOR;
  const linkToken = process.env.LINK_TOKEN;
  const initURI = 'initial-uri.com/';
  const secretURI = 'secret-uri.com/';
  const linkFee = ethers.utils.parseUnits("0.1");

  const NauticaNarwhalsNFT = await hre.ethers.getContractFactory("NauticalNarwhals");
  const nauticaNarwhals = await NauticaNarwhalsNFT.deploy(
    initURI,
    secretURI,
    linkToken,
    vrfCoordinator,
    keyHash,
    linkFee
  );

  await nauticaNarwhals.deployed();

  console.log("NauticaNarwhalsNFT deployed to:", nauticaNarwhals.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

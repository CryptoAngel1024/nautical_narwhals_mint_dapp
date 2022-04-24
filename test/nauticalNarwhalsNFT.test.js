const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
require("dotenv").config();

const linkArtifact = require('../frontend/src/artifacts/@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol/LinkTokenInterface.json');

describe("Nautical Narwhals NFT contract", function () {
  const keyHash = process.env.KEY_HASH;
  const vrfCoordinator = process.env.VRF_COORDINATOR;
  const linkToken = process.env.LINK_TOKEN;
  const initURI = 'initial-uri.com/';
  const secretURI = 'secret-uri.com/';
  const linkFee = ethers.utils.parseUnits("0.1");

  const msg_owner = 'Ownable: caller is not the owner';
  const zeroNFT = 0;
  const oneNFT = 1;
  const twoNFT = 2;
  const tenNFT = 10;
  const elevenNFT = 11;

  let Narwhals, nft, owner, alice, bob;

  beforeEach(async () => {
    Narwhals = await ethers.getContractFactory("NauticalNarwhals");
    nft = await Narwhals.deploy(
      initURI,
      secretURI,
      linkToken,
      vrfCoordinator,
      keyHash,
      linkFee
    );
    await nft.deployed();
    [owner, alice, bob, charlie, _] = await ethers.getSigners();

    const tx = await nft.connect(owner).setPaused(false);
    await tx.wait();
  });

  describe("Deployment", () => {
    it('Should have set the right owner', async () => {
      expect(await nft.owner()).to.equal(owner.address);
    });

    it('Should have set baseURI', async () => {
      expect(await nft.baseURI()).to.equal(initURI);
    });

    it('Should have set notRevealedURI', async () => {
      expect(await nft.notRevealedURI()).to.equal(secretURI);
    });

    it('Should have set name to "Nautical Narwhals"', async () => {
      expect(await nft.name()).to.equal('Nautical Narwhals')
    });

    it('Should have set symbol to "NN"', async () => {
      expect(await nft.symbol()).to.equal('NN')
    });
  });

  describe('Whitelist', () => {
    it('Should allow owner to set the whitelist', async () => {
      const whitelist = [alice.address, bob.address];

      await nft.connect(owner).setWhitelist(whitelist);

      for(var i = 0; i < whitelist; whitelist.length){
        expect(await nft.whitelistedAddresses(whitelist[i])).to.equal(true);
      }
    });

    it('Should revert if is not the owner who is setting the whitelist', async () => {
      const whitelist = [alice.address, bob.address];

      await expect(
        nft.connect(alice).setWhitelist(whitelist)
      ).to.be.revertedWith(msg_owner);
    });

    it('Should allow anyone check if address is whitelisted', async () => {
      const tx = await nft.connect(owner).setWhitelist([alice.address]);
      await tx.wait();

      expect(await nft.isWhitelisted(alice.address)).to.equal(true);
    });
  });

  describe('Minting', () => {

    describe('On presale', () => {
      beforeEach(async () => {
        const tx1 = await nft.connect(owner).setPresale(true);
        await tx1.wait()
        const tx2 = await nft.connect(owner).setWhitelist([alice.address]);
        await tx2.wait()
      });

      it('Should fail if the minting is paused', async () => {
        const tx = await nft.connect(owner).setPaused(true);
        await tx.wait();

        await expect(
          nft.connect(alice).mintPreSale(oneNFT, {value: ethers.utils.parseEther("0.04")})
        ).to.be.revertedWith("Please wait until unpaused");
      });

      it('Should fail if the presale is not active', async () => {
        const tx1 = await nft.connect(owner).setPresale(false);
        await tx1.wait()

        await expect(
          nft.connect(alice).mintPreSale(oneNFT, {value: ethers.utils.parseEther("0.04")})
        ).to.be.revertedWith("Presale is not active");

        const tx2 = await nft.connect(owner).setPresale(true);
        await tx2.wait()
      });

      it('Should fail if the account is not whitelisted', async () => {
        await expect(
          nft.connect(owner).mintPreSale(oneNFT, {value: ethers.utils.parseEther("0.04")})
        ).to.be.revertedWith("Sorry, no access unless you're whitelisted");
      });

      it('Should fail if mint amount is less than 1', async () => {
        await expect(
          nft.connect(alice).mintPreSale(zeroNFT)
        ).to.be.revertedWith('Mint at least one token');
      });
  
      it('Should fail if sender value is not enough to buy a token for sale', async () => {
        await expect(
          nft.connect(alice).mintPreSale(oneNFT, {value: ethers.utils.parseEther("0.02")})
        ).to.be.revertedWith("Incorrect ether amount");
      });
  
      it('Should fail if a user try to mint more the max allowed per transaction ', async () => {
        await expect(
          nft.connect(alice).mintPreSale(elevenNFT, {value: ethers.utils.parseEther("0.44")})
        ).to.be.revertedWith("Max 10 Allowed.");
      });
  
      it('Should fail if total supply of tokens reaches the max amount', async () => {
        //this test take a while
        for(var i = 0; i < 575; i++){
          await nft.connect(alice).mintPreSale(tenNFT, {value: ethers.utils.parseEther("0.4")})
        }
       
        await expect(
          nft.connect(alice).mintPreSale(tenNFT, {value: ethers.utils.parseEther("0.4")})
        ).to.be.revertedWith('Not enough tokens left to mint that many');
      });

      it('Should allow whitelisted user to mint', async () => {
        const nftInitialBalance = await nft.balanceOf(alice.address);
        const initialEthBalance = await waffle.provider.getBalance(alice.address);

        const tx2 = await nft.connect(alice).mintPreSale(oneNFT, {value: ethers.utils.parseEther("0.04")});
        await tx2.wait();

        const nftFinalBalance = await nft.balanceOf(alice.address);
        const finalEthBalance = await waffle.provider.getBalance(alice.address);

        expect(finalEthBalance).to.be.within(initialEthBalance.sub(ethers.utils.parseEther("0.041")), initialEthBalance.sub(ethers.utils.parseEther("0.04")))
        expect(nftInitialBalance).to.equal(nftFinalBalance - oneNFT);
      });
    });

    describe("On public sale", () => {
      it('Should fail if the minting is paused', async () => {
        const tx = await nft.connect(owner).setPaused(true);
        await tx.wait();

        await expect(
          nft.connect(alice).mintPublicSale(oneNFT, {value: ethers.utils.parseEther("0.04")})
        ).to.be.revertedWith("Please wait until unpaused");
      });

      it('Should fail if the presale is active', async () => {
        const tx1 = await nft.connect(owner).setPresale(true);
        await tx1.wait()

        await expect(
          nft.connect(alice).mintPublicSale(oneNFT, {value: ethers.utils.parseEther("0.04")})
        ).to.be.revertedWith("Presale is active");

        const tx2 = await nft.connect(owner).setPresale(false);
        await tx2.wait()
      });

      it('Should fail if mint amount is less than 1', async () => {
        await expect(
          nft.connect(alice).mintPublicSale(zeroNFT)
        ).to.be.revertedWith('Mint at least one token');
      });
  
      it('Should fail if sender value is not enough to buy a token for sale', async () => {
        await expect(
          nft.connect(alice).mintPublicSale(oneNFT, {value: ethers.utils.parseEther("0.02")})
        ).to.be.revertedWith("Incorrect ether amount");
      });
  
      it('Should fail if a user try to mint more the max allowed per transaction ', async () => {
        await expect(
          nft.connect(alice).mintPublicSale(elevenNFT, {value: ethers.utils.parseEther("0.44")})
        ).to.be.revertedWith("Max 10 Allowed.");
      });
  
      it('Should fail if total supply of tokens reaches the max amount', async () => {
        //this test take a while
        for(var i = 0; i < 575; i++){
          await nft.connect(alice).mintPublicSale(tenNFT, {value: ethers.utils.parseEther("0.4")})
        }
       
        await expect(
          nft.connect(alice).mintPublicSale(tenNFT, {value: ethers.utils.parseEther("0.4")})
        ).to.be.revertedWith('Not enough tokens left to mint that many');
      });

      it('Should allow any user to mint', async () => {
        const nftInitialBalance = await nft.balanceOf(bob.address);
        const initialEthBalance = await waffle.provider.getBalance(bob.address);

        const tx2 = await await nft.connect(bob).mintPublicSale(twoNFT, {value: ethers.utils.parseEther("0.08")});
        await tx2.wait();
        
        const nftFinalBalance = await nft.balanceOf(bob.address);
        const finalEthBalance = await waffle.provider.getBalance(bob.address);
        
        expect(finalEthBalance).to.be.within(initialEthBalance.sub(ethers.utils.parseEther("0.081")), initialEthBalance.sub(ethers.utils.parseEther("0.08")));
        expect(nftInitialBalance).to.equal(nftFinalBalance - twoNFT);
      });
    });

  });

  describe("Airdrop", () => {
    it('Should revert if is not the owner who is calling the airdrop', async () => {
      await expect(
        nft.connect(alice).airdrop([alice.address])
      ).to.be.revertedWith(msg_owner);
    });

    it('Should allow owner to airdrop tokens to a list of users', async () => {
      const nftInitialBalanceAlice = await nft.balanceOf(alice.address);
      const nftInitialBalanceBob = await nft.balanceOf(bob.address);

      const tx = await nft.connect(owner).airdrop([alice.address, bob.address]);
      await tx.wait();

      const nftFinalBalanceAlice = await nft.balanceOf(alice.address);
      const nftFinalBalanceBob = await nft.balanceOf(bob.address);

      expect(nftInitialBalanceAlice).to.equal(nftFinalBalanceAlice - oneNFT);
      expect(nftInitialBalanceBob).to.equal(nftFinalBalanceBob - oneNFT);
    });
  });

  describe("Token URI", () => {
    it("Should fail if tokenID doesn't exist", async () => {
      await expect(
        nft.tokenURI(0)
      ).to.be.revertedWith("tokenID does not exist");
    });

    it('Should return the not reveled token URI', async () => {
      const tx2 = await nft.connect(alice).mintPublicSale(oneNFT, {value: ethers.utils.parseEther("0.04")});
      await tx2.wait();
      const tokenID = await nft.mintedAmount();
      const tokenURI = await nft.tokenURI(tokenID);
      
      expect(tokenURI).to.equal(secretURI)
    });

    it('Should return the reveled token URI', async () => {
      const tx1 = await nft.connect(owner).setReveal(true);
      await tx1.wait();

      const tx2 = await nft.connect(alice).mintPublicSale(oneNFT, {value: ethers.utils.parseEther("0.04")});
      await tx2.wait();

      const tokenID = await nft.mintedAmount();
      const tokenIdShifted = (tokenID.mod(ethers.BigNumber.from("5757"))).add(ethers.BigNumber.from("1")); // in local hardhat randomShift is 0
      const tokenURI = await nft.tokenURI(tokenID);
      
      expect(tokenURI).to.equal(initURI+String(tokenIdShifted))
    });
  });

  describe("Withdraw", () => {
    it("Should revert if is not the owner who is calling withdraw", async () => {
      await expect(
        nft.connect(alice).withdraw()
      ).to.be.revertedWith(msg_owner);
    });

    it("Should allow owner to withdraw contract balance", async () => {
      const tx1 = await nft.connect(bob).mintPublicSale(twoNFT, {value: ethers.utils.parseEther("0.08")});
      await tx1.wait();

      const contractBalance = await waffle.provider.getBalance(nft.address);
      const initialEthBalance = await waffle.provider.getBalance(owner.address);
      
      const tx2 = await nft.connect(owner).withdraw();
      await tx2.wait();

      const finalEthBalance = await waffle.provider.getBalance(owner.address);

      const minExpected = initialEthBalance.add(contractBalance.sub(ethers.utils.parseEther("0.01")));
      const maxExpected = initialEthBalance.add(contractBalance);
      expect(finalEthBalance).to.be.within(minExpected, maxExpected);
    });
  });

  describe("Token ID count", () => {
    it("Should keep token id in sync with what's been minted", async () => {
      const beforeMintedAmount = await nft.mintedAmount();

      const tx = await nft.connect(alice).mintPublicSale(twoNFT, {value: ethers.utils.parseEther("0.08")});
      await tx.wait();

      const afterMintedAmount = await nft.mintedAmount();

      expect(afterMintedAmount).to.equal(beforeMintedAmount.add(ethers.BigNumber.from(twoNFT)));
    });
  });

  describe("Setters", () => {
    it('Should revert if is not the owner who is calling the get random number', async () => {
      await expect(
        nft.connect(alice).getRandomNumber()
      ).to.be.revertedWith(msg_owner);
    });

    it('Should allow owner to pause minting', async () => {
      const tx = await nft.connect(owner).setPaused(true);
      await tx.wait();
      expect(await nft.paused()).to.equal(true);
    });

    it('Should revert if is not the owner who is setting the pause minting', async () => {
      await expect(
        nft.connect(alice).setPaused(true)
      ).to.be.revertedWith(msg_owner);
    });

    it('Should allow owner to set presale', async () => {
      const tx = await nft.connect(owner).setPresale(true);
      await tx.wait();
      expect(await nft.presale()).to.equal(true);
    });

    it('Should revert if is not the owner who is setting the presale', async () => {
      await expect(
        nft.connect(alice).setPresale(true)
      ).to.be.revertedWith(msg_owner);
    });

    it('Should allow owner to reveal baseURI', async () => {
      const tx = await nft.connect(owner).setReveal(true);
      await tx.wait();
      expect(await nft.revealed()).to.equal(true);
    });

    it('Should revert if is not the owner who is revealing the baseURI', async () => {
      await expect(
        nft.connect(alice).setReveal(true)
      ).to.be.revertedWith(msg_owner);
    });

    it('Should allow owner to set  baseURI', async () => {
      const newURI = 'new-uri.com';
      const tx = await nft.connect(owner).setBaseURI(newURI);
      await tx.wait();
      expect(await nft.baseURI()).to.equal(newURI)
    });

    it('Should revert if is not the owner who is setting the baseURI', async () => {
      const newURI = 'new-uri.com';
      await expect(
        nft.connect(alice).setNotRevealedURI(newURI)
      ).to.be.revertedWith(msg_owner)
    });

    it('Should allow owner to set placeholder URI', async () => {
      const newSecretURI = 'new-secret-uri.com';
      const tx = await nft.connect(owner).setNotRevealedURI(newSecretURI);
      await tx.wait();
      expect(await nft.notRevealedURI()).to.equal(newSecretURI)
    });

    it('Should revert if is not the owner who is setting the placeholder URI', async () => {
      const newSecretURI = 'new-secret-uri.com';
      await expect(
        nft.connect(alice).setNotRevealedURI(newSecretURI)
      ).to.be.revertedWith(msg_owner)
    });
  });

});

import { ethers } from 'ethers';

import { nftAddress, INFURA_URL } from '../config';
import nauticalNarwhals from '../artifacts/contracts/NauticalNarwhalsNFT.sol/NauticalNarwhals.json';

const PRICE = ethers.utils.parseEther("0.04");
const SUCCESS_MSG = "Success! Transaction has been submitted to the network. Please wait for confirmation on the blockchain.";
const CONFIRMED_MSG = "Transaction confirmed!"

function getContract(){
  const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);
  const nftContract = new ethers.Contract(nftAddress, nauticalNarwhals.abi, provider);
  return nftContract;
}

export async function getMintedAmount(){
  const nftContract = getContract();
  let totalMinted;
  try{
    totalMinted = await nftContract.mintedAmount();
    totalMinted = totalMinted.toString()
  } catch(error) {
    totalMinted = catchError(error)
  }
  return totalMinted;
}

export async function getPaused(){
  const nftContract = getContract();
  let isPaused;
  try{
    isPaused = await nftContract.paused();
  } catch(error){
    isPaused = catchError(error)
  }
  return isPaused;
}

export async function getPresale(){
  const nftContract = getContract();
  let isPresale;
  try{
    isPresale = await nftContract.presale();
  } catch(error){
    isPresale = catchError(error)
  }
  return isPresale;
}

export async function mintPublicSale(web3Provider, mintAmount){
  if(mintAmount < 1){
    alert("Mint amount need to be more than zero")
    return;
  }
  if(!web3Provider){
    alert("Connect to a wallet first")
    return;
  }
  const nftContract = getContract();
  const signer = web3Provider.getSigner();

  try{
    const tx = await nftContract.connect(signer).mintPublicSale(
      mintAmount, 
      {value: PRICE.mul(ethers.BigNumber.from(mintAmount))}
    );
    alert(SUCCESS_MSG);
    await tx.wait();
    alert(CONFIRMED_MSG);
    window.location.reload();
  } catch(error){
    alert(catchError(error));
  }
}

export async function mintPreSale(web3Provider, mintAmount){
  if(mintAmount < 1){
    alert("Mint amount need to be more than zero")
    return;
  }
  if(!web3Provider){
    alert("Connect to a wallet first")
    return;
  }
  const nftContract = getContract();
  const signer = web3Provider.getSigner();
  try{
    const tx = await nftContract.connect(signer).mintPreSale(
      mintAmount, 
      {value: PRICE.mul(ethers.BigNumber.from(mintAmount))}
    );
    alert(SUCCESS_MSG);
    await tx.wait();
    alert(CONFIRMED_MSG);
    window.location.reload();
  } catch(error){
    alert(catchError(error));
  }
}



function catchError(error) {
  console.error(error.message);
  // try to extract error message, otherwise return raw error
  let formatted_error;

  if (error.message.startsWith("invalid ENS name")) {
    formatted_error = "Missing or invalid parameter.";
  } else if (error.message.startsWith("invalid BigNumber string")) {
    formatted_error = "Invalid number parameter."
  } else {
    try {
      const EXTRACT_ERROR_MESSAGE = /(?<="message":")(.*?)(?=")/g;
      let errors = JSON.stringify(error).match(EXTRACT_ERROR_MESSAGE);
      formatted_error = errors[errors.length - 1];
    } catch (e) {
      formatted_error = error.message;
    }
  }

  return formatted_error;
}

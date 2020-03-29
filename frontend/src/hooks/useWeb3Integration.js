import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useState, useEffect, useCallback } from 'react';
import WalletConnectProvider from "@walletconnect/web3-provider";

import {
  getMintedAmount,
  getPaused,
  getPresale,
  mintPreSale,
  mintPublicSale
} from '../services/nftContractFunctions';

import { INFURA_ID, NETWORK_NAME } from '../config';

function useWeb3Integration(mintAmount) {
  const [account, setAccount] = useState('');
  const [mintedAmount, setMintedAmount] = useState('0');
  const [provider, setProvider] = useState(null);
  const [web3provider, setWeb3Provider] = useState(null);
  const [isPresale, setIsPresale] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [autoLoaded, setAutoLoaded] = useState(false);


  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: INFURA_ID
      }
    },
  };

  const web3Modal = new Web3Modal({
    network: NETWORK_NAME,
    cacheProvider: true,
    providerOptions
  });


  const onConnect = useCallback(
    async () => {
      const provider = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(provider);

      const signer = web3Provider.getSigner()
      const address = await signer.getAddress()
      const network = await web3Provider.getNetwork()

      if (network.chainId !== 4) {
        alert("Please, change to Rinkeby network")
        resetApp()
      }

      setAccount(address);
      setProvider(provider)
      setWeb3Provider(web3Provider);
    }, [web3Modal]);

  const resetApp = useCallback(
    async () => {
      await web3Modal.clearCachedProvider()
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }
      setAccount('');
      setProvider(null)
      setWeb3Provider(null);
    }, [provider, web3Modal]);

  // Auto connect to the cached provider
  useEffect(() => {
    if (!autoLoaded && web3Modal?.cachedProvider) {
      onConnect()
      setAutoLoaded(true)
    }
  }, [onConnect, autoLoaded, web3Modal?.cachedProvider]);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        setAccount(accounts[0]);
      }
      const handleDisconnect = () => {
        resetApp();
      }
      const handleChainChanged = () => {
        // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
        window.location.reload();
      }
      provider.on("disconnect", handleDisconnect);
      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, resetApp]);


  useEffect(() => {
    const loadContractState = async () => {
      setMintedAmount(await getMintedAmount());
      setIsPaused(await getPaused())
      setIsPresale(await getPresale())
    }
    loadContractState()
  }, [mintAmount]);


  return [
    account,
    provider,
    isPaused,
    isPresale,
    web3provider,
    onConnect,
    resetApp,
    mintedAmount,
    mintPreSale,
    mintPublicSale
  ];
}

export default useWeb3Integration;
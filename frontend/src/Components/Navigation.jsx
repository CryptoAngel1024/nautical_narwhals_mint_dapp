// import { React, useState } from 'react'
// import './Navigation.css'
// import Logo from '../Assets/images/logo.png'
// import 'boxicons';
// import { ScrollingProvider, Section, useScrollSection } from 'react-scroll-section'
// import { Router, Link, NavLink, useLocation } from 'react-router-dom';
// import useWeb3Integration from "../hooks/useWeb3Integration.js";
// import {
//     AppBar,
//     Typography,
//     IconButton,
//     Tooltip,
//     Button
// } from '@mui/material';
// import {
//     AddCircleOutline,
//     RemoveCircleOutline,
//     AccountBalanceWallet
// } from '@mui/icons-material';

// export default function Navigation(props) {
//     const [mintAmount, setMintAmount] = useState(0);
//     const [
//         account,
//         provider,
//         isPaused,
//         isPresale,
//         web3provider,
//         onConnect,
//         resetApp,
//         mintedAmount,
//         mintPreSale,
//         mintPublicSale
//     ] = useWeb3Integration(mintAmount);
//     const mintSection = useScrollSection('mint');
//     const ourvisionSection = useScrollSection('ourvision');
//     const roadmapSection = useScrollSection('roadmap');
//     const ourteamSection = useScrollSection('ourteam');
//     const gallerySection = useScrollSection('gallery');
//     const stackingSection = useScrollSection('staking');

//     const location = useLocation();
//     const { pathname } = location;
//     const CurrentLocation = pathname.split("/");

//     return (
//         <section className='navigation' id='navigation'>
//             <div className="container">
//                 <div className="navigation_container">
//                     <div className="logo">
//                         <img src={Logo} alt="" />
//                     </div>
//                     <div className="links">

//                         {
//                             CurrentLocation[1] === "home" || CurrentLocation[1] === "" ?
//                                 <ul>
//                                     <li onClick={mintSection.onClick} selected={mintSection.selected}>
//                                         Mint
//                                     </li>
//                                     <li onClick={ourvisionSection.onClick} selected={ourvisionSection.selected}>
//                                         Our Vision
//                                     </li>
//                                     <li onClick={roadmapSection.onClick} selected={roadmapSection.selected}>
//                                         Roadmap
//                                     </li>
//                                     <li onClick={ourteamSection.onClick} selected={ourteamSection.selected}>
//                                         Our team
//                                     </li>
//                                     <li>
//                                         <NavLink exact to="/Gallery">Gallery</NavLink>
//                                     </li>
//                                     <li>
//                                         <a href="/Gallery/#staking">Staking</a>
//                                     </li>
//                                     {/* <li onClick={stackingSection.onClick} selected={stackingSection.selected}>
//                                     Staking
//                                 </li> */}
//                                 </ul>
//                                 :
//                                 <ul>
//                                     <li>
//                                         <NavLink to="/home">Home</NavLink>
//                                     </li>
//                                 </ul>

//                         }

//                     </div>
//                     <div className="social_links">
//                         <a href="#">
//                             <box-icon color="#fff" type='logo' name='twitter'></box-icon>
//                         </a>
//                         {
//                             web3provider ? (
//                                 <Tooltip title="Disconnect">
//                                     <Button color="warning" onClick={resetApp}>
//                                         <AccountBalanceWallet titleAccess="Wallet Address" />
//                                         <Typography variant="subtitle1">{account.slice(0, 7)}...{account.slice(-4)}</Typography>
//                                     </Button>
//                                 </Tooltip>)
//                                 : <button className='connect_wallet' onClick={onConnect}>Connect wallet</button>
//                         }
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

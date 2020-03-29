import React from 'react'
import Logo from '../../Assets/images/logo.png'
import Twitter from '../../Assets/images/Twitter.png'
import Insta from '../../Assets/images/Insta.png'
import Discord from '../../Assets/images/Discord.png'
import Youtube from '../../Assets/images/Youtube.png'
import Send from '../../Assets/images/Send.png'

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="footer_main">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="footer_logo">
                                        <img src={Logo} alt="" />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <span className='footer_content'>The world’s first exclusive digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover digital arts.</span>
                                    <div className="footer_social">
                                        <a href="#"><img src={Twitter} alt="twitter" /></a>
                                        <a href="#"><img src={Insta} alt="insta" /></a>
                                        <a href="#"><img src={Discord} alt="discord" /></a>
                                        <a href="#"><img src={Youtube} alt="youtube" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="footer_links_container">
                                        <div className="footer_link_title">Nautical Narwhals</div>
                                        <div className="footer_links">
                                            <a href="#">Explore</a>
                                            <a href="#">Help Center</a>
                                            <a href="#">Blog</a>
                                            <a href="#">About</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="footer_links_container">
                                        <div className="footer_link_title">Community</div>
                                        <div className="footer_links">
                                            <a href="#">Discussion</a>
                                            <a href="#">Subscribe</a>
                                            <a href="#">Voting</a>
                                            <a href="#">Suggest Feature</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="get_update">
                                <div className="get_update_header">
                                    <span>Get the latest updates about nautical.</span>
                                    <a href=""><img src={Send} alt="" /></a>
                                </div>
                                <input type="text" placeholder='Enter you email' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copy_right">
                    <span>Copyright ©2021 <a href="">Nautical Narwhals</a>. All rights reserved. Designed & Developed by Purple Brush Digital Solutions</span>
                    <div className='privacy'>
                        <a href="">Privacy Policy</a>
                        <a href="">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

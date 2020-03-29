import React from 'react'
// import CountUp from 'react-countup';
import CountUp from 'react-countup';
import Heroimg from '../../Assets/images/hero.jpg'
export default function Hero() {
    return (
        <section className='hero_section' id='hero_section'>
            <div className="container">
                <div className="row">
                    <div className="col-md-7">
                        <div className="hero_content">
                            <div className='hero_title'>5757 Nautical Narwhals surfacing on the Ethereum blochain</div>
                            <div className='hero_tagline'>Discover & research NFTs of the worlds top artist.</div>
                            <div className="hero_action">
                                <button type="button" className='button '>Start Mining</button>
                                <a href="#" className='button learn_more'>Learn More</a>
                            </div>
                            <div className="hero_numbers">
                                <div className="community">
                                    <span><CountUp end={33} duration={5} />k+</span>
                                    <div className='hero_numbers_title'>Community</div>
                                </div>
                                <div className="staging">
                                    <span><CountUp end={22} duration={5} />k+</span>
                                    <div className='hero_numbers_title'>Staing</div>
                                </div>
                                <div className="nft">
                                    <span><CountUp end={111} duration={5} /></span>
                                    <div className='hero_numbers_title'>NFT</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="hero_img">
                            <img src={Heroimg} alt="" />
                            <div className="luck_dream">
                                <div className="luck_dream_heading">
                                    <h5>Luck of Dreams</h5>
                                    <span>Currents Bid</span>
                                </div>
                                <div className="luck_dream_content">
                                    <span className='luck_dream_content_number'>1.11 <span>ETH</span></span>
                                    <button type="button">Place a Bid</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

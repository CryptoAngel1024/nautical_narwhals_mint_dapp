import {React, useState, useRef }from 'react'
import { Section } from 'react-scroll-section'
import ArrowRight from '../../Assets/images/ArrowRight.png'
import Dots from '../../Assets/images/dots.png'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Stakingbox(props){
    return(
        <div className="col-md-4">
            <div className="staking_box">
                <div className="staking_box_title">{props.title}</div>
            <div className="staking_box_button"><button>{props.button}</button></div>
            </div>
        </div>
    )
}
function Gallerybox(props){
    return(
        <div className="gallery_box staking_gallery_box">
            <div className="gallery_box_header">
                <div className='header_color_dot'>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className='option_box'>
                    <img src={Dots} alt="" />
                </div>
            </div>
            <div className="current_bid_box">
                <div className="current_bid_heading">
                    <h5>{props.title}</h5>
                </div>
                <div className="current_bid_content">
                    <div className="current_bid">
                        <div className="current_bid_title">Current Big</div>
                        <div className="current_bid_price">{props.price} {props.currencyname}</div>
                    </div>
                    <div className="ending_in">
                        <div className="ending_in_title">Ending In</div>
                        <div className="ending_in_time">{props.time}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Staking() {

    const [progress, setProgress] = useState("50%");
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    return (
        <Section className='staking' id='staking'>
            <div className="container">
                <div className="section_header">
                    <h3 className='section_title custom_title'>Stakking</h3>
                    <div className="view_all">
                        <span>View All Collection</span><img src={ArrowRight} alt="" />
                    </div>
                </div>
                <Carousel responsive={responsive}>
                    <Gallerybox title="Voiceless Action" tagline="Currents Bid" price="2.22" currencyname="ETH" time="22h 10m" />
                    <Gallerybox title="Night of Harmony" tagline="Currents Bid" price="2.12" currencyname="ETH" time="12h 14m" />
                    <Gallerybox title="Night of Harmony" tagline="Currents Bid" price="2.12" currencyname="ETH" time="12h 14m" />
                    <Gallerybox title="Night of Harmony" tagline="Currents Bid" price="2.12" currencyname="ETH" time="12h 14m" />
                    <Gallerybox title="Freedom of Misery" tagline="Currents Bid" price="1.36" currencyname="ETH" time="9h 38m" />
                </Carousel>
                <div className="row mt-5">
                    <div className="col-md-12">
                        <div className="social_links">
                            <button className='connect_wallet'>Connect wallet</button>
                        </div>
                        <div className="staking_header">
                            <h4 className='staking_header_process'>{progress} Staked</h4>
                            <h6 className='staking_header_total'>3166 of 5757 Stacked</h6>
                            <div className="progressbar_container">
                                <div className="progressbar" style={{ width: progress }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="staking_box_container"></div>
                <div className="row">
                    <Stakingbox title="0 nfts" button="stack nft" />
                    <Stakingbox title="3 nfts" button="unstake nfts" />
                    <Stakingbox title="47 $tusk" button="claim rewards" />
                    <Stakingbox title="0 lp tokens" button="stake lp tokens" />
                    <Stakingbox title="88 lp tokens" button="unstake lp tokens" />
                    <Stakingbox title="540 $tusk" button="claim rewards" />
                </div>
            </div>
        </Section>
    )
}

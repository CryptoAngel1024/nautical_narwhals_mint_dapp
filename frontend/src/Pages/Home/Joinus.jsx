import React from 'react'
import Joinusimg from  '../../Assets/images/joinus.jpg'
export default function Joinus() {
    return (
        <section className='jounus'>
            <div className="container">
                <div className="joinus_container">
                    <div className="joinus_img">
                        <img src={Joinusimg} alt="" />
                    </div>
                    <div className="joinus_content">
                        <div className="joinus_title">
                            Join us and get free NFT.
                        </div>
                        <div className="joinus_tagline">
                            Start create, explore, & collect digital art NFT.
                        </div>
                        <div className="joinus_action">
                            <button className="joinusbtn">Join Now</button>
                            <a href="#" className="joinus_learnmore">Learn More</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

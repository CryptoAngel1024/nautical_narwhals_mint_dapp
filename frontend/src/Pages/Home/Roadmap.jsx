import React from 'react'
import { Section } from 'react-scroll-section'
import RoadmapIcon1 from '../../Assets/images/roadmap1.png'
import RoadmapIcon2 from '../../Assets/images/roadmap2.png'
import RoadmapIcon3 from '../../Assets/images/roadmap3.png'
import RoadmapIcon4 from '../../Assets/images/roadmap4.png'
import RoadmapIcon5 from '../../Assets/images/roadmap5.png'
import RoadmapIcon6 from '../../Assets/images/roadmap6.png'

function Roadmapbox(props) {
    return (
        <div className={`roadmap_box mt-5 ${props.class}`}>
            <div className="roadmap_image">
                <img src={props.Icon} alt="" />
            </div>
            <div className="roadmap_contnet">
                <div className="roadmap_title">{props.Title}</div>
                <div className="roadmap_desc">{props.Desc}</div>
            </div>
        </div>
    )
}

export default function Roadmap() {
    return (
        <Section className='roadmap' id='roadmap'>
            <h3 className='section_title'>Roadmap</h3>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="roadmap_box mt-5 left_box">
                            <div className="roadmap_image">
                                <img src={RoadmapIcon1} alt="" />
                            </div>
                            <div className="roadmap_contnet">
                                <div className="roadmap_title">Merch portal opens</div>
                                <div className="roadmap_desc">
                                    <ul>
                                        <li>Discount for Nautical Narwhal holders</li>
                                        <li>Free merch for Mythical Narwhals, and heavier discount</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="roadmap_box mt-5 left_box">
                            <div className="roadmap_image">
                                <img src={RoadmapIcon2} alt="" />
                            </div>
                            <div className="roadmap_contnet">
                                <div className="roadmap_title">Mythical Narwhal free mint arrives for Narwhal Defenders</div>
                                <div className="roadmap_desc">
                                    <ul>
                                        <li>300 total</li>
                                        <li>Earn 5x the rewards on $TUSK than a regular NN</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="roadmap_box mt-5 left_box">
                            <div className="roadmap_image">
                                <img src={RoadmapIcon3} alt="" />
                            </div>
                            <div className="roadmap_contnet">
                                <div className="roadmap_title">Staking portal opens</div>
                                <div className="roadmap_desc">
                                    <ul>
                                        <li>Stake Nautical Narwhals for $TUSK</li>
                                        <li>Stake Mythical Narwhals for 5x the amount of $TUSK as a Nautical Narwhal</li>
                                        <li>Stake LP tokens for $TUSK</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="roadmap_box mt-5 left_box">
                            <div className="roadmap_image">
                                <img src={RoadmapIcon3} alt="" />
                            </div>
                            <div className="roadmap_contnet">
                                <div className="roadmap_title">Game development starts</div>
                                <div className="roadmap_desc">
                                    <ul>
                                        <li>P2E mobile and desktop game</li>
                                        <li>Earn and spend $TUSK with the game</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="roadmap_box mt-5 right_box">
                            <div className="roadmap_image">
                                <img src={RoadmapIcon4} alt="" />
                            </div>
                            <div className="roadmap_contnet">
                                <div className="roadmap_title">First Launchpad partnerships</div>
                                <div className="roadmap_desc">
                                    <ul>
                                        <li>We gave a few projects we are currently in talks with. More details to come in January 2022!</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="roadmap_box mt-5 right_box">
                            <div className="roadmap_image">
                                <img src={RoadmapIcon5} alt="" />
                            </div>
                            <div className="roadmap_contnet">
                                <div className="roadmap_title">$TUSK arrives</div>
                                <div className="roadmap_desc">
                                    <ul>
                                        <li>ERC20 Uniswap tradable token</li>
                                        <li>Liquidity pool established (LP Tokens for adding liquidity)</li>
                                        <li>$TUSK airdrop</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="roadmap_box mt-5 right_box">
                            <div className="roadmap_image">
                                <img src={RoadmapIcon6} alt="" />
                            </div>
                            <div className="roadmap_contnet">
                                <div className="roadmap_title">Construction of our DAO framework begins</div>
                                <div className="roadmap_desc">
                                    <ul>
                                        <li>Multi-sig</li>
                                        <li>Look at picking up our first big investments</li>
                                        <li>Establish a giving percentage (% donated every month)</li>
                                        <li>Burn $TUSK to propose</li>
                                        <li>Community driven roadmap alterations</li>
                                        <li>Look at hiring full/part time staff</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}

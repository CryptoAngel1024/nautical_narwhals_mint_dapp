import { React, useState } from 'react'
import { Section } from 'react-scroll-section'
import Dots from '../../Assets/images/dots.png'
import Navigation from '../../Components/Navigation'
import Topcollection from './Topcollection'
import Staking from './Staking'
import { Link } from 'react-router-dom';
import ArrowRight from '../../Assets/images/ArrowRight.png'

function Gallerybox(props){
    return(
        <div className="col-md-4">
            <div className="gallery_box">
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
                <div className="gallery_bid">
                    <div className="gallery_bid_heading">
                        <h5>{props.title}</h5>
                        <span>{props.tagline}</span>
                    </div>
                    <div className="gallery_bid_content">
                        <span className='gallery_bid_content_number'>{props.price}<span>{props.currencyname}</span></span>
                        <button type="button">Place a Bid</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default function Gallery() {
    const data = [
        {
            id: "1",
            category: "art",
            title: "Guiltless Riddle",
            tagline:"Currents Bid",
            price: "1.11",
            currencyname:"ETH",
        },
        {
            id: "2",
            category: "game",
            title: "Fall of Surprise",
            tagline:"Currents Bid",
            price: "1.11",
            currencyname:"ETH",
        },
        {
            id: "3",
            category: "video",
            title: "Leadership of Wonder",
            tagline:"Currents Bid",
            price: "1.11",
            currencyname:"ETH",
        },
        {
            id: "4",
            category: "photography",
            title: "Onerous Voyage",
            tagline:"Currents Bid",
            price: "1.11",
            currencyname:"ETH",
        },
        {
            id: "5",
            category: "art",
            title: "Honor of Amusement",
            tagline:"Currents Bid",
            price: "1.11",
            currencyname:"ETH",
        },
        {
            id: "6",
            category: "music",
            title: "Battles of Romance",
            tagline:"Currents Bid",
            price: "1.11",
            currencyname:"ETH",
        }

    ]
    const [item, setItem] = useState(data)
    const Filteritem = (filtItem) => {
        const filtereditem = data.filter((Curritem)=>{
            return Curritem.category == filtItem;
        });
        setItem(filtereditem);
    }
    const Filterall = () => {
        setItem(data)
    }
    return (
        <>
            <Navigation />
            <Section className='gallery' id='gallery'>
                <div className="container mt-4">
            {/* <Link className='backbtn' to="/home"><img src={ArrowRight} alt="" /></Link> */}
                <h3 className='section_title custom_title'>Gallery</h3>
                    <div className="filter_btn">
                        <button type="button" className='active' onClick={() => Filterall()}>All Items</button>
                        <button type="button" onClick={() => Filteritem('art')}>Art</button>
                        <button type="button" onClick={() => Filteritem('game')}>Game</button>
                        <button type="button" onClick={() => Filteritem('photography')}>Photograpgy</button>
                        <button type="button" onClick={() => Filteritem('video')}>Video</button>
                        <button type="button" onClick={() => Filteritem('music')}>Music</button>
                    </div>
                    <div className="row">
                        {
                            item.map((gallItem, i)=>(

                                <Gallerybox title={gallItem.title} tagline={gallItem.tagline} price={gallItem.price} currencyname={gallItem.currencyname} />
                                )
                            )
                        }
                    </div>
                </div>
            </Section>
            <Topcollection />
            <Staking />
        </>
    )
}

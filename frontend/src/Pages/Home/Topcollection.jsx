import React from 'react'
import ArrowRight from '../../Assets/images/ArrowRight.png'

function Collectionbox(props){
    return(
        <div className="col-md-6">
            <div className="collection_box">
                <div className="collection_box_number">{props.number}</div>
                <div className="collection_box_image"><img src={props.collectionImg} alt="" /></div>
                <div className="collection_box_content">
                    <div className="collection_name">{props.collectionName}</div>
                    <div className="collection_price">{props.collectionPrice}</div>
                </div>
            </div>
        </div>
    )
}

export default function Topcollection() {
    return (
        <React.Fragment>
            <section className="topcollection">
                <div className="container">
                    <div className="section_header">
                        <h3 className='section_title custom_title'>Top Collections</h3>
                        <div className="view_all">
                            <span>View All Collection</span><img src={ArrowRight} alt="" />
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <Collectionbox number="1" collectionImg="" collectionName="Flights of Empathy" collectionPrice="$6,124,983" />
                            <Collectionbox number="2" collectionImg="" collectionName="Crash of Perseverance" collectionPrice="$5,375,334" />
                            <Collectionbox number="3" collectionImg="" collectionName="Flights of Empathy" collectionPrice="$4,854,336" />
                            <Collectionbox number="4" collectionImg="" collectionName="Beauty of Imagination" collectionPrice="$4,348,915" />
                            <Collectionbox number="5" collectionImg="" collectionName="Movement of Mystery" collectionPrice="$3,845,188" />
                            <Collectionbox number="6" collectionImg="" collectionName="Assistants of Curiosity" collectionPrice="$2,621,907" />
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

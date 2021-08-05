import React from 'react'
import { Col } from 'antd'
import './GridCards.css'

function GridCards(props) {
    if (props.landingPage) {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <a href={`/movie/${props.movieId}`} className="hover">
                        <img style={{ width: '100%', height: '480px' }} src={props.image} alt={props.movieName} />
                        <p className="hover_title">{props.movieName}</p>
                    </a>
                </div>
            </Col>
        )
    } else {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <div className="hover">
                        <img style={{ width: '100%', height: '480px' }} src={props.image} alt={props.actorName} />
                        <p className="hover_title">{props.actorName}</p>
                    </div>
                </div>
            </Col>
        )
    }
}

export default GridCards

import React, { Component } from 'react'

import Carousel from './Carousel';
import Season from './Season';
import SeasonItems from './SeasonItems';

import seasons from '../jsons/seasons.json';

import '../css/seasonMode.css';

export class SeasonMode extends Component {
    render() {
        let seasonsElement =
            seasons.map((season, index) =>
                <div className="material season-wrapper" key={index} >
                    <Season season={season}/>
                    <SeasonItems items={seasons[index].items} />
                </div>
            );            

        return (
            <div className="carousel-container seasons-carousel">
                <Carousel compensate={62}>
                    {seasonsElement}
                </Carousel>
            </div>
        )
    }
}

export default SeasonMode
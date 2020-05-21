import React, { Component } from 'react'

import Carousel from './Carousel';
import Season from './Season';
import Bundle from './Bundle';

import seasonsData from '../seasons.json';

export class SeasonMode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSeason: 0
        }
    }

    changeSeason = (newIndex) => {
        this.setState({ currentSeason: newIndex });
    }


    render() {
        const { seasons } = seasonsData;

        let seasonsElement =
            seasons.map((season, index) =>
                <Season season={season} key={index} />
            );
        
        
        
        return (
            <div>
                <div className="carousel-container rooms-carousel">
                    <Carousel updateState={this.changeSeason}>
                        {seasonsElement}
                    </Carousel>
                </div>
            </div>
        )
    }
}

export default SeasonMode

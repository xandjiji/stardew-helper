import React, { Component } from 'react'
import { connect } from 'react-redux'

import Carousel from './Carousel';
import Season from './Season';
import SeasonItems from './SeasonItems';

import seasons from '../seasons.json';
import themes from '../themes.json';

export class SeasonMode extends Component {
    render() {
        let palette = themes.themes[this.props.themeId];

        let seasonsElement =
            seasons.map((season, index) =>
                <div className="material season-wrapper" style={{ backgroundColor: palette.surface, color: palette.onSurface }} key={index} >
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

const mapStateToProps = (state) => ({
    themeId: state.themeReducer
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonMode)
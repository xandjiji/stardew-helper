import React, { Component } from 'react'
import { connect } from "react-redux";

import Header from './components/Header';
import RoomMode from './components/RoomMode';
import SeasonMode from './components/SeasonMode';

import ItemModal from './components/ItemModal';

import './css/main.css';
import './css/animations.css';

import themes from './themes.json';

export class Main extends Component {
    render() {
        let palette = themes.themes[this.props.themeId];

        const { mode } = this.props;

        let modeElement;
        if(mode === "rooms") {
            modeElement = <RoomMode />
        }

        if(true) {
            modeElement = <SeasonMode />
        }

        return (
            <div className="main" style={{ backgroundColor: palette.background, color: palette.onSurface, fill: palette.onSurface }}>
                <Header />

                <div className="body-wrapper">
                    {modeElement}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mode: state.wrapperReducer.sortBy,
        themeId: state.themeReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

/* export default Main */
export default connect(mapStateToProps, mapDispatchToProps)(Main);

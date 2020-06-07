import React, { Component } from 'react'
import { connect } from "react-redux";

import Header from './components/Header';
import RoomMode from './components/RoomMode';
import SeasonMode from './components/SeasonMode';

import ItemModal from './components/ItemModal';

import './css/main.css';
import './css/animations.css';

import themes from './jsons/themes.json';

import './css/spritesheets/sprites24px.css';
import './css/spritesheets/sprites32px.css';
import './css/spritesheets/sprites48px.css';
import './css/spritesheets/sprites64px.css';
import './css/spritesheets/sprites72px.css';
import './css/spritesheets/sprites74px.css';
import './css/spritesheets/sprites96px.css';
import './css/spritesheets/sprites128px.css';
import './css/spritesheets/spritessub48px.css';
import './css/spritesheets/spritessub60px.css';
import './css/spritesheets/spritessub111px.css';

export class Main extends Component {
    render() {
        let palette = themes.themes[this.props.themeId];

        const { mode } = this.props;

        let modeElement;
        if(mode === "bundle") {
            modeElement = <RoomMode />
        } else if(mode === "season") {
            modeElement = <SeasonMode />
        }

        return (
            <div className="main" style={{ backgroundColor: palette.background, color: palette.onSurface, fill: palette.onSurface }}>
                <Header />

                <div className="body-wrapper">
                    {modeElement}
                </div>

                <ItemModal />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mode: state.modeReducer.mode,
        themeId: state.themeReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

/* export default Main */
export default connect(mapStateToProps, mapDispatchToProps)(Main);

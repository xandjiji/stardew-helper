import React, { Component } from 'react'
import { connect } from "react-redux";

import Header from './components/Header';
import RoomMode from './components/RoomMode';
import SeasonMode from './components/SeasonMode';
import FarmMode from './components/FarmMode';
import SearchMode from './components/SearchMode';

import ItemModal from './components/ItemModal';

import './css/main.css';
import './css/animations.css';

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
        const { mode } = this.props;

        let modeElement;
        if(mode === "bundle") {
            modeElement = <RoomMode />
        } else if(mode === "season") {
            modeElement = <SeasonMode />
        } else if(mode === "search") {
            modeElement = <SearchMode />
        } else if(mode === "farming") {
            modeElement = <FarmMode />
        }

        return (
            <div className="main">
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
        mode: state.modeReducer.mode
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

/* export default Main */
export default connect(mapStateToProps, mapDispatchToProps)(Main);

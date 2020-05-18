import React, { Component } from 'react'
import { connect } from 'react-redux';

import getFloatText from '../getFloatText';

import '../css/room.css';

import themes from '../themes.json';

export class Room extends Component {
    render() {
        let palette = themes.themes[this.props.themeId];

        const { isComplete, completedCount } = this.props;
        const { name, reward, bundles } = this.props.room;

        let progressPercentage = Math.ceil(completedCount / bundles.length * 100);

        let completedClass = '';
        let textClass = '';
        let textString = '';
        if (isComplete) {
            completedClass = 'animated shake';
            textClass = 'animate';
            textString = getFloatText();
        }

        return (
            <div className="room-item material" style={{ backgroundColor: palette.surface, color: palette.onSurface }}>
                <div className="room-progress">
                    <div className="progress-text">
                        <p className="room-name">{name}</p>
                        <span className="room-count">{completedCount}/{bundles.length}</span>
                        <span className={`textFloat ${textClass}`} style={{ color: palette.onSurface }}>{textString}</span>
                    </div>
                    <div className={`progress-bar material ${completedClass}`} style={{ backgroundColor: palette.primaryVariant }}>
                        <div className="cursor" style={{ width: `${progressPercentage}%`, backgroundColor: palette.primary }}></div>
                    </div>
                </div>

                <div className="room-reward-wrapper">
                    <span className="room-reward-name">{reward}</span>
                    <div className="sprite bg-Bundle_Reward"></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    let bundlesCompleted = 0;
    ownProps.room.bundles.forEach(element => {
        if (isBundleComplete(element, state)) {
            bundlesCompleted++;
        }
    });

    let status = false;
    if (bundlesCompleted === ownProps.room.bundles.length) {
        status = true;
    }

    return {
        isComplete: status,
        completedCount: bundlesCompleted,
        themeId: state.themeReducer
    };
};

function mapDispatchToProps(dispatch) {
    return {
        /* toggleAll: (options) => {
            dispatch({
                type: "TOGGLE_ALL",
                payload: options
            });
        } */
    };
};

function isBundleComplete(bundle, state) {

    let completedCount = 0;
    bundle.items.forEach(element => {
        if (state.itemReducer[element.id]) {
            completedCount++;
        }
    });


    if (completedCount >= bundle.itemCount) {
        return true;
    } else {
        return false;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
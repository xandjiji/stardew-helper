import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getFloatText } from '../utils';

import '../css/room.css';

export class Room extends Component {
    render() {
        const { isComplete, completedCount } = this.props;
        const { name, reward, bundles } = this.props.room;

        let progressPercentage = Math.ceil(completedCount / bundles.length * 100);

        let completedClass = '';
        let textClass = '';
        let textString = '';
        let rewardClass = '';
        if (isComplete) {
            completedClass = 'animated shake';
            textClass = 'animate';
            textString = getFloatText();
            rewardClass = 'active';
        }

        return (
            <div className="room-item material">
                <div className="room-progress">
                    <div className="progress-text">
                        <p className="room-name">{name}</p>
                        <span className="room-count">{completedCount}/{bundles.length}</span>
                        <span className={`textFloat ${textClass}`}>{textString}</span>
                    </div>
                    <div className={`progress-bar material ${completedClass}`}>
                        <div className="cursor" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>

                <div className="room-reward-wrapper">
                    <span className="room-reward-name">{reward}</span>
                    <div className={`sprite bg-Bundle_Reward smooth ${rewardClass}`}></div>
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
        completedCount: bundlesCompleted
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
import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getFloatText } from '../utils';

import '../css/room.css';
import '../css/season.css';
import '../css/seasonIcons.css';

export class Season extends Component {
    render() {
        const { isComplete, itemCount, completedCount } = this.props;
        const { name } = this.props.season;


        let progressPercentage = Math.ceil(completedCount / itemCount * 100);


        let completedClass = '';
        let textClass = '';
        let textString = '';
        if (isComplete) {
            completedClass = 'animated shake';
            textClass = 'animate';
            textString = getFloatText();
        }


        return (
            <div className="room-item season-mode">
                <div className={`season-icon bg-${name}`}></div>
                <div className="room-progress">
                    <div className="progress-text">
                        <p className="room-name">{name} season</p>
                        <span className="room-count">{completedCount}/{itemCount}</span>
                        <span className={`textFloat ${textClass}`}>{textString}</span>
                    </div>
                    <div className={`progress-bar material ${completedClass}`}>
                        <div className="cursor" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { items } = ownProps.season;

    let completedItems = 0;
    let totalItems = 0;

    for (const skill of Object.keys(items)) {

        items[skill].forEach(element => {
            
            totalItems++;

            if(state.itemReducer[element.id]) {
                completedItems++;
            }            
        });

    }

    return {
        isComplete: (completedItems === totalItems),
        itemCount: totalItems,
        completedCount: completedItems
    };
};

function mapDispatchToProps() {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Season);
import React, { Component } from 'react'
import Item from './Item';
import { connect } from "react-redux";

import { buildClassName, getFloatText } from '../utils';

import '../css/bundle.css';
import '../css/bundleIcons.css';

export class Bundle extends Component {

    toggleAll() {

        const { bundle, completedCount } = this.props;

        let idArray = [];

        bundle.items.forEach(element => {
            idArray.push(element.id);
        });

        if (bundle.items.length === completedCount) {
            this.props.toggleAll({ idArray, allCompleted: true });
        } else {
            this.props.toggleAll({ idArray, allCompleted: false });
        }

    }

    preventScroll(event) {
        event.stopPropagation();
    }

    render() {
        const { name, reward, items, itemCount } = this.props.bundle;
        const { completedCount } = this.props;

        let progressPercentage = Math.ceil(completedCount / itemCount * 100);

        let completedClass = '';
        let textClass = '';
        let textString = '';
        let rewardClass = '';
        if (progressPercentage === 100) {
            completedClass = 'animated shake';
            textClass = 'animate';
            textString = getFloatText();
            rewardClass = 'active'
        }

        let rewardElement;
        if (reward) {
            let rewardCountElement;
            if(reward.itemCount > 1) {
                rewardCountElement =
                <span className="reward-count">({reward.itemCount}x)</span>
            }

            rewardElement =
                <div className="bundle-reward-wrapper">
                    <span className="bundle-reward smooth" onClick={() => this.props.openModal(reward.globalID)}>
                        <div className="sprite-wrapper">
                            <div className={`${buildClassName(reward.name)}`}></div>
                            </div>
                        <div className="reward-text-wrapper">
                            <span className="bundle-reward-text">{reward.name}</span>
                            {rewardCountElement}
                        </div>
                    </span>
                    <div className={`sprite bg-Bundle_Reward smooth ${rewardClass}`} onClick={() => this.props.openModal(reward.globalID)}></div>
                </div>
        }

        return (
            <div className="bundle-item material">

                <div className="bundle-info">
                    <div className={`bundle-icon ${buildClassName(name)}`}></div>

                    <div className="bundle-info-wrapper">
                        <p className="bundle-name">{name}</p>
                        <span className="bundle-count">{completedCount}/{itemCount}</span>
                        <span className={`textFloat ${textClass}`}>{textString}</span>
                        <div
                            className={`progress-bar material ${completedClass}`}>

                            <div className="cursor" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                    </div>
                </div>

                {rewardElement}

                <div
                    className="bundle-items-wrapper custom-scrollbar"
                    onWheel={this.preventScroll}
                    onTouchMove={this.preventScroll}>
                    {
                        items.map((item, index) => (
                            <Item item={item} key={index} />
                        ))
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    let completeCount = 0;
    ownProps.bundle.items.forEach(element => {
        if (state.itemReducer[element.id]) {
            completeCount++;
        }
    });

    let status = false;
    if (completeCount >= ownProps.bundle.itemCount) {
        status = true;
    }

    return {
        isComplete: status,
        completedCount: completeCount
    };
};

function mapDispatchToProps(dispatch) {
    return {
        toggleAll: (options) => {
            dispatch({
                type: "TOGGLE_ALL",
                payload: options
            });
        },

        openModal: (id) => {
            dispatch({
                type: "OPEN_MODAL",
                payload: id
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bundle);
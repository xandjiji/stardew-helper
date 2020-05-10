import React, { Component } from 'react'
import Item from './Item';
import { connect } from "react-redux";

import '../css/bundle.css';

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

    render() {
        const { name, reward, items } = this.props.bundle;

        let rewardElement;
        if (reward) {
            rewardElement = <p>-->Bundle reward: {reward.name} ({reward.itemCount}x)</p>
        }

        let completedElement;
        if (this.props.isComplete) {
            completedElement = <span>(((COMPLETED BUNDLE)))</span>;
        }

        return (
            <div>
                <button onClick={() => this.toggleAll()}>TOGGLE ALL</button>
                {completedElement}
                <p>-->Bundle name: {name}</p>
                {rewardElement}

                {
                    items.map((item, index) => (
                        <Item item={item} key={index} />
                    ))
                }
                a
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bundle);
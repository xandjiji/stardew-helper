import React, { Component } from 'react'
import Bundle from './Bundle';
import { connect } from "react-redux";

import '../css/room.css';

export class Room extends Component {
    render() {
        const { isComplete, completedCount } = this.props;
        const { name, reward, bundles } = this.props.room;

        let completedElement;
        if (isComplete) {
            completedElement = <span>XXXX CoMpLeTeD RoOm</span>
        }

        return (
            <div>
                <p>{completedElement}Room name: {name}    *****   {completedCount}/{bundles.length}</p>
                <p>Room reward: {reward}</p>

                {
                    bundles.map((bundle, index) => (
                        <Bundle bundle={bundle} key={index} />
                    ))
                }
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
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
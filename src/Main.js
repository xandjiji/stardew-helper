import React, { Component } from 'react'
import { connect } from "react-redux";

import Room from './components/Room';
import Bundle from './components/Bundle';

import './css/main.css';
import roomsData from './rooms.json';

export class Main extends Component {
    
    state = {
        currentRoom: 0
    }

    dragStart = (event) => {
        console.log('mouse down');
    }
    
    render() {

        let roomsElement;
        if (this.props.sortBy === "rooms") {
            roomsElement = roomsData.rooms.map((room, index) =>
                <Room room={room} key={index} />
            )
        }

        let bundlesElement;
        bundlesElement = roomsData.rooms[this.state.currentRoom].bundles.map((bundle, index) =>
            <Bundle bundle={bundle} key={index} />
        )

        return (
            <div className="main">
                <div className="rooms-wrapper" onMouseDown={this.dragStart}>
                    {roomsElement}
                </div>

                <div className="bundles-wrapper">
                    {bundlesElement}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sortBy: state.wrapperReducer.sortBy
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        /* toggleItem: (id) => {
            dispatch({
                type: "TOGGLE_ITEM",
                payload: id
            });
        } */
    };
};

/* export default Main */
export default connect(mapStateToProps, mapDispatchToProps)(Main);

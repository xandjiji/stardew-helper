import React, { Component } from 'react'
import { connect } from "react-redux";

import Room from './components/Room';

import './css/main.css';
import roomsData from './rooms.json';

export class Main extends Component {
    render() {

        let wrapper;
        if (this.props.sortBy == "rooms") {
            wrapper = roomsData.rooms.map((room, index) =>
                <Room room={room} key={index} />
            )
        }

        return (
            <div className="main">
                {wrapper}
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

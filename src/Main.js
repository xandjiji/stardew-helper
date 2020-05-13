import React, { Component } from 'react'
import { connect } from "react-redux";

import Carousel from './components/Carousel';
import Room from './components/Room';
import Bundle from './components/Bundle';

import './css/main.css';
import roomsData from './rooms.json';

export class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentRoom: 0
        }
    }

    changeRoom = (newIndex) => {
        this.setState({ currentRoom: newIndex });
    }
    
    render() {
        const { rooms } = roomsData;

        let roomsElement;
        if (this.props.sortBy === "rooms") {
            roomsElement = rooms.map((room, index) =>
                <Room room={room} key={index} />
            )
        }

        let bundlesElement;
        bundlesElement = rooms[this.state.currentRoom].bundles.map((bundle, index) =>
            <Bundle bundle={bundle} key={index} />
        )

        return (
            <div className="main">
                <div className="carousel-container rooms-carousel">
                    <Carousel updateState={this.changeRoom}>
                        {roomsElement}
                    </Carousel>
                </div>

                <div className="carousel-container bundles-carousel">
                    <Carousel currentRoom={this.state.currentRoom}>
                        {bundlesElement}
                    </Carousel>
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

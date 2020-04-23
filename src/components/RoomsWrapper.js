import React, { Component } from 'react'
import Room from './Room';

export class RoomsWrapper extends Component {
    render() {

        let roomsArray = this.props.rooms;

        return roomsArray.map((room) => (
            <Room room={room} />
        ));
    }
}

export default RoomsWrapper

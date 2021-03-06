import React, { Component } from 'react'

import Carousel from './Carousel';
import Room from './Room';
import Bundle from './Bundle';

import rooms from '../jsons/rooms.json';

export class RoomMode extends Component {
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
        
        let roomsElement =
            rooms.map((room, index) =>
                <Room room={room} key={index} />
            )

        let bundlesElement =
            rooms[this.state.currentRoom].bundles.map((bundle, index) =>
                <Bundle bundle={bundle} key={index} />
            )

        return (
            <div>
                <div className="carousel-container rooms-carousel">
                    <Carousel updateState={this.changeRoom}>
                        {roomsElement}
                    </Carousel>
                </div>

                <div className="carousel-container bundles-carousel">
                    <Carousel currentRoom={this.state.currentRoom} compensate={198}>
                        {bundlesElement}
                    </Carousel>
                </div>
            </div>
        )
    }
}

export default RoomMode
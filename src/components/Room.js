import React, { Component } from 'react'
import Bundle from './Bundle';

import '../css/room.css';

export class Room extends Component {

    state = {
        completed: false,
        bundleCount: 0
    }

    updateRoom = (status) => {
        let count = this.state.bundleCount;
        if (status) {
            count++;
        } else {
            count--;
        }

        this.setState({ bundleCount: count }, () => {

            let completed = this.state.bundleCount === this.props.room.bundles.length;

            this.setState({ completed: completed });

        });
    }

    render() {


        let roomData = this.props.room;

        let completed;
        if (this.state.completed) {
            completed = <span>XXXX CoMpLeTeD RoOm</span>
        }

        return (
            <div>
                <p>{completed}Room name: {roomData.name}</p>
                <p>Room reward: {roomData.reward}</p>

                {
                    roomData.bundles.map((bundle, index) => (
                        <Bundle bundle={bundle} updateSelected={this.props.updateSelected} key={index} updateRoom={this.updateRoom} />
                    ))
                }
            </div>
        )
    }
}

export default Room

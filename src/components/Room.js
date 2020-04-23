import React, { Component } from 'react'
import BundleWrapper from './BundleWrapper';

export class Room extends Component {

    render() {

        let roomData = this.props.room;
        
        return (
            <div>
                <p>Room name: {roomData.name}</p>
                <p>Room reward: {roomData.reward}</p>

                <BundleWrapper bundles={roomData.bundles} />
            </div>
        )
    }
}

export default Room

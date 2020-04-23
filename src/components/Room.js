import React, { Component } from 'react'
import Bundle from './Bundle';

import '../css/room.css';

export class Room extends Component {

    render() {

        let roomData = this.props.room;
        
        return (
            <div>
                <p>Room name: {roomData.name}</p>
                <p>Room reward: {roomData.reward}</p>

                {
                    roomData.bundles.map((bundle) => (
                        <Bundle bundle={bundle}/>
                    ))
                }
            </div>
        )
    }
}

export default Room

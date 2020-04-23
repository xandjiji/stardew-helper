import React, { Component } from 'react'
import Room from './components/Room';

import './css/main.css';
import roomsData from './rooms.json';

export class Main extends Component {

    state = {
        sortBy: 'rooms'
    }

    render() {

        let wrapper;
        if(this.state.sortBy === 'rooms') {
            wrapper = roomsData.rooms.map((room, index) =>
                <Room room={room} key={index}/>
            )
        }
        
        return (
            <div className="main">
                {wrapper}
            </div>
        )
    }
}

export default Main
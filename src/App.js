import React, { Component } from 'react'
import Room from './components/Room';

import './css/app.css';
import roomsData from './rooms.json';

export class App extends Component {

    state = {
        sortBy: 'rooms'
    }

    render() {

        let wrapper;
        if(this.state.sortBy == 'rooms') {
            wrapper = roomsData.rooms.map((room) =>
                <Room room={room}/>
            )
        }
        
        return (
            <div className="app">
                {wrapper}
            </div>
        )
    }
}

export default App
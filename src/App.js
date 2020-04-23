import React, { Component } from 'react'
import RoomsWrapper from './components/RoomsWrapper';

import './App.css';
import roomsData from './rooms.json';

export class App extends Component {

    state = {
        sortBy: 'rooms'
    }

    render() {

        let wrapper;

        if(this.state.sortBy == 'rooms') {
            wrapper = <RoomsWrapper rooms={roomsData.rooms} />;
        }
        
        return (
            <div className="App">
                {wrapper}
            </div>
        )
    }
}

export default App
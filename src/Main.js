import React, { Component } from 'react'
import Room from './components/Room';

import './css/main.css';
import roomsData from './rooms.json';

export class Main extends Component {

    state = {
        sortBy: 'rooms',
        selected: 0
    }

    updateSelected = (id) => {
        let current = this.state.selected;

        current = current + id;
        this.setState({selected: current});
    }

    render() {

        console.log(this.state.selected);
        

        let wrapper;
        if(this.state.sortBy === 'rooms') {
            wrapper = roomsData.rooms.map((room, index) =>
                <Room room={room} updateSelected={this.updateSelected} key={index}/>
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

import React, { Component } from 'react'

import '../css/Item.css';
import data from '../bundles.json';

export class Item extends Component {
    
    state = {
        rooms: data.rooms
    }


    render() {
        console.log(this.state);
        
        return (
            <div className="Item">
                
            </div>
        )
    }
}

export default Item
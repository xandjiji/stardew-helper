import React, { Component } from 'react'

import '../css/item.css';

export class Item extends Component {

    render() {
        
        let itemData = this.props.item;
        
        return (
            <div className="item">
                {itemData.name}
            </div>
        )
    }
}

export default Item
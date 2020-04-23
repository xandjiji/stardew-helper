import React, { Component } from 'react'

import '../css/item.css';
import '../css/spritesheet.css';

export class Item extends Component {

    render() {
        
        let itemData = this.props.item;
        let itemClass = buildClassName(itemData.name);

        let itemInfo = itemData.info;
        if(itemInfo) {
            itemInfo = <div className="info smooth">{itemData.info}</div>;
        }
        
        return (
            <div className="item">
                <div className={`sprite ${itemClass}`}></div>
                <span>{itemData.name}</span>
                
                {itemInfo}
            </div>
        )
    }
}

export default Item

function buildClassName(name) {
    name = name.replace(/'/g, "");
    name = name.replace(/,/g, "");
    name = name.replace(/ /g, "_");

    return `bg-${name}`;
}
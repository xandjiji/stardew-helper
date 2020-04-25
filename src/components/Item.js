import React, { Component } from 'react'

import '../css/item.css';
import '../css/spritesheet.css';

export class Item extends Component {

    state = {
        active: false
    }

    toggleState() {
        this.setState({ active: !this.state.active }, () => {
            this.props.updateCompleted(this.state.active);

            let signal = -1;
            if(this.state.active) {
                signal = 1;
            }

            let index = this.props.item.id;
            index = Math.pow(2, index);
            

            this.props.updateSelected(index * signal);

        });
    }

    render() {
        
        let itemData = this.props.item;
        let itemClass = buildClassName(itemData.name);

        let itemInfo = itemData.info;
        if(itemInfo) {
            itemInfo = <div className="info smooth">{itemData.info}</div>;
        }

        let completed;
        if(this.state.active) {
            completed = <span>X</span>
        }
        
        return (
            <div className="item" onClick={() => this.toggleState()}>
                {completed}
                <div className={`sprite ${itemClass}`}></div>
                <span>{itemData.name} (({itemData.id}))</span>
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

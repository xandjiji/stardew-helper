import React, { Component } from 'react'
import {connect} from "react-redux";

import '../css/item.css';
import '../css/spritesheet.css';

export class Item extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false
        }

        this.tapItem = this.tapItem.bind(this);
    }

    tapItem(id) {
        this.props.toggleItem(id);
        this.props.updateCompleted(this.props.activeItems[id]);
    }

    render() {
        
        let itemData = this.props.item;
        let itemClass = buildClassName(itemData.name);

        let itemInfo = itemData.info;
        if(itemInfo) {
            itemInfo = <div className="info smooth">{itemData.info}</div>;
        }

        let completed;
        if(this.props.activeItems[itemData.id]) {
            completed = <span>X</span>
        }
        
        
        return (
            <div className="item" onClick={() => this.tapItem(itemData.id)}>
                {completed}
                <div className={`sprite ${itemClass}`}></div>
                <span>{itemData.name} (({itemData.id}))</span>
                {itemInfo}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activeItems: state.itemReducer
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        toggleItem: (id) => {
            dispatch({
                type: "TOGGLE_ITEM",
                payload: id
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);

function buildClassName(name) {
    name = name.replace(/'/g, "");
    name = name.replace(/,/g, "");
    name = name.replace(/ /g, "_");

    return `bg-${name}`;
}

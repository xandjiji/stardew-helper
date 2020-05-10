import React, { Component } from 'react'
import { connect } from "react-redux";

import '../css/item.css';
import '../css/spritesheet.css';

export class Item extends Component {
    render() {
        const { name, info, id } = this.props.item;

        let itemClass = buildClassName(name);

        let infoElement;
        if (info) {
            infoElement = <div className="info smooth">{info}</div>;
        }

        let completedElement;
        if (this.props.active) {
            completedElement = <span>X</span>
        }
        
        return (
            <div className="item" onClick={() => this.props.toggleItem(id)}>
                {completedElement}
                <div className={`sprite ${itemClass}`}></div>
                <span>{name} (({id}))</span>
                {infoElement}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        active: state.itemReducer[ownProps.item.id]
    };
};

function mapDispatchToProps(dispatch) {
    return {
        toggleItem: (id) => {
            dispatch({
                type: "TOGGLE_ITEM",
                payload: id
            });
        }
    };
};

function buildClassName(name) {
    name = name.replace(/'/g, "");
    name = name.replace(/,/g, "");
    name = name.replace(/ /g, "_");

    return `bg-${name}`;
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
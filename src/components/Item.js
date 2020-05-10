import React, { Component } from 'react'
import {connect} from "react-redux";

import '../css/item.css';
import '../css/spritesheet.css';

export class Item extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: this.props.initialState
        }
    }

    tapItem(id) {
        this.props.toggleItem(id);
        /* this.props.updateCompleted(!this.state.active); */
        this.setState({ active: !this.state.active });
    }

    render() {
        const { name, info, id } = this.props.item;        

        let itemClass = buildClassName(name);

        let infoElement;
        if(info) {
            infoElement = <div className="info smooth">{info}</div>;
        }

        let completedElement;
        if(this.state.active) {
            completedElement = <span>X</span>
        }
        
        return (
            <div className="item" onClick={() => this.tapItem(id)}>
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
        initialState: state.itemReducer[ownProps.item.id]
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

export default connect(mapStateToProps, mapDispatchToProps)(Item);

function buildClassName(name) {
    name = name.replace(/'/g, "");
    name = name.replace(/,/g, "");
    name = name.replace(/ /g, "_");

    return `bg-${name}`;
}

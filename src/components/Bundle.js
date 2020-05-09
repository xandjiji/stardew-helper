import React, { Component } from 'react'
import Item from './Item';
import {connect} from "react-redux";

import '../css/bundle.css';

export class Bundle extends Component {

    /* HARDCODED */
    state = {
        complete: false,
        completedItems: 0
    }

    updateCompleted = (itemState) => {
        const { complete, completedItems } = this.state;

        let count = completedItems;
        
        if(itemState) {
            count++;
        } else {
            count--;
        }
        
        this.setState({completedItems: count});

        if(!complete && count >= this.props.bundle.itemCount) {
            this.setState({ complete: true });
            
        } else if (complete && count < this.props.bundle.itemCount) {
            this.setState({ complete: false });
        }
    }

    render() {
        const { name, itemCount, reward, items } = this.props.bundle;

        let rewardElement;
        if(reward) {
            rewardElement = <p>-->Bundle reward: {reward.name} ({reward.itemCount}x)</p>
        }

        let completedElement;
        if(this.state.completedItems >= itemCount) {
            completedElement = <span>(((COMPLETED BUNDLE)))</span>;
        }

        return (
            <div>
                {completedElement}
                <p>-->Bundle name: {name}</p>
                {rewardElement}

                {
                    items.map((item, index) => (
                        <Item item={item} updateCompleted={this.updateCompleted} key={index}/>
                    ))
                }
                a
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        /* initialState: state.itemReducer[ownProps.item.id] */
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

export default connect(mapStateToProps, mapDispatchToProps)(Bundle);
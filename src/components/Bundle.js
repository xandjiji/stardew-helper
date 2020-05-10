import React, { Component } from 'react'
import Item from './Item';
import {connect} from "react-redux";

import '../css/bundle.css';

export class Bundle extends Component {

    constructor(props) {
        super(props);

        this.state = {
            complete: this.props.initialCompleted,
            completedItems: this.props.initialCount
        }
    }

    tapItem() {        
        this.props.bundle.items.forEach(element => {
            this.props.toggleItem(element.id);
        });
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
        if(this.state.complete) {
            completedElement = <span>(((COMPLETED BUNDLE)))</span>;
        }

        return (
            <div>
                <button onClick={() => this.tapItem()}>TOGGLE ALL</button>
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

    let completeCount = 0;

    ownProps.bundle.items.forEach(element => {
        if(state.itemReducer[element.id]) {
            completeCount++;
        }
    });  
    
    let status = false;
    if(completeCount >= ownProps.bundle.itemCount) {
        status = true;
    }

    return {
        initialCompleted: status,
        initialCount: completeCount
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
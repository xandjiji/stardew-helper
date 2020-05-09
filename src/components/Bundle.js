import React, { Component } from 'react'
import Item from './Item';

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

        if(count >= this.props.bundle.itemCount) {
            if(!complete) {
                this.setState({complete: true});
            }
            
        } else {
            if(complete) {
                this.setState({complete: false});
            }
        }
    }

    render() {


        let bundleData = this.props.bundle;

        let reward;
        if(bundleData.reward) {
            reward = <p>-->Bundle reward: {bundleData.reward.name} ({bundleData.reward.itemCount}x)</p>
        }

        let completed;
        if(this.state.completedItems >= bundleData.itemCount) {
            completed = <span>(((COMPLETED BUNDLE)))</span>;
        }
        
        
        
        return (
            <div>
                {completed}
                <p>-->Bundle name: {bundleData.name}</p>
                {reward}

                {
                    bundleData.items.map((item, index) => (
                        <Item item={item} updateCompleted={this.updateCompleted} key={index}/>
                    ))
                }
                a
            </div>
        )
    }
}

export default Bundle

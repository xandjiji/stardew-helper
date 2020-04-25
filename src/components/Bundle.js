import React, { Component } from 'react'
import Item from './Item';

import '../css/bundle.css';

export class Bundle extends Component {

    state = {
        complete: false,
        completedItems: 0
    }

    updateCompleted = (itemState) => {
        let count = this.state.completedItems;
        
        if(itemState) {
            count++;
        } else {
            count--;
        }

        this.setState({completedItems: count}, () => {

            let completed = this.state.completedItems >= this.props.bundle.itemCount;

            if(this.state.complete !== completed) {
                this.setState({complete: completed});
                this.props.updateRoom(completed);
            }
        });
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
                        <Item item={item} updateSelected={this.props.updateSelected} key={index} updateCompleted={this.updateCompleted}/>
                    ))
                }
                a
            </div>
        )
    }
}

export default Bundle

import React, { Component } from 'react'
import Item from './Item';

export class Bundle extends Component {
    render() {

        let bundleData = this.props.bundle;

        let reward;
        if(bundleData.reward) {
            reward = <p>Bundle reward: {bundleData.reward.name} ({bundleData.reward.itemCount}x)</p>
        }
        
        
        return (
            <div>
                <p>Bundle name: {bundleData.name}</p>
                
                {reward}

                {
                    bundleData.items.map(item => (
                        <p>{item.name}</p>
                    ))
                }
                a
            </div>
        )
    }
}

export default Bundle

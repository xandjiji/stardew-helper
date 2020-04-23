import React, { Component } from 'react'
import Item from './Item';

import '../css/bundle.css';

export class Bundle extends Component {
    render() {

        let bundleData = this.props.bundle;

        let reward;
        if(bundleData.reward) {
            reward = <p>-->Bundle reward: {bundleData.reward.name} ({bundleData.reward.itemCount}x)</p>
        }
        
        
        return (
            <div>
                <p>-->Bundle name: {bundleData.name}</p>
                
                {reward}

                {
                    bundleData.items.map(item => (
                        <Item item={item}/>
                    ))
                }
                a
            </div>
        )
    }
}

export default Bundle

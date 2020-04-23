import React, { Component } from 'react'
import Bundle from './Bundle';

export class BundleWrapper extends Component {
    
    render() {

        let bundles = this.props.bundles;

        return bundles.map((bundle) => (
            <Bundle bundle={bundle} />
        ));
    }
}

export default BundleWrapper

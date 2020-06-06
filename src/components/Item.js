import React, { Component } from 'react'
import { connect } from "react-redux";

import { buildClassName } from '../utils';

import '../css/item.css';

import themes from '../themes.json';

export class Item extends Component {
    constructor(props) {
        super(props);

        let checked = false;
        if(this.props.active) {
            checked = true;
        }

        this.state = {
            active: checked
        }
    }

    render() {
        let palette = themes.themes[this.props.themeId];

        const { name, itemCount, id, globalID } = this.props.item;
        

        let itemClass = buildClassName(name);

        let completedClass = '';
        let fadedClass = '';
        if(this.props.active) {
            completedClass = ' checked animated rubberBand';
            fadedClass = 'faded';
        }

        let goldArray = [40,41,42,43,132,133];
        let silverArray = [129];

        let qualityElement;
        if(goldArray.includes(id)) {
            qualityElement = <div className="sprite bg-Gold_Quality_Icon"></div>
        } else if(silverArray.includes(id)) {
            qualityElement = <div className="sprite bg-Silver_Quality_Icon"></div>
        }

        return (
            <div className="item">
                <div
                    className={`item-name-wrapper ${fadedClass}`}
                    onClick={() => this.props.openModal(globalID)}>
                    <div className={`sprite ${itemClass}`}>{qualityElement}</div>
                    <div className="item-info" style={{ color: palette.onSurface }}>
                        <span className="item-name">{name}</span>
                        <span className="item-count">{`(${itemCount ? itemCount : 1}x)`}</span>
                    </div>
                </div>
                <div
                    className={`checkbox ${completedClass}`}
                    onClick={() => this.props.toggleItem(id)}
                    style={{ borderColor: palette.primaryVariant }}>

                    <span className="checkmark" style={{ backgroundColor: palette.primary, borderColor: palette.onPrimary }}></span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        active: state.itemReducer[ownProps.item.id],
        themeId: state.themeReducer
    };
};

function mapDispatchToProps(dispatch) {
    return {
        toggleItem: (id) => {
            dispatch({
                type: "TOGGLE_ITEM",
                payload: id
            });
        },

        openModal: (id) => {
            dispatch({
                type: "OPEN_MODAL",
                payload: id
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
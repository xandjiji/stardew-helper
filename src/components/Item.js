import React, { Component } from 'react'
import { connect } from "react-redux";

import '../css/item.css';
import '../css/spritesheet.css';

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

        const { name, itemCount, info, id } = this.props.item;

        let itemClass = buildClassName(name);

        let infoElement;
        if (info) {
            infoElement = <div className="info smooth">{info}</div>;
        }

        let completedClass = '';
        let fadedClass = '';
        if(this.props.active) {
            completedClass = ' checked animated rubberBand';
            fadedClass = 'faded';
        }

        return (
            <div className="item">
                <div className={`item-name-wrapper ${fadedClass}`}>
                    <div className={`sprite ${itemClass}`}></div>
                    <div className="item-info" style={{ color: palette.onSurface }}>
                        <span className="item-name">{name}</span>
                        <span className="item-count">{`(${itemCount}x)`}</span>
                    </div>
                </div>
                <div
                    className={`checkbox ${completedClass}`}
                    onClick={() => this.props.toggleItem(id)}
                    style={{ borderColor: palette.primaryVariant }}>

                    <span className="checkmark" style={{ backgroundColor: palette.primary }}></span>
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
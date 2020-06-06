import React, { Component } from 'react'
import { connect } from "react-redux";

import { buildClassName } from '../utils';

import '../css/itemModal.css';

import itemList from '../items.json';
import themes from '../themes.json';

export class ItemModal extends Component {
    render() {
        let palette = themes.themes[this.props.themeId];

        /* itemList[this.props.currentItem] */
        const { name, sellPrice, healing, foodBuff } = itemList[938];

        console.log(itemList[938])

        let itemClass = buildClassName(name);

        let sellElement;
        if(sellPrice) {
            sellElement = 
            <div className="info-box material">
                <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Sell price</span>
                <div className="info-content">
                    <span className="info-value"><div className="bg-Gold_Coin"></div>{sellPrice}g</span>
                </div>
            </div>
        }

        let healsElement;
        if(healing) {
            healsElement = 
            <div className="info-box material">
                <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Heals</span>
                <div className="info-content">
                    <span className="info-value"><div className="bg-Health"></div>{healing.health}</span>
                    <span className="info-value"><div className="bg-Energy"></div>{healing.energy}</span>
                </div>
            </div>
        }

        let buffsElement;
        if(foodBuff) {
            buffsElement = 
            <div className="info-box material">
                <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Buffs</span>
                <div className="info-content">
                    {
                        foodBuff.map((buff, index) =>
                            <span
                                className="info-value"
                                key={index}>

                                <div className={`${buildClassName(buff.buffName)}`}></div>{`${buff.buffName} (${buff.buffQty})`}
                            </span>
                        )
                    }
                </div>
            </div>
        }

        return (
            <div className={`item-modal smooth ${this.props.active ? 'active' : ''}`} style={{ backgroundColor: palette.background }}>
                <button onClick={() => this.props.closeModal()}>X</button>

                <div className="item-wrapper">
                    <div className="material" style={{ backgroundColor: palette.surface}}>
                        <div className="item-name-wrapper">
                            <div className="item-sprite material" style={{ backgroundColor: palette.primary }}>
                                <div className={`${itemClass}`}></div>
                            </div>
                            <span className="item-name">{name}</span>
                        </div>

                        {sellElement}
                        {healsElement}
                        {buffsElement}

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        active: state.itemModalReducer.active,
        currentItem: state.itemModalReducer.itemId,
        themeId: state.themeReducer
    };
};

function mapDispatchToProps(dispatch) {
    return {
        closeModal: () => {
            dispatch({
                type: "CLOSE_MODAL"
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemModal);

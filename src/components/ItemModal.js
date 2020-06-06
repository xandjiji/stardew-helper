import React, { Component } from 'react'
import { connect } from "react-redux";

import { buildClassName } from '../utils';

import { ReactComponent as ExternalIcon } from '../assets/external.svg';
import { ReactComponent as CloseIcon } from '../assets/close.svg';

import '../css/itemModal.css';

import itemList from '../items.json';
import themes from '../themes.json';

export class ItemModal extends Component {
    constructor(props) {
        super(props);

        this.handleActionLink = this.handleActionLink.bind(this);
        this.createListItem = this.createListItem.bind(this);
        this.parseActions = this.parseActions.bind(this);
        this.idToName = this.idToName.bind(this);
    }

    handleActionLink(id) {
        console.log(id);
    }

    createListItem(item) {
        if(typeof item === 'string') {
            if(item[0] !== '@') {
                return item
            } else {
                
                return this.parseActions(item);
            }
        } else {
            return this.idToName(item)
        }
    }

    parseActions(string) {
        string = string.substring(1, string.length);
        let strArray = string.split(" ");

        let newElement =
        <span className="tokenized-content">
            {
                strArray.map((token, index) =>
                    {
                        if(token[0] === '&') {
                            let itemId = token.substring(1, string.length)
                            itemId = parseInt(itemId);

                            return this.idToName(itemId, index)
                        } else {
                            
                            return <span className="token" key={index}>{token}</span>
                        }
                    }
                )
            }
        </span>

        return newElement
    }
    
    idToName(id, key) {
        let palette = themes.themes[this.props.themeId];
        
        let element =
            <span
                className="action-link"
                style={{ color: palette.primary }}
                onClick={() => this.handleActionLink(id)}
                key={key}>
                {itemList[id].name}
            </span>

        return element
    }

    render() {
        let palette = themes.themes[this.props.themeId];

        /* itemList[this.props.currentItem] */
        let currentID = 973;
        const { name, link, sellPrice, healing, foodBuff, stats, effect, profitability, harvestIn, obtainedFrom } = itemList[currentID];

        /* console.log(itemList[currentID]) */

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
                    <span className="info-value"><div className="bg-Health"></div>{healing.health} <div className="bg-Energy"></div>{healing.energy}</span>
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

        let statsElement;
        if(stats) {
            
            let levelElement;
            if(stats.level) {
                levelElement = <span className="info-value">Level {stats.level}</span>
            }

            let damageElement;
            if(stats.damage) {
                damageElement = <span className="info-value">{stats.damage} damage</span>
            }

            let criticalChanceElement;
            if(stats.criticalChance) {
                criticalChanceElement = <span className="info-value">{`${parseFloat(stats.criticalChance * 100)}%`} critical chance</span>
            }

            statsElement = 
            <div className="info-box material">
                <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Stats</span>
                <div className="info-content">
                    {levelElement}
                    {damageElement}
                    {criticalChanceElement}
                </div>
            </div>
        }

        let bonusElement;
        if(stats && stats.buff) {
            bonusElement = 
            <div className="info-box material">
                <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Bonus</span>
                <div className="info-content">
                    {
                        stats.buff.map((buff, index) =>
                            <span
                                className="info-value"
                                key={index}>

                                <div className={`${buildClassName(buff.stat)}`}></div>{`${buff.stat} (${buff.val})`}
                            </span>
                        )
                    }
                </div>
            </div>
        }

        let effectElement;
        if(effect) {
            effectElement =
            <div className="info-box material">
                <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Effect</span>
                <div className="info-content">
                    <span className="info-value">{effect}</span>
                </div>
            </div>
        }

        let profitabilityElement;
        if(profitability) {
            profitabilityElement =
            <div className="info-box material">
                <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Profitability</span>
                <div className="info-content">
                    <span className="info-value"><div className="bg-Gold_Coin"></div>{profitability}g/day</span>
                </div>
            </div>
        }

        let harvestElement;
        if(harvestIn) {
            harvestElement =
            <div className="info-box material">
                <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Harvests in</span>
                <div className="info-content">
                    <span className="info-value">{harvestIn}</span>
                </div>
            </div>
        }

        let obtainedElement;
        if(obtainedFrom) {
            obtainedElement =
            <div className="info-box list material">
                <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Obtained from</span>
                <div className="info-content">
                    {
                        obtainedFrom.map((item, index) =>
                            <span
                                className="info-value"
                                key={index}>

                                {this.createListItem(item)}
                            </span>
                        )
                    }
                </div>
            </div>
        }

        return (
            <div className={`item-modal smooth ${this.props.active ? 'active' : ''}`} style={{ backgroundColor: palette.background }}>
                <div className="item-wrapper">
                    <div className="material" style={{ backgroundColor: palette.surface}}>
                        <div className="item-name-wrapper">
                            <div className="item-sprite material" style={{ backgroundColor: palette.primary }}>
                                <div className={`${itemClass}`}></div>
                            </div>

                            <span className="item-name">
                                {name}
                                <a className="smooth" href={`https://stardewvalleywiki.com/${link}`} rel="noopener noreferrer external" target="_blank"><ExternalIcon /></a>
                            </span>

                            <CloseIcon className="close-button smooth" onClick={() => this.props.closeModal()} />
                        </div>

                        {sellElement}
                        {healsElement}
                        {profitabilityElement}
                        {harvestElement}
                        {buffsElement}
                        {statsElement}
                        {bonusElement}
                        {effectElement}

                        {obtainedElement}

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
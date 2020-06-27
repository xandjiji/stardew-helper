import React, { Component } from 'react'
import { connect } from "react-redux";
import throttle from "lodash.throttle";

import { buildClassName } from '../utils';

import Pushable from './Pushable';
import InfoBox from './InfoBox';

import { ReactComponent as ExternalIcon } from '../assets/external.svg';
import { ReactComponent as CloseIcon } from '../assets/close.svg';

import '../css/itemModal.css';

import itemList from '../jsons/items.json';

export class ItemModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewportH: window.innerHeight
        }

        this.handleActionLink = this.handleActionLink.bind(this);
        this.createListItem = this.createListItem.bind(this);
        this.parseActions = this.parseActions.bind(this);
        this.idToName = this.idToName.bind(this);

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('resize', this.handleResize);
    }

    handleKeyDown = throttle((event) => {
        if (event.key === 'Escape') {
            this.props.closeModal()
        }
    }, 400);

    handleResize = throttle(() => {
        this.setState({ viewportH: window.innerHeight });
    }, 400);

    handleActionLink(id) {
        this.props.openModal(id);
    }

    preventScroll(event) {
        event.stopPropagation();
    }

    createListItem(item) {

        if (typeof item === 'string') {
            if (item[0] !== '@') {
                return item
            } else {

                return this.parseActions(item);
            }
        }

        if (typeof item === 'number') {
            return this.idToName(item)
        }

        if (typeof item === 'object') {

            let recipeElement;

            if (typeof item.id === 'number') {

                recipeElement =
                    <span className="tokenized-content">
                        {this.idToName(item.id)}
                        <span className="token">{`(${item.qty}x)`}</span>
                    </span>
            } else {

                recipeElement = `${item.id} (${item.qty}x)`
            }

            return recipeElement
        }


    }

    parseActions(string) {
        string = string.substring(1, string.length);
        let strArray = string.split(" ");

        let newElement =
            <span className="tokenized-content">
                {
                    strArray.map((token, index) => {

                        let regexp = new RegExp(/&/);

                        if (regexp.test(token)) {

                            let prefix = undefined;
                            if (token[0] !== '&') {
                                prefix = token[0];
                            }

                            let suffix = undefined;
                            if (token[token.length - 1] !== '~') {
                                suffix = token[token.length - 1];
                            }

                            token = token.replace(/&/g, "");
                            token = token.replace(/~/g, "");
                            token = token.replace(/,/g, "");
                            token = token.replace(/\(/g, "");
                            token = token.replace(/\)/g, "");

                            let itemId = parseInt(token);


                            return this.idToName(itemId, index, prefix, suffix);
                        } else {

                            return <span className="token" key={index}>{token}</span>
                        }
                    }
                    )
                }
            </span>

        return newElement
    }

    idToName(id, key, prefix, suffix) {
        let spriteElement =
            <div className="sprite-wrapper">
                <div className={buildClassName(itemList[id].name)}></div>
            </div>

        let prefixElement;
        if (prefix) {
            prefixElement = <span>{prefix}</span>
        }

        let suffixElement;
        if (suffix) {
            suffixElement = <span>{suffix}</span>
        }

        let element =
            <span
                className="action-link"
                onClick={() => this.handleActionLink(id)}
                key={key}>

                {spriteElement}

                {prefixElement}{itemList[id].name}{suffixElement}
            </span>

        return element
    }

    makeGiftList(gifting) {
        if (gifting == undefined) {
            return
        } else {
            let elemArray = [];
            for (const list of Object.keys(gifting)) {
                elemArray.push(
                    <InfoBox title={list} customClass="list horizontal-list type-npc" key={list}>
                        {
                            gifting[list].map((item, index) =>
                                this.idToName(item, index)
                            )
                        }
                    </InfoBox>
                )
            }
            return elemArray;
        }
    }

    render() {
        const {
            name,
            link,
            sellPrice,
            healing,
            foodBuff,
            stats,
            effect,
            profitability,
            harvestIn,
            obtainedFrom,
            makes,
            recipe,
            gifting
        } = itemList[this.props.currentItem];

        let itemClass = buildClassName(name);

        let sellElement;
        if (sellPrice) {
            sellElement =
                <InfoBox title="Sell Price">
                    <span className="info-value">
                        <div className="bg-Gold_Coin"></div>
                        {sellPrice}g
                </span>
                </InfoBox>
        }

        let healsElement;
        if (healing) {

            let healthElement;
            if (healing.health) {
                healthElement =
                    <span className="token">
                        <div className={healing.health > 0 ? 'bg-Health' : 'bg-Skull'}></div>
                        {healing.health}{healing.health > 0 ? '' : ' health'}
                    </span>
            }

            let energyElement;
            if (healing.energy) {
                energyElement =
                    <span className="token">
                        <div className={healing.energy > 0 ? 'bg-Energy' : 'bg-Skull'}></div>
                        {healing.energy}{healing.energy > 0 ? '' : ' energy'}
                    </span>
            }

            healsElement =
                <InfoBox title="Heals">
                    <span className="info-value tokenized-content">
                        {healthElement}
                        {energyElement}
                    </span>
                </InfoBox>
        }

        let buffsElement;
        if (foodBuff) {
            buffsElement =
                <InfoBox title="Buffs" data={foodBuff}>
                    {
                        foodBuff.map((buff, index) =>
                            <span
                                className="info-value"
                                key={index}>

                                <div className={`${buildClassName(buff.buffName)}`}></div>{`${buff.buffName} (${buff.buffQty})`}
                            </span>
                        )
                    }
                </InfoBox>
        }

        let statsElement;
        if (stats) {

            let levelElement;
            if (stats.level) {
                levelElement = <span className="info-value">Level {stats.level}</span>
            }

            let damageElement;
            if (stats.damage) {
                damageElement = <span className="info-value">{stats.damage} damage</span>
            }

            let criticalChanceElement;
            if (stats.criticalChance) {
                criticalChanceElement = <span className="info-value">{`${parseFloat(stats.criticalChance * 100)}%`} critical chance</span>
            }

            if (criticalChanceElement !== undefined || damageElement !== undefined || levelElement !== undefined) {
                statsElement =
                    <InfoBox title="Stats" customClass="list">
                        {levelElement}
                        {damageElement}
                        {criticalChanceElement}
                    </InfoBox>
            }

        }

        let bonusElement;
        if (stats && stats.buff) {
            bonusElement =
                <InfoBox title="Bonus" customClass="list">
                    {
                        stats.buff.map((buff, index) =>
                            <span
                                className="info-value"
                                key={index}>

                                <div className={`${buildClassName(buff.stat)}`}></div>{`${buff.stat} (${buff.val})`}
                            </span>
                        )
                    }
                </InfoBox>
        }

        let effectElement;
        if (effect) {
            effectElement =
                <InfoBox title="Effect">
                    <span className="info-value">{effect}</span>
                </InfoBox>
        }

        let profitabilityElement;
        if (profitability) {
            profitabilityElement =
                <InfoBox title="Profitability">
                    <span className="info-value">
                        <div className="bg-Gold_Coin"></div>
                        {profitability}g/day
                    </span>
                </InfoBox>
        }

        let harvestElement;
        if (harvestIn) {
            harvestElement =
                <InfoBox title="Harvests in">
                    <span className="info-value">{harvestIn}</span>
                </InfoBox>
        }

        let obtainedElement;
        if (obtainedFrom) {
            obtainedElement =
                <InfoBox title="Obtained from" customClass="list">
                    {
                        obtainedFrom.map((item, index) =>
                            <span
                                className="info-value"
                                key={index}>

                                {this.createListItem(item)}
                            </span>
                        )
                    }
                </InfoBox>
        }

        let makesElement;
        if (makes) {
            makesElement =
                <InfoBox title="Makes" customClass="list">
                    {
                        makes.map((item, index) =>
                            <span
                                className="info-value"
                                key={index}>

                                {this.createListItem(item)}
                            </span>
                        )
                    }
                </InfoBox>
        }

        let recipeElement;
        if (recipe) {
            recipeElement =
                <InfoBox title="Recipe" customClass="list">
                    {
                        recipe.map((item, index) =>
                            <span
                                className="info-value"
                                key={index}>

                                {this.createListItem(item)}
                            </span>
                        )
                    }
                </InfoBox>
        }

        return (
            <Pushable active={this.props.active} trigger={() => this.props.closeModal()} blockLeft={true}>
                <div className={`item-modal smooth ${this.props.active ? 'active' : ''}`}>
                    <div className="item-wrapper">
                        <div className="material" style={{ maxHeight: this.state.viewportH - 56 }}>
                            <div className="item-name-wrapper">
                                <div className="item-sprite material">
                                    <div className={`${itemClass}`}></div>
                                </div>

                                <span className="item-name">
                                    {name}
                                    <a className="smooth" href={`https://stardewvalleywiki.com/${link}`} rel="noopener noreferrer external" target="_blank"><ExternalIcon /></a>
                                </span>

                                <CloseIcon className="close-button smooth" onClick={() => this.props.closeModal()} />
                            </div>

                            <div
                                className="info-wrapper custom-scrollbar"
                                style={{ maxHeight: this.state.viewportH - 138 }}
                                onTouchMove={this.preventScroll}
                                onTouchEnd={this.preventScroll}>

                                {sellElement}
                                {profitabilityElement}
                                {harvestElement}

                                {healsElement}
                                {buffsElement}

                                {statsElement}
                                {bonusElement}
                                {effectElement}

                                {obtainedElement}
                                {makesElement}
                                {recipeElement}

                                {this.makeGiftList(gifting)}
                            </div>
                        </div>
                    </div>
                </div>
            </Pushable>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        active: state.itemModalReducer.active,
        currentItem: state.itemModalReducer.itemId
    };
};

function mapDispatchToProps(dispatch) {
    return {
        closeModal: () => {
            dispatch({
                type: "CLOSE_MODAL"
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemModal);
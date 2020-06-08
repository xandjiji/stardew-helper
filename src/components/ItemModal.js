import React, { Component } from 'react'
import { connect } from "react-redux";

import { buildClassName } from '../utils';

import { ReactComponent as ExternalIcon } from '../assets/external.svg';
import { ReactComponent as CloseIcon } from '../assets/close.svg';

import '../css/itemModal.css';

import itemList from '../jsons/items.json';
import npcList from '../jsons/npcs.json';
import themes from '../jsons/themes.json';

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
        this.idToNpc = this.idToNpc.bind(this);

        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
        this.setState({ viewportH: window.innerHeight });
    }

    handleActionLink(id) {
        this.props.openModal(id);
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
        let palette = themes.themes[this.props.themeId];

        let prefixElement;
        if (prefix) {
            prefixElement =
                <span style={{ color: palette.onSurface, fontWeight: 300 }}>
                    {prefix}
                </span>
        }

        let suffixElement;
        if (suffix) {
            suffixElement =
                <span style={{ color: palette.onSurface, fontWeight: 300 }}>
                    {suffix}
                </span>
        }

        let element =
            <span
                className="action-link"
                style={{ color: palette.primary }}
                onClick={() => this.handleActionLink(id)}
                key={key}>

                {prefixElement}{itemList[id].name}{suffixElement}
            </span>

        return element
    }

    idToNpc(id, key) {
        return npcList[id];
    }

    render() {
        let palette = themes.themes[this.props.themeId];

        const { name, link, sellPrice, healing, foodBuff, stats, effect, profitability, harvestIn, obtainedFrom, makes, recipe, gifting } = itemList[this.props.currentItem];

        let itemClass = buildClassName(name);

        let sellElement;
        if (sellPrice) {
            sellElement =
                <div className="info-box material">
                    <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Sell price</span>
                    <div className="info-content">
                        <span className="info-value"><div className="bg-Gold_Coin"></div>{sellPrice}g</span>
                    </div>
                </div>
        }

        let healsElement;
        if (healing) {

            let healthElement;
            if (healing.health) {
                healthElement =
                    <span className="token"><div className={healing.health > 0 ? 'bg-Health' : 'bg-Skull'}></div>{healing.health}{healing.health > 0 ? '' : ' health'}</span>
            }

            let energyElement;
            if (healing.energy) {
                energyElement =
                    <span className="token"><div className={healing.energy > 0 ? 'bg-Energy' : 'bg-Skull'}></div>{healing.energy}{healing.energy > 0 ? '' : ' energy'}</span>
            }

            healsElement =
                <div className="info-box material">
                    <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Heals</span>
                    <div className="info-content">
                        <span className="info-value tokenized-content">
                            {healthElement}
                            {energyElement}
                        </span>
                    </div>
                </div>
        }

        let buffsElement;
        if (foodBuff) {
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

            statsElement =
                <div className="info-box list material">
                    <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Stats</span>
                    <div className="info-content">
                        {levelElement}
                        {damageElement}
                        {criticalChanceElement}
                    </div>
                </div>
        }

        let bonusElement;
        if (stats && stats.buff) {
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
        if (effect) {
            effectElement =
                <div className="info-box material">
                    <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Effect</span>
                    <div className="info-content">
                        <span className="info-value">{effect}</span>
                    </div>
                </div>
        }

        let profitabilityElement;
        if (profitability) {
            profitabilityElement =
                <div className="info-box material">
                    <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Profitability</span>
                    <div className="info-content">
                        <span className="info-value"><div className="bg-Gold_Coin"></div>{profitability}g/day</span>
                    </div>
                </div>
        }

        let harvestElement;
        if (harvestIn) {
            harvestElement =
                <div className="info-box material">
                    <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Harvests in</span>
                    <div className="info-content">
                        <span className="info-value">{harvestIn}</span>
                    </div>
                </div>
        }

        let obtainedElement;
        if (obtainedFrom) {
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

        let makesElement;
        if (makes) {
            makesElement =
                <div className="info-box list material">
                    <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Makes</span>
                    <div className="info-content">
                        {
                            makes.map((item, index) =>
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

        let recipeElement;
        if (recipe) {
            recipeElement =
                <div className="info-box list material">
                    <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Recipe</span>
                    <div className="info-content">
                        {
                            recipe.map((item, index) =>
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

        let lovesElement;
        if (gifting && gifting.loves) {
            lovesElement =
                <div className="info-box list horizontal-list material">
                    <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Loves</span>
                    <div className="info-content">
                        {
                            gifting.loves.map((item, index) =>
                                <span
                                    className="info-value"
                                    key={index}>

                                    <div className={`bg-${this.idToNpc(item)}`}></div>
                                    {this.idToNpc(item)}

                                </span>
                            )
                        }
                    </div>
                </div>
        }

        let likesElement;
        if (gifting && gifting.likes) {
            likesElement =
                <div className="info-box list horizontal-list material">
                    <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Likes</span>
                    <div className="info-content">
                        {
                            gifting.likes.map((item, index) =>
                                <span
                                    className="info-value"
                                    key={index}>

                                    <div className={`bg-${this.idToNpc(item)}`}></div>
                                    {this.idToNpc(item)}

                                </span>
                            )
                        }
                    </div>
                </div>
        }

        let neutralsElement;
        if (gifting && gifting.neutrals) {
            neutralsElement =
                <div className="info-box list horizontal-list material">
                    <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Neutral</span>
                    <div className="info-content">
                        {
                            gifting.neutrals.map((item, index) =>
                                <span
                                    className="info-value"
                                    key={index}>

                                    <div className={`bg-${this.idToNpc(item)}`}></div>
                                    {this.idToNpc(item)}

                                </span>
                            )
                        }
                    </div>
                </div>
        }

        let dislikesElement;
        if (gifting && gifting.dislikes) {
            dislikesElement =
                <div className="info-box list horizontal-list material">
                    <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Dislikes</span>
                    <div className="info-content">
                        {
                            gifting.dislikes.map((item, index) =>
                                <span
                                    className="info-value"
                                    key={index}>

                                    <div className={`bg-${this.idToNpc(item)}`}></div>
                                    {this.idToNpc(item)}

                                </span>
                            )
                        }
                    </div>
                </div>
        }

        let hatesElement;
        if (gifting && gifting.hates) {
            hatesElement =
                <div className="info-box list horizontal-list material">
                    <span className="info-title" style={{ backgroundColor: palette.primary, color: palette.onPrimary }}>Hates</span>
                    <div className="info-content">
                        {
                            gifting.hates.map((item, index) =>
                                <span
                                    className="info-value"
                                    key={index}>

                                    <div className={`bg-${this.idToNpc(item)}`}></div>
                                    {this.idToNpc(item)}

                                </span>
                            )
                        }
                    </div>
                </div>
        }


        return (
            <div className={`item-modal smooth ${this.props.active ? 'active' : ''}`} style={{ backgroundColor: palette.background }}>
                <div className="item-wrapper">
                    <div className="material" style={{ backgroundColor: palette.surface, maxHeight: this.state.viewportH - 56 }}>
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

                        <div className="info-wrapper custom-scrollbar" style={{ maxHeight: this.state.viewportH - 138 }}>
                            {sellElement}
                            {healsElement}
                            {profitabilityElement}
                            {harvestElement}
                            {buffsElement}
                            {statsElement}
                            {bonusElement}
                            {effectElement}

                            {obtainedElement}
                            {makesElement}
                            {recipeElement}

                            {lovesElement}
                            {likesElement}
                            {neutralsElement}
                            {dislikesElement}
                            {hatesElement}
                        </div>
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
import React, { Component } from 'react'
import { connect } from "react-redux";

import ListView from './ListView';

import allCrops from '../jsons/tables/allCrops.json';
import springCrops from '../jsons/tables/springCrops.json';
import summerCrops from '../jsons/tables/summerCrops.json';
import fallCrops from '../jsons/tables/fallCrops.json';

import allAnimalProducts from '../jsons/tables/allAnimalProducts.json';

import allArtisanGoods from '../jsons/tables/allArtisanGoods.json';

import allFishes from '../jsons/tables/allFishes.json';
import springFish from '../jsons/tables/springFish.json';
import summerFish from '../jsons/tables/summerFish.json';
import fallFish from '../jsons/tables/fallFish.json';
import winterFish from '../jsons/tables/winterFish.json';

import allRecipes from '../jsons/tables/allRecipes.json';

let cropList = [
    { name: 'All', list: allCrops, layout: { stats: 'profitability', icon: 'bg-Gold_Coin' } },
    { name: 'Spring', list: springCrops, layout: { stats: 'profitability', icon: 'bg-Gold_Coin' } },
    { name: 'Summer', list: summerCrops, layout: { stats: 'profitability', icon: 'bg-Gold_Coin' } },
    { name: 'Fall', list: fallCrops, layout: { stats: 'profitability', icon: 'bg-Gold_Coin' } }
];

let animalProductsList = {
    name: 'Animal Products', list: allAnimalProducts, layout: { stats: 'sellPrice', icon: 'bg-Gold_Coin' }
}

let artisanGoodsList = {
    name: 'Artisan Goods', list: allArtisanGoods, layout: { stats: 'sellPrice', icon: 'bg-Gold_Coin' }
}

let fishList = [
    { name: 'All', list: allFishes, layout: { stats: 'sellPrice', icon: 'bg-Gold_Coin' } },
    { name: 'Spring', list: springFish, layout: { stats: 'sellPrice', icon: 'bg-Gold_Coin' } },
    { name: 'Summer', list: summerFish, layout: { stats: 'sellPrice', icon: 'bg-Gold_Coin' } },
    { name: 'Fall', list: fallFish, layout: { stats: 'sellPrice', icon: 'bg-Gold_Coin' } },
    { name: 'Winter', list: winterFish, layout: { stats: 'sellPrice', icon: 'bg-Gold_Coin' } }
];

let dishesList = {
    name: 'Dishes', list: allRecipes, layout: { stats: 'foodBuff' }
}

export class CategorySelector extends Component {
    render() {
        const { currentMode } = this.props;

        let currentModeObj;
        switch (currentMode) {
            case 'crops':
                currentModeObj = modeFactory('Crops', 'Iridium Watering Can', cropList);
                break;

            case 'animalProducts':
                currentModeObj = modeFactory('Animal Products', 'Hay', animalProductsList);
                break;

            case 'artisanGoods':
                currentModeObj = modeFactory('Artisan Goods', 'Wine', artisanGoodsList);
                break;

            case 'fishes':
                currentModeObj = modeFactory('Fishes', 'Iridium Rod', fishList);
                break;

            case 'dishes':
                currentModeObj = modeFactory('Dishes', 'Salmon Dinner', dishesList);
                break;

            /* case 'crops':
                currentModeObj = modeFactory('Crops', '', cropList);
                break;

            case 'crops':
                currentModeObj = modeFactory('Crops', '', cropList);
                break;

            case 'crops':
                currentModeObj = modeFactory('Crops', '', cropList);
                break;

            case 'crops':
                currentModeObj = modeFactory('Crops', '', cropList);
                break;

            case 'crops':
                currentModeObj = modeFactory('Crops', '', cropList);
                break;

            case 'crops':
                currentModeObj = modeFactory('Crops', '', cropList);
                break;

            case 'crops':
                currentModeObj = modeFactory('Crops', '', cropList);
                break; */


            default:
                break;
        }

        const { currentTitle, currentIcon, currentList } = currentModeObj;

        return (
            <ListView title={currentTitle} icon={currentIcon} list={currentList} />
        )
    }
}

function modeFactory(currentTitle, currentIcon, currentList) {
    return { currentTitle, currentIcon, currentList }
}

const mapStateToProps = (state) => {

    return {
        currentMode: state.modeReducer.mode
    };
};

function mapDispatchToProps() {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelector);
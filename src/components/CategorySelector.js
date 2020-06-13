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

import allMinerals from '../jsons/tables/allMinerals.json';

import allArtifacts from '../jsons/tables/allArtifacts.json';

import allWeapons from '../jsons/tables/allWeapons.json';
import swords from '../jsons/tables/swords.json';
import daggers from '../jsons/tables/daggers.json';
import clubs from '../jsons/tables/clubs.json';
import distance from '../jsons/tables/distance.json';

import allEquipments from '../jsons/tables/allWereables.json';
import footwear from '../jsons/tables/footwear.json';
import rings from '../jsons/tables/rings.json';
import hats from '../jsons/tables/hats.json';

import allFurnitures from '../jsons/tables/allFurnitures.json';

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

let mineralsList = {
    name: 'Minerals', list: allMinerals, layout: { stats: 'sellPrice', icon: 'bg-Gold_Coin' }
}

let artifactsList = {
    name: 'Artifacts', list: allArtifacts
}

let weaponsList = [
    { name: 'All', list: allWeapons, layout: { stats: 'stats' } },
    { name: 'Swords', list: swords, layout: { stats: 'stats' } },
    { name: 'Daggers', list: daggers, layout: { stats: 'stats' } },
    { name: 'Clubs', list: clubs, layout: { stats: 'stats' } },
    { name: 'Distance', list: distance, layout: { stats: 'stats' } }
];

let equipmentList = [
    { name: 'All', list: allEquipments },
    { name: 'Footwear', list: footwear, layout: { stats: 'stats' } },
    { name: 'Rings', list: rings, layout: { stats: 'effect' } },
    { name: 'Hats', list: hats }
];

let furnituresList = {
    name: 'Furnitures', list: allFurnitures
}

export class CategorySelector extends Component {
    render() {
        const { currentMode } = this.props;

        let currentModeObj;
        switch (currentMode) {
            case 'crops':
                currentModeObj = modeFactory('Crops', 'Pumpkin', cropList);
                break;

            case 'animalProducts':
                currentModeObj = modeFactory('Animal Products', 'Hay', animalProductsList);
                break;

            case 'artisanGoods':
                currentModeObj = modeFactory('Artisan Goods', 'Wine', artisanGoodsList);
                break;

            case 'fishes':
                currentModeObj = modeFactory('Fishes', 'Bamboo Pole', fishList);
                break;

            case 'dishes':
                currentModeObj = modeFactory('Dishes', 'Salmon Dinner', dishesList);
                break;

            case 'minerals':
                currentModeObj = modeFactory('Minerals', 'Star Shards', mineralsList);
                break;

            case 'artifacts':
                currentModeObj = modeFactory('Artifacts', 'Prehistoric Skull', artifactsList);
                break;

            case 'weapons':
                currentModeObj = modeFactory('Weapons', 'Lava Katana', weaponsList);
                break;

            case 'equipment':
                currentModeObj = modeFactory('Equipment', "Emily's Magic Boots", equipmentList);
                break;

            case 'furnitures':
                currentModeObj = modeFactory('Furnitures', 'Futan Bear', furnituresList);
                break;

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
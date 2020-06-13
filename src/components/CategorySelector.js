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

import allRecipes from '../jsons/tables/allRecipes.json';

import allFurnitures from '../jsons/tables/allFurnitures.json';

let modes = {
    crops: {
        title: 'Crops',
        icon: 'Pumpkin',
        list: [
            { name: 'All', list: allCrops, layout: { stats: 'profitability', icon: 'bg-Gold_Coin' } },
            { name: 'Spring', list: springCrops, layout: { stats: 'profitability', icon: 'bg-Gold_Coin' } },
            { name: 'Summer', list: summerCrops, layout: { stats: 'profitability', icon: 'bg-Gold_Coin' } },
            { name: 'Fall', list: fallCrops, layout: { stats: 'profitability', icon: 'bg-Gold_Coin' } }
        ]
    },

    animalProducts: {
        title: 'Animal Products',
        icon: 'Hay',
        list: {
            name: 'Animal Products', list: allAnimalProducts, layout: { stats: 'sellPrice', icon: 'bg-Gold_Coin' }
        }
    },

    artisanGoods: {
        title: 'Artisan Goods',
        icon: 'Wine',
        list: {
            name: 'Artisan Goods', list: allArtisanGoods, layout: { stats: 'sellPrice', icon: 'bg-Gold_Coin' }
        }
    },

    fishes: {
        title: 'Fishes',
        icon: 'Legend',
        list: [
            { name: 'All', list: allFishes, layout: { stats: 'sellPrice', icon: 'bg-Gold_Coin' } },
            { name: 'Spring', list: springFish, layout: { stats: 'sellPrice', icon: 'bg-Gold_Coin' } },
            { name: 'Summer', list: summerFish, layout: { stats: 'sellPrice', icon: 'bg-Gold_Coin' } },
            { name: 'Fall', list: fallFish, layout: { stats: 'sellPrice', icon: 'bg-Gold_Coin' } },
            { name: 'Winter', list: winterFish, layout: { stats: 'sellPrice', icon: 'bg-Gold_Coin' } }
        ]
    },

    minerals: {
        title: 'Minerals',
        icon: 'Star Shards',
        list: {
            name: 'Minerals', list: allMinerals, layout: { stats: 'sellPrice', icon: 'bg-Gold_Coin' }
        }
    },

    artifacts: {
        title: 'Artifacts',
        icon: 'Prehistoric Skull',
        list: {
            name: 'Artifacts', list: allArtifacts
        }
    },

    weapons: {
        title: 'Weapons',
        icon: 'Lava Katana',
        list: [
            { name: 'All', list: allWeapons, layout: { stats: 'stats' } },
            { name: 'Swords', list: swords, layout: { stats: 'stats' } },
            { name: 'Daggers', list: daggers, layout: { stats: 'stats' } },
            { name: 'Clubs', list: clubs, layout: { stats: 'stats' } },
            { name: 'Distance', list: distance, layout: { stats: 'stats' } }
        ]
    },

    equipment: {
        title: 'Equipment',
        icon: "Emily's Magic Boots",
        list: [
            { name: 'All', list: allEquipments },
            { name: 'Footwear', list: footwear, layout: { stats: 'stats' } },
            { name: 'Rings', list: rings, layout: { stats: 'effect' } },
            { name: 'Hats', list: hats }
        ]
    },

    dishes: {
        title: 'Dishes',
        icon: 'Salmon Dinner',
        list: {
            name: 'Dishes', list: allRecipes, layout: { stats: 'foodBuff' }
        }
    },

    furnitures: {
        title: 'Furniture',
        icon: 'Futan Bear',
        list: {
            name: 'Furniture', list: allFurnitures
        }
    }
}

export class CategorySelector extends Component {
    render() {
        const { currentMode } = this.props;
        const { title, icon, list } = modes[currentMode];

        return (
            <ListView title={title} icon={icon} list={list} />
        )
    }
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
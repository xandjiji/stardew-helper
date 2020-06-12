import React, { Component } from 'react'

import Carousel from './Carousel';
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

let foodList = {
    name: 'Dishes', list: allRecipes, layout: { stats: 'foodBuff' }
}

export class FarmMode extends Component {
    render() {
        return (
            <div className="carousel-container farming-carousel">
                <Carousel compensate={62}>
                    <ListView icon={'Iridium Watering Can'} title={'Crops'} list={cropList} />
                    <ListView icon={'Hay'} title={'Animal Products'} list={animalProductsList} />
                    <ListView icon={'Wine'} title={'Artisan Goods'} list={artisanGoodsList} />
                    <ListView icon={'Iridium Rod'} title={'Fishes'} list={fishList} />
                    <ListView icon={'Salmon Dinner'} title={'Dishes'} list={foodList} />
                </Carousel>
            </div>
        )
    }
}

export default FarmMode

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
import springFishes from '../jsons/tables/springFish.json';
import summerFishes from '../jsons/tables/summerFish.json';
import fallFish from '../jsons/tables/fallFish.json';
import winterFish from '../jsons/tables/winterFish.json';

import allRecipes from '../jsons/tables/allRecipes.json';


/*
FARM PRODUCTS:
    CROPS
        PROFITABILITY (SORT BY: SEASON)
    ANIMAL PRODUCTS
        PRICE
    ARTISAN GOODS
        PRICE
    FISH
        GRID (SORT BY: SEASON)
    FOOD
        GRID
*/

let cropList = [
    { name: 'All Crops', list: allCrops, layout: { stats: 'profitability', icon: 'bg-Gold_Coin' } },
    { name: 'Spring Crops', list: springCrops, layout: { stats: 'profitability', icon: 'bg-Gold_Coin' } },
    { name: 'Summer Crops', list: summerCrops, layout: { stats: 'profitability', icon: 'bg-Gold_Coin' } },
    { name: 'Fall Crops', list: fallCrops, layout: { stats: 'profitability', icon: 'bg-Gold_Coin' } }
];

let animalProductsList = {
    name: 'Animal Products', list: allAnimalProducts, layout: { stats: 'sellPrice', icon: 'bg-Gold_Coin' }
}

export class FarmMode extends Component {
    render() {
        return (
            <div className="carousel-container farming-carousel">
                <Carousel compensate={62}>
                    <ListView icon={'Tomato'} title={'Crops'} list={cropList} />
                    <ListView icon={'Truffle'} title={'Animal Products'} list={animalProductsList} />
                </Carousel>
            </div>
        )
    }
}

export default FarmMode

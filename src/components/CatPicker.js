import React, { Component } from 'react'

import CatItem from './CatItem';

import '../css/catPicker.css';

export class CatPicker extends Component {
    render() {

        const { notifyClose } = this.props;

        return (
            <div className={`cat-picker ${this.props.isActive ? 'active' : ''}`}>
                <div className="cat-group">
                    <span className="cat-title" onClick={this.handleClick}>Farming</span>

                    <CatItem name="Crops" icon="Tomato" mode="crops" close={notifyClose} />
                    <CatItem name="Animal Products" icon="Hay" mode="animalProducts" close={notifyClose} />
                    <CatItem name="Artisan Goods" icon="Wine" mode="artisanGoods" close={notifyClose} />
                    <CatItem name="Fishes" icon="Bamboo Pole" mode="fishes" close={notifyClose} />
                </div>

                <div className="cat-group">
                    <span className="cat-title">Mining</span>

                    <CatItem name="Minerals" icon="Star Shards" mode="minerals" close={notifyClose} />
                    <CatItem name="Artifacts" icon="Prehistoric Skull" mode="artifacts" close={notifyClose} />
                    <CatItem name="Weapons" icon="Lava Katana" mode="weapons" close={notifyClose} />
                    <CatItem name="Equipment" icon="Emily's Magic Boots" mode="equipment" close={notifyClose} />
                </div>

                <div className="cat-group">
                    <span className="cat-title">Misc</span>

                    <CatItem name="Dishes" icon="Salmon Dinner" mode="dishes" close={notifyClose} />
                    <CatItem name="Furniture" icon="Futan Bear" mode="furnitures" close={notifyClose} />
                    {/* <CatItem name="Animals" icon="Chicken Mask" mode="animals" close={notifyClose} />
                    <CatItem name="Monsters" icon="Mutant Carp" mode="monsters" close={notifyClose} /> */}
                </div>
            </div>
        )
    }
}

export default CatPicker

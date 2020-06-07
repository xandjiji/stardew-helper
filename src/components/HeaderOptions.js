import React, { Component } from 'react'

import SettingsOption from './SettingsOption';
import ThemePicker from './ThemePicker';
import IEdata from './IEdata';
import DeleteAllData from './DeleteAllData';

import { ReactComponent as PaletteIcon } from '../assets/palette.svg';
import { ReactComponent as DataTransferIcon } from '../assets/transfer.svg';
import { ReactComponent as TrashIcon } from '../assets/trash.svg';

export class HeaderOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: undefined
        }

        this.notifyOpen = this.notifyOpen.bind(this);
    }

    notifyOpen = (which) => {
        this.setState({ active: which });
    }

    render() {

        const { active } = this.state;
        const { notifyOpen } = this;

        return (
            <div>
                <nav className="container">
                    <SettingsOption
                        title="Appearence"
                        currentlyOpen={active}
                        notifyOpen={notifyOpen}>

                        <PaletteIcon />
                        <ThemePicker />
                    </SettingsOption>

                    <SettingsOption
                        title="Import/Export data"
                        currentlyOpen={active}
                        notifyOpen={notifyOpen}>

                        <DataTransferIcon />
                        <IEdata />
                    </SettingsOption>

                    <SettingsOption
                        title="Reset data"
                        currentlyOpen={active}
                        notifyOpen={notifyOpen}>

                        <TrashIcon />
                        <DeleteAllData />
                    </SettingsOption>
                </nav>
            </div>
        )
    }
}

export default HeaderOptions

import React, { Component } from 'react'
import { connect } from "react-redux";

import '../css/itemModal.css';

export class ItemModal extends Component {
    render() {
        return (
            <div className={`item-modal smooth ${this.props.active ? 'active' : ''}`}>
                <button onClick={() => this.props.closeModal()}>X</button>
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

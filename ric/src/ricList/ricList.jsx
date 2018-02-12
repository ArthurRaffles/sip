
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class RicList extends Component {
    handleDelete =(ric) => {
        const { onDelete } = this.props;
        onDelete(ric);
        
    }
    render() {
        const { rics = [] } = this.props;
        
        const ricComps = rics.map((ric, idx) =>
        <li key={idx}>
            <span>{ric}</span>
            <button id='delete' onClick={() => this.handleDelete(ric)}>x</button>
        </li>)
        return (
            <ul>
                {ricComps}
            </ul>
        );
    }
}
RicList.propTypes = {
    rics: PropTypes.array,
    onDelete: PropTypes.func
};

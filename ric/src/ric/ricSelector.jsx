
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class RicSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ric: ''
        }
    }
    handleChange = (event$) => {
        this.setState({ ric: event$.target.value });

    }

    handleSave = ($event) => {
        const { onSave } = this.props;
        onSave(this.state.ric);
        this.setState({ ric: '' });
    }
    render() {
        return (
            <div>
                <span>Enter RIC</span>
                <input id='ricInput'
                    value={this.state.ric} 
                    type='text' onChange={this.handleChange}/>
                <button id='save' onClick={this.handleSave}>save</button>
            </div>
        )
    }
}

RicSelector.propTypes = {
    onSave: PropTypes.func
};

import * as React from 'react';
import { ControlProps } from '../shared/models';

type State = {};

export class MonetaryInput extends React.Component<ControlProps<number, HTMLInputElement>, State> {

    notionalClick = (event: React.MouseEvent<HTMLInputElement>) => {
        event.currentTarget.select();
        event.preventDefault();
    }

    render() {
        const { value, onChanged } = this.props;
        return (
            <input type="number" value={value}  onClick={() => this.props.onChanged(null)} onClick={this.notionalClick}/>
        )
    }
}

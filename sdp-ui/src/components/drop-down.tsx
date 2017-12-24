import * as React from 'react';

export interface OptionValue {
    value: string | number | undefined;
    label: string;
}
export interface Props {
    options: Array<OptionValue>;
    onChange: (selected: any) => void;
    selected?: any;
}
interface State {
    value: string | number | undefined;
}
export class Dropdown extends React.Component<Props, State> {
    constructor() {
        super();
        this.state = {
            value: ''
        };
    }
    componentWillReceiveProps(nextProps: Props) {
        const { selected } = nextProps;
        this.setState({ value : selected });
    }
    handleChange = (event: any) => {
        const { onChange } = this.props;
        this.setState({ value : event.target.value });
        onChange(event.target.value);
    }
    render () {
        const { options } = this.props;
        const items = options.map(({ value, label }: OptionValue) => (<option key={value} value={value}>{label}</option>));
        return (
            <select value={this.state.value} onChange={this.handleChange}>
                {items}
            </select>
        )
    }

}
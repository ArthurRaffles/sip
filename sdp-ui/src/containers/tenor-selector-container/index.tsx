
import * as React from 'react';

import { RootState } from '../../store/index';
import { connect } from 'react-redux';
import { getTenors } from '../../store/static/selectors';
import { getTicket } from '../../store/tickets/selectors';
import { Dropdown } from '../../components/drop-down';
import { TicketActionCreators } from '../../store/tickets/actions';
import { TicketUpdatePayload } from '../../store/tickets/reducer';

const mapStateToProps = (state: RootState, ownProps: any) => {
    const { ticketId } = ownProps;
    const tenors = getTenors(state);
    const { tenor: selectedTenor } = getTicket(state)(ticketId);
    return {
        tenors,
        selectedTenor
    }
};
  
const dispatchToProps = {
    updateTicket: TicketActionCreators.updateTicket.create
};

interface OwnProps {
    ticketId: string;
}

interface Props {
    tenors: string[];
    selectedTenor?: string;
    updateTicket: (update: TicketUpdatePayload) => void;
}

type State = {};

class TenorSelectorContainer extends React.Component<Props & OwnProps, State> {

    handleChanged = (value: any) => {
        console.warn('update', value);
        const { updateTicket, ticketId } = this.props;
        const update: TicketUpdatePayload = { field: 'tenor', id: ticketId, value };
        updateTicket(update);
    }

    render() {
        const { selectedTenor, tenors } = this.props;
        const options = tenors.map((tenor: string)=> ({ value: tenor, label: tenor }));
        return (<Dropdown onChange={this.handleChanged} options={options} selected={selectedTenor} />);
    }
}

export default connect(mapStateToProps, dispatchToProps)(TenorSelectorContainer);

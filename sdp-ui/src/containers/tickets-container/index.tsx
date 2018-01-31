
import * as React from 'react';
import * as TicketsSelectors from '../../store/tickets/selectors';
import { RootState } from '../../store/index';
import { connect } from 'react-redux';
import { Ticket, TicketsState } from '../../store/tickets/reducer';
import { TicketActionCreators } from '../../store/tickets/actions';
import { Tickets } from "./components/tickets";

const mapStateToProps = (state: RootState) => ({
    tickets: TicketsSelectors.getTickets(state)
  });

const dispatchToProps = {
    addTicket: TicketActionCreators.addTicket.create
};

interface Props {
    tickets: TicketsState,
    addTicket: (symbol: string) => void;
}
type State = {};
class TicketsContainer extends React.Component<Props, State> {

    handleAddTicket = (symbol: string) => () => {
        const { addTicket } = this.props;
        addTicket(symbol);
    };

    render() {
        const { tickets } = this.props;
        const ticketList: Ticket[] = Object.values(tickets);
        return (
              <div>
                <button onClick={this.handleAddTicket('GBPUSD')} > Add GBPUSD </button>
                <button onClick={this.handleAddTicket('EURUSD')} > Add EURUSD</button>
                <Tickets tickets={ticketList} />
              </div>
        );
      }
}

export default connect(mapStateToProps, dispatchToProps)(TicketsContainer);

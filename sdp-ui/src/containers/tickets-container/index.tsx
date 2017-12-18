
import * as React from 'react';
import * as TicketsSelectors from '../../store/tickets/selectors';
import { RootState } from '../../store/index';
import { PageHeader } from '../../components/page-header';
import { PageSection } from '../../components/page-section';
import { connect } from 'react-redux';
import { Ticket } from '../../store/tickets/reducer';
import { TicketActionCreators } from '../../store/tickets/actions';
import TicketContainer from '../ticket-container/index';
const mapStateToProps = (state: RootState) => ({
    tickets: TicketsSelectors.getTickets(state)
  });
  
const dispatchToProps = {
    addTicket: TicketActionCreators.addTicket.create
};

interface Props {
    tickets: Ticket[],
    addTicket: (symbol: string) => void;
}
type State = {};
class TicketsContainer extends React.Component<Props, State> {

    handleAddTicket = (symbol: string) => () => {
        const { addTicket } = this.props;
        addTicket(symbol);
    }
    render() {
        const { tickets } = this.props;
        const ticketElements = tickets.map((ticket: Ticket) => (<TicketContainer key={ticket.id} {...ticket} />));
        return (
          <article>
            <PageHeader>FX Tickets Container</PageHeader>
            <PageSection>
                <button onClick={this.handleAddTicket('GBPUSD')} > Add GBPUSD </button>
                <button onClick={this.handleAddTicket('EURUSD')} > Add EURUSD</button>
                {ticketElements}
            </PageSection>
          </article>
        );
      }
}

export default connect(mapStateToProps, dispatchToProps)(TicketsContainer);

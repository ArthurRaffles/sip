import * as React from 'react';
import TicketContainer from '../../ticket-container/index';
import { Ticket } from "../../../store/tickets/reducer";
import './tickets.css';
import { DebugComponent } from '../../../components/debug-component';

export interface Props {
  tickets: Ticket[]
}
const Hoc = DebugComponent(TicketContainer);

export const Tickets = (props: Props) => {
  const { tickets } = props;

  const ticketElements = tickets.map((ticket: Ticket) => (<Hoc key={ticket.id} {...ticket} />));
  return (<div className='tickets-container'>{ticketElements}</div>);
};

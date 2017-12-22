import * as React from 'react';
import TicketContainer from '../../ticket-container/index';
import {Ticket} from "../../../store/tickets/reducer";
import './tickets.css';

export interface Props {
  tickets: Ticket[]
}

export const Tickets = (props: Props) => {
  const { tickets } = props;
  const ticketElements = tickets.map((ticket: Ticket) => (<TicketContainer key={ticket.id} {...ticket} />));
  return (<div className='tickets-container'>{ticketElements}</div>);
};

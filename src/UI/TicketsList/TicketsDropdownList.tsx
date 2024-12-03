import React from 'react';
import { TicketReadDto } from '../../DTOs/Ticket/TicketReadDto';

interface TicketsDropdownProps {
	tickets: TicketReadDto[];
	price: number;
	isPaid: boolean;
}

const TicketsDropdownList: React.FC<TicketsDropdownProps> = ({ tickets, price, isPaid }) => {
	return (
		<details
			style={{ backgroundColor: '#cccccc', borderRadius: '10px', padding: '10px', width: '100%' }}>
			<summary style={{ cursor: 'pointer' }}>
				{tickets.length} tickets, price {price} UAH
				<span style={{ marginLeft: '5px', color: isPaid ? 'green' : 'red' }}>
					{isPaid ? 'Confirmed' : 'Pending'}
				</span>
			</summary>
			<div style={{ marginTop: '10px' }}>
				{tickets.map((ticket) => (
					<div
						style={{
							border: '1px solid black',
							padding: '0 10px',
							borderRadius: '10px',
							marginTop: '2px',
						}}>
						<p>
							Row {ticket.rowIndex + 1}, Seat {ticket.seatIndex + 1}
						</p>
					</div>
				))}
			</div>
		</details>
	);
};

export default TicketsDropdownList;

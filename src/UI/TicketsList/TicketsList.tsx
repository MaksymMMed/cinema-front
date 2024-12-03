import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import TicketsDropdownList from './TicketsDropdownList';
import { InvoiceDetailsReadDto } from '../../DTOs/Invoice/InvoiceDetailsReadDto';

interface TicketsListProps {
	tickets: InvoiceDetailsReadDto[];
	style?: React.CSSProperties;
}

const TicketsList: React.FC<TicketsListProps> = ({ tickets, style }) => {
	return (
		<div>
			{tickets.map((Invoice) => (
				<div
					key={Invoice.id}
					style={{
						backgroundColor: '#dbdbdb',
						// padding: '10px 20px',
						// border: '2px solid gray',
						marginBottom: '20px',
						...style,
					}}>
					<div style={{ display: 'flex' }}>
						<Link to={`/film/${Invoice.tickets[0].movie.id}`}>
							<img src={Invoice.tickets[0].movie.imageUrl} alt={Invoice.tickets[0].movie.name} />
						</Link>
						<div style={{ marginLeft: '40px' }}>
							<h3 style={{ margin: 0, fontWeight: 200 }}>#{Invoice.id}</h3>
							<p style={{ fontSize: '30px', margin: '5px 0' }}>{Invoice.tickets[0].movie.name}</p>
							<div style={{ display: 'flex' }}>
								<div>
									<p>date:</p>
									<p>
										{new Date(Invoice.tickets[0].sessionDateUtc).toLocaleDateString('en-GB', {
											weekday: 'long',
											day: '2-digit',
											month: '2-digit',
											year: 'numeric',
										})}
									</p>
								</div>
								<div style={{ marginLeft: '50px' }}>
									<p>time:</p>
									<p>
										{new Date(Invoice.tickets[0].sessionDateUtc).toLocaleTimeString('en-GB', {
											hour: '2-digit',
											minute: '2-digit',
										})}
									</p>
								</div>
								<div style={{ marginLeft: '50px' }}>
									<p>hall:</p>
									<p>{Invoice.tickets[0].hallName}</p>
								</div>
							</div>
							<div className="all-tickets">
								<TicketsDropdownList
									tickets={Invoice.tickets}
									price={Invoice.amount}
									isPaid={Invoice.isPaid}
								/>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default TicketsList;

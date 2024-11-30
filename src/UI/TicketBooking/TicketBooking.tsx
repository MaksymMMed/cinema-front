import React, { useState, useEffect } from 'react';

import Button from '../Button/Button';
import { SessionDetailsDto } from '../../DTOs/Session/SessionDetailsDto';
import { HallDetailReadDto } from '../../DTOs/Hall/HallDetailReadDto';
import { getHallDetails } from '../../Api/HallApi';

interface TicketBookingProps {
  sessionDetails: SessionDetailsDto;
}

const TicketBooking: React.FC<TicketBookingProps> = ({ sessionDetails }) => {
  const [hallDetails, setHallDetails] = useState<HallDetailReadDto | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [finalPrice, setFinalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchHallDetails = async () => {
      const hallData = await getHallDetails(sessionDetails.hallId);
      setHallDetails(hallData);
    };
    fetchHallDetails();
  },[]);

  const toggleSeatSelection = (rowIndex: number, seatIndex: number) => {
    const seatIdentifier = `${rowIndex}-${seatIndex}`;

    setSelectedSeats((prevSelectedSeats) => {
      let updatedSeats;
      if (prevSelectedSeats.includes(seatIdentifier)) {
        updatedSeats = prevSelectedSeats.filter((seat) => seat !== seatIdentifier);
      } else {
        updatedSeats = [...prevSelectedSeats, seatIdentifier];
      }

      // Оновлення ціни з урахуванням множника
      const updatedFinalPrice = updatedSeats.reduce((total, seat) => {
        const [row, seatIdx] = seat.split('-').map(Number);
        const rowMultiplier = hallDetails?.rowsData[row]?.priceMultiplier || 1;
        return total + sessionDetails.basePrice * rowMultiplier;
      }, 0);

      setFinalPrice(updatedFinalPrice);
      return updatedSeats;
    });
  };

  if (!hallDetails) return <p>Loading hall details...</p>;

  return (
    <div className="ticket-booking">
      <div className="hall-section">
        <div className="hall-schema">
          {sessionDetails.seats.map((seatRow, rowIndex) => (
            <div key={rowIndex} className="hall-row">
              {seatRow.map((seat, seatIndex) => (
                <div
                  key={seatIndex}
                  className={`seat ${seat ? 'occupied' : ''} ${
                    selectedSeats.includes(`${rowIndex}-${seatIndex}`) ? 'selected' : ''
                  }`}
                  onClick={() => !seat && toggleSeatSelection(rowIndex, seatIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <div className="reservation-section">
          <p>Your reservation</p>
          <hr />
          {selectedSeats.length === 0 ? (
            <p>No seats selected</p>
          ) : (
            selectedSeats.map((seatIdentifier, index) => {
              const [rowIndex, seatIndex] = seatIdentifier.split('-');
              return (
                <p key={index}>
                  Seat {parseInt(rowIndex) + 1}-{parseInt(seatIndex) + 1} (Price : {hallDetails.rowsData[parseInt(rowIndex)].priceMultiplier})
                </p>
              );
            })
          )}
          <hr />
          <p>Final price: {finalPrice.toFixed(2)} UAH</p>
          <Button size="xl" onClick={() => alert('Booking confirmed!')}>Booking</Button>
        </div>
      </div>
    </div>
  );
};

export default TicketBooking;

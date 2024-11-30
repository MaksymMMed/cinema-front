import Button from '../../UI/Button/Button'
import { useLocation } from 'react-router-dom';
import './BookingPage.css'
import { useEffect, useState } from 'react';
import { getSessionDetails } from '../../Api/SessionApi';
import { SessionDetailsDto } from '../../DTOs/Session/SessionDetailsDto';

const BookingPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('sessionId');
  
    const [sessionDetails, setSessionDetails] = useState<SessionDetailsDto | null>(null);

    console.log(sessionId)
  
      const fetchSessionDetails = async () => {
        try {
          if (sessionId) {
            const response = await getSessionDetails(sessionId);
            console.log(response)
            setSessionDetails(response);
          }
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      };
    
    useEffect(() => {
        fetchSessionDetails();
    }, [sessionId]);

    return(
        <div className="booking-page">
            <div className='booking-movie-section'>
                <img src={sessionDetails?.movie?.imageUrl} alt="movie" />
                <div className='booking-movie-info'>
                    <p style={{fontSize:'24px',fontWeight:'400'}}>{sessionDetails?.movie?.name}</p>
                    <p>{sessionDetails?.movie?.description}</p>
                    <div className='session-info'>
                        <div style={{marginLeft:'15px'}}>
                            <p>date:</p>
                            <p>{new Date(sessionDetails?.startDateUtc!).toLocaleDateString('en-GB', {
                                weekday: 'long',
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                })}</p>
                            
                        </div>
                        <div style={{marginLeft:'15px'}}>
                            <p>time:</p>
                            <p>
                                {new Date(sessionDetails?.startDateUtc!).toLocaleTimeString('en-GB', {
                                hour: '2-digit',
                                minute: '2-digit',
                                })}
                            </p>
                        </div>
                        <div style={{marginLeft:'15px'}}>
                            <p>hall:</p>
                            <p>{sessionDetails?.hallName}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='hall-section'>  
            <div className='hall-schema'>
                {sessionDetails?.seats.map((seatRow, rowIndex) => (
                    <div key={rowIndex} className='hall-row'>
                        {seatRow.map((seat, seatIndex) => (
                            <div 
                                key={seatIndex} 
                                className={`seat ${seat ? 'occupied' : ''}`}
                            >
                            </div>
                        ))}
                    </div>
                ))}
            </div>

                <div className='reservation-section'>
                    <p>Your reservation</p>
                    <hr />
                    <p>ticket 1</p>
                    <p>ticket 1</p>
                    <p>ticket 1</p>
                    <hr />
                    <p>Final price: 450 uah</p>
                    <Button size='xl'>Booking</Button>
                </div>
            </div>
        </div>
    )
}

export default BookingPage
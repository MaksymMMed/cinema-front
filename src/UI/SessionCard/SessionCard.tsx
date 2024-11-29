import React, { CSSProperties } from 'react';
import { SessionDateTimeDto } from '../../DTOs/Session/SessionDateTimeDto';

interface SessionProps {
  session: SessionDateTimeDto
  style?:React.CSSProperties
}

const SessionCard: React.FC<SessionProps> = ({session,style}) => {

  return (
    <div style={{backgroundColor:'#dbdbdb', padding:'10px 20px 10px 10px',border:'2px solid gray',
    display:'flex',...style}}>
      <p>{new Date(session.dateUtc).toLocaleString()}</p>
    </div>
  );
};

export default SessionCard;

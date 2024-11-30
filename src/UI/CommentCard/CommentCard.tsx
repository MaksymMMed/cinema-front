import React, { CSSProperties } from 'react';

interface CommentProps {
  createdBy?: string;
  rank?: number;
  comment?: string;
  style?:React.CSSProperties
}

const CommentCard: React.FC<CommentProps> = ({createdBy,rank,comment,style}) => {

  return (
    <div style={{backgroundColor:'#dbdbdb', padding:'10px 20px 10px 10px',border:'2px solid gray',
    display:'flex',...style}}>
        <div style={{width:'10%'}}>
            <img style={{width:'60px',height:'60px',backgroundColor:'gray',borderRadius:'50%',padding:'5px'}} 
            src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" 
            alt="user logo" />
            <p>{createdBy}</p>
        </div>
        <div style={{marginLeft:'25px',textAlign:'start'}}>
            <p>{rank}/10</p>
            <p>{comment}</p>
        </div>
    </div>
  );
};

export default CommentCard;

import React from 'react'
import './Card.css'
import mario from '../asset/mario.png'

const Card = ({card, handleCardClick, disabled}) => {

return (
    <button 
    className={`card ${card.matchFound ? 'matched' : ''}`} 
    onClick={handleCardClick} 
    data-id={card.id} 
    disabled={disabled} 
    >
    <div className='front side'>
      <img 
        src={mario} 
        alt='mario' 
        />
    </div>
    <div className='side back'>
        {card.emoji}
    </div>
    </button>
  )
}

export default Card

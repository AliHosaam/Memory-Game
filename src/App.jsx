import './App.css';
import React, {useState, useEffect} from 'react'
import Card  from './components/Card'


export default function App() {

const [cards, setCards] = useState(null)
const [score, setScore] = useState(0)
const [moves, setMoves] = useState(0)
const [disabled, setDisabled] = useState(false)
const [firstSelection, setFirstSelection] = useState(null)
const [secondSelection, setSecondSelection] = useState(null)
const items = [ {
  emoji: "👇",
  id: "1",
  matchFound: false,
  flipped: false,
},
{
  emoji: "👀",
  id: "2",
  matchFound: false,
  flipped: false,
},
{
  emoji: "🙌",
  id: "3",
  matchFound: false,
  flipped: false,
},
{
  emoji: "👋",
  id: "4",
  matchFound: false,
  flipped: false,
},
{
  emoji: "🙏",
  id: "5",
  matchFound: false,
  flipped: false,
},
{
  emoji: "🤔",
  id: "6",
  matchFound: false,
  flipped: false,
},
{
  emoji: "🤦‍♂️",
  id: "7",
  matchFound: false,
  flipped: false,
},
{
 emoji: "😔",
 id: "8",
 matchFound: false,
 flipped: false,
} ];


const resetCards = () => {
  const shuffled = [...items, ...items]
  .sort(() => Math.random() - 0.5)
  .map((card) => ({...card, key: Math.random()}))
  setCards(shuffled)
}


const handleCardClick = (e) => {
  firstSelection 
     ? setSecondSelection(e.target.dataset.id)
     : setFirstSelection(e.target.dataset.id)
     
}
 

// eslint-disable-next-line react-hooks/exhaustive-deps
function resetTurn() {
  setFirstSelection(null)
  setSecondSelection(null)
  setMoves(m => m + 1 )
  setDisabled(false)
}
 

const handleNewGameClick = () => {
  resetTurn()
  setMoves(0)
  setScore(0)
  resetCards()
}


useEffect(() => {
  if (!secondSelection) {
    return;
  }

  setDisabled(true);

  if (firstSelection === secondSelection) {
    setCards(prev => {
      return prev.map(card => {
        return card.id === firstSelection ? {...card, matchFound: true} : card;
      });
    });
    setScore(prevScore => prevScore + 1);
    resetTurn()
  } else {
    setTimeout(() => {
      resetTurn();
    }, 500);
  }

}, [firstSelection, secondSelection]);


useEffect(() => {
  resetCards()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])  


return (
     <div className="App">
      <button onClick={() => handleNewGameClick()}>
        New Game
      </button>
       <div className='gameboard'>
         {

           cards && (
            Object.values(cards).map((card) => <Card 
            key={card.key} 
            card={card}
            handleCardClick={handleCardClick}
            disabled={disabled}
            />
           ))

         }
       </div>
         <p>Total Moves: {moves}</p>
         <p>Total Score: {score}</p>
     </div>
  );
}


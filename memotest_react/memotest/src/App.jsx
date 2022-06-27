// https://www.youtube.com/watch?v=OpZEIxqQfIs&t=1002s

import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import { images } from './imgImports';

function App() {
  const [cards, setCards] = useState([]);
  const [firstCardSelected, setFirstCardSelected] = useState({});
  const [secondCardSelected, setSecondCardSelected] = useState({});
  const [unflipedCards, setUnflippedCards] = useState([]);
  const [disabledCards, setDisabledCards] = useState([]);

  useEffect(() => {
    shuffle(images);
    setCards(images);
  }, []);

  useEffect(() => checkForMatch(), [secondCardSelected]);

  const shuffle = (arrayCard) => {
    var j, x, i;
    for (i = arrayCard.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = arrayCard[i];
      arrayCard[i] = arrayCard[j];
      arrayCard[j] = x;
    }
    return arrayCard;
  };

  const flipCard = (name, number) => {
    if (
      firstCardSelected.name === name &&
      firstCardSelected.number === number
    ) {
      console.log(name, number);
      return 0;
    }
    if (!firstCardSelected.name) {
      setFirstCardSelected({ name, number });
    } else if (!secondCardSelected.name) {
      setSecondCardSelected({ name, number });
    }
    return 1;
  };

  const checkForMatch = () => {
    if (firstCardSelected.name && secondCardSelected.name) {
      const match = firstCardSelected.name === secondCardSelected.name;
      match ? disableCards() : unflipCards();
    }
  };

  const disableCards = () => {
    setDisabledCards([firstCardSelected.number, secondCardSelected.number]);
    resetCards();
    console.log(disabledCards);
  };
  const unflipCards = () => {
    setUnflippedCards([firstCardSelected.number, secondCardSelected.number]);
    resetCards();
    console.log('unflipCards');
  };
  const resetCards = () => {
    setFirstCardSelected({});
    setSecondCardSelected({});
  };

  return (
    <div className='App'>
      <div className='cards-container'>
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              name={card.animal}
              number={index}
              frontFace={card.src}
              flipCard={flipCard}
              unflipedCards={unflipedCards}
              disabledCards={disabledCards}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;

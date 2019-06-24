import React, { useState } from "react";
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";
import PlayerCard from "../../UI/playerCards";
import Otamendi from "../../../Resources/images/players/Otamendi.png";

const Cards = ({ showCard }) => {
  const [cards] = useState([
    { bottom: 90, left: 150 },
    { bottom: 60, left: 100 },
    { bottom: 30, left: 50 },
    { bottom: 0, left: 0 }
  ]);

  const showAnimateCards = () =>
    cards.map((card, i) => (
      <Animate
        key={i}
        show={showCard}
        start={{
          left: 0,
          bottom: 0
        }}
        enter={{
          left: [card.left],
          bottom: [card.bottom],
          timing: { delay: 600, duration: 900, ease: easePolyOut }
        }}
      >
        {({ left, bottom }) => {
          return (
            <div
              style={{
                position: "absolute",
                background: `url(${Otamendi})`,
                bottom,
                left
              }}
            >
              <PlayerCard
                name="Nicolas"
                lastname="Otamendi"
                number="30"
                bck={Otamendi}
              />
            </div>
          );
        }}
      </Animate>
    ));

  return <div>{showAnimateCards()}</div>;
};

export default Cards;

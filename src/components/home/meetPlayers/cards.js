import React, { useState } from "react";
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";
import PlayerCard from "../../UI/playerCards";
import Otamendi from "../../../Resources/images/Otamendi.png";

const Cards = ({ showCard }) => {
  const [cards] = useState([
    { bottom: 30, left: 60 },
    { bottom: 15, left: 30 },
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
          timing: { delay: 400, duration: 600, ease: easePolyOut }
        }}>
        {({ left, bottom }) => {
          return (
            <div
              style={{
                position: "absolute",
                bottom,
                left
              }}>
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

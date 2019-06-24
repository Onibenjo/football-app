import React, { useState } from "react";
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";

const Stripes = () => {
  const [stripes] = useState([
    { background: "#98c5e9", left: 80, rotate: 25, top: -260, delay: 0 },
    { background: "#ffffff", left: 280, rotate: 25, top: -400, delay: 400 },
    { background: "#98c5e9", left: 480, rotate: 25, top: -500, delay: 800 }
  ]);

  const showStripes = () =>
    stripes.map((stripe, i) => (
      <Animate
        key={i}
        show={true}
        start={{
          background: "#ffffff",
          opacity: 0,
          left: 0,
          rotate: 0,
          top: 0
        }}
        enter={{
          background: `${stripe.background}`,
          opacity: [1],
          left: [stripe.left],
          rotate: [stripe.rotate],
          top: [stripe.top],
          timing: {
            delay: stripe.delay,
            duration: 500,
            ease: easePolyOut
          }
        }}
      >
        {({ rotate, opacity, top, left, background }) => {
          return (
            <div
              className="stripe"
              style={{
                background,
                opacity,
                transform: `rotate(${rotate}deg) translate(${left}px,${top}px)`
              }}
            />
          );
        }}
      </Animate>
    ));

  return <section className="featured_stripes">{showStripes()}</section>;
};

export default Stripes;

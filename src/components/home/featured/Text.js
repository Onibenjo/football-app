import React from "react";
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";
import featuredPlayer from "../../../Resources/images/featured_player.png";

const Text = () => {
  const animateNumber = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        rotate: 0
      }}
      enter={{
        opacity: [1],
        rotate: [360],
        timing: {
          delay: 800,
          duration: 600,
          ease: easePolyOut
        }
      }}>
      {({ opacity, rotate }) => {
        return (
          <div
            className="featured_number"
            style={{
              opacity,
              transform: `rotateY(${rotate}deg)`
            }}>
            3
          </div>
        );
      }}
    </Animate>
  );
  const animateFirst = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: 5,
        y: 4
      }}
      enter={{
        opacity: [1],
        x: [15],
        y: [40],
        timing: {
          delay: 1000,
          duration: 500,
          ease: easePolyOut
        }
      }}>
      {({ opacity, x, y }) => {
        return (
          <div
            className="featured_first"
            style={{
              opacity,
              bottom: `${y}%`,
              left: `${x}%`
            }}>
            League
          </div>
        );
      }}
    </Animate>
  );
  const animateSecond = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: 5,
        y: 4
      }}
      enter={{
        opacity: [1],
        x: [10],
        y: [20],
        timing: {
          delay: 1200,
          duration: 500,
          ease: easePolyOut
        }
      }}>
      {({ opacity, x, y }) => {
        return (
          <div
            className="featured_second"
            style={{
              opacity,
              bottom: `${y}%`,
              left: `${x}%`
            }}>
            Championship
          </div>
        );
      }}
    </Animate>
  );
  const animatePlayer = () => (
    <Animate
      show={true}
      start={{
        opacity: 0
      }}
      enter={{
        opacity: [1],
        timing: {
          delay: 1800,
          duration: 800,
          ease: easePolyOut
        }
      }}>
      {({ opacity }) => {
        return (
          <div
            className="featured_player"
            style={{
              opacity,
              background: `url(${featuredPlayer})`
            }}
          />
        );
      }}
    </Animate>
  );
  return (
    <div className="featured_wrapper" style={{ position: "relative" }}>
      {animatePlayer()}
      {animateNumber()}
      {animateFirst()}
      {animateSecond()}
    </div>
  );
};

export default Text;

import React, { useState } from "react";
import Stripes from "../../../Resources/images/stripes.png";
import { Tag } from "../../UI/misc";
import Reveal from "react-reveal/Reveal";
import HomeCards from "./cards";

const MeetPlayers = () => {
  const [show, setShow] = useState(false);
  return (
    <Reveal
      fraction={0.7}
      onReveal={() => {
        setShow(true);
      }}
    >
      <div
        className="home_meetplayers"
        style={{ background: `#fff url(${Stripes})`, display: "flex" }}
      >
        <div className="container">
          <div className="home_meetplayers_wrapper">
            <div className="home_card_wrapper">
              <HomeCards showCard={show} />
            </div>
            <div className="home_text_wrapper">
              <div>
                <Tag
                  bck="#0e1731"
                  size="6rem"
                  color="#ffffff"
                  add={{
                    display: "inline-block",
                    marginBottom: "20px"
                  }}
                >
                  Meet
                </Tag>
              </div>
              <div>
                <Tag
                  bck="#0e1731"
                  size="6rem"
                  color="#ffffff"
                  add={{
                    display: "inline-block",
                    marginBottom: "20px"
                  }}
                >
                  The
                </Tag>
              </div>
              <div>
                <Tag
                  bck="#0e1731"
                  size="6rem"
                  color="#ffffff"
                  add={{
                    display: "inline-block",
                    marginBottom: "20px"
                  }}
                >
                  Players
                </Tag>
              </div>
              <div>
                <Tag
                  bck="#fff"
                  size="27px"
                  color="#0e1731"
                  link={true}
                  linkTo="/the_team"
                  add={{
                    display: "inline-block",
                    marginBottom: "27px",
                    border: `1px solid #0e1731`,
                    fontSize: "1rem"
                  }}
                >
                  Meet them
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default MeetPlayers;

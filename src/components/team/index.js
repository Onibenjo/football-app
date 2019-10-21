import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import PlayerCard from "../UI/playerCards";

import Stripes from "../../Resources/images/stripes.png";
import { firebasePlayers, firebase } from "./../../firebase";
import { firebaseArrayLoop } from "../UI/misc";
import { Promise } from "core-js";

const Team = () => {
  const [loading, setLoading] = useState(true);
  const [playersList, setPlayersList] = useState([]);

  useEffect(() => {
    firebasePlayers.once("value").then(snap => {
      const players = firebaseArrayLoop(snap);
      let promises = [];

      for (let key in players) {
        promises.push(
          new Promise((resolve, reject) => {
            firebase
              .storage()
              .ref("players")
              .child(players[key].image)
              .getDownloadURL()
              .then(url => {
                players[key].url = url;
                resolve();
              })
              .catch(() => {
                reject();
              });
          })
        );
      }
      Promise.all(promises).then(() => {
        setLoading(false);
        setPlayersList(players);
      });
    });
  }, []);

  const showPlayersByCategory = category =>
    playersList &&
    playersList.map(({ url, name, number, lastname, position }, i) => {
      return position === category ? (
        <Fade left key={i} delay={i * 20}>
          <div className="item">
            <PlayerCard
              bck={url}
              name={name}
              number={number}
              lastname={lastname}
            />
          </div>
        </Fade>
      ) : (
        ""
      );
    });

  return (
    <div
      className="the_team_container"
      style={{ background: `url(${Stripes}) repeat` }}>
      {!loading && (
        <div>
          <div className="team_category_wrapper">
            <div className="title">Keepers</div>
            <div className="team_cards">{showPlayersByCategory("Keeper")}</div>
          </div>
          <div className="team_category_wrapper">
            <div className="title">Defence</div>
            <div className="team_cards">{showPlayersByCategory("Defence")}</div>
          </div>
          <div className="team_category_wrapper">
            <div className="title">Midfield</div>
            <div className="team_cards">
              {showPlayersByCategory("Midfield")}
            </div>
          </div>
          <div className="team_category_wrapper">
            <div className="title">Strikers</div>
            <div className="team_cards">{showPlayersByCategory("Striker")}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;

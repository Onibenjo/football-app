import React from "react";
import Featured from "./featured";
import HomeMatches from "./matches/HomeMatches";
import MeetPlayers from "./meetPlayers";
import Promotion from "./promotion";

const Home = () => {
  return (
    <div className="bck_blue">
      <Featured />
      <HomeMatches />
      <MeetPlayers />
      <Promotion />
    </div>
  );
};
export default Home;

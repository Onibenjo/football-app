import React from "react";
import { Tag } from "../../UI/misc";
import Block from "./Block";
const HomeMatches = () => {
  return (
    <div className="home_matches_wrapper">
      <div className="container" style={{ padding: "0 1rem", maxWidth: "80%" }}>
        <Tag
          bck="#0e1731"
          size="50px"
          color="#fff"
          add={{ borderRadius: "8px" }}
        >
          Matches
        </Tag>
        <Block />
        <Tag
          bck="#fff"
          size="22px"
          color="#0e1731"
          add={{ borderRadius: "5px" }}
          link={true}
          linkTo="/the_team"
        >
          See more Matches
        </Tag>
      </div>
    </div>
  );
};

export default HomeMatches;

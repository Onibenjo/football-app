import React, { useState, useEffect } from "react";
import { firebaseMatches } from "../../../firebase";
import { firebaseArrayLoop, reverseArray } from "../../UI/misc";
import MatchBlock from "../../UI/MatchBlock";
import { Slide } from "react-reveal";

const Block = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebaseMatches
      .orderByChild("date")
      .limitToFirst(6)
      .once("value")
      .then(res => {
        const data = firebaseArrayLoop(res);
        setMatches(reverseArray(data));
        setLoading(false);
      });
  }, []);

  const showMatches = matches =>
    loading ?
    (
     <div>Loading...</div>
   ) :
    (
      matches.map(match => (
        <Slide bottom key={match.id}>
          <div className="item">
            <div className="wrapper">
              <MatchBlock match={match} />
            </div>
          </div>
        </Slide>
      ))
    );

  return <div className="home_matches">{showMatches(matches)}</div>;
};

export default Block;

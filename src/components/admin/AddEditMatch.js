import React, { useState, useEffect, useCallback } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import { firebaseArrayLoop } from "../UI/misc";
import { firebaseMatches, firebaseDB, firebaseTeams } from "../../firebase";
import FormField from "../UI/FormField";
import { validate } from "../UI/misc";
import AdminLayout from "../../HOC/AdminLayout";

const AddEditMatches = ({ match, history }) => {
  const [matchId, setMatchId] = useState("");
  const [formType, setFormType] = useState("Edit Match");
  const [loading, setLoading] = useState(true);
  // const [matches, setMatches] = useState([]);

  const validation = {
    required: true,
    valid: false,
    message: ""
  };

  const [date, setDate] = useState({
    element: "input",
    value: "",
    config: {
      name: "date",
      type: "date",
      label: "Event date"
    },
    showLabel: true
  });

  const [local, setLocal] = useState({
    element: "select",
    value: "",
    config: {
      name: "Select Home",
      type: "select",
      label: "Select home team",
      options: []
    },
    showLabel: false
  });

  const [resultLocal, setResultLocal] = useState({
    element: "input",
    value: "",
    config: {
      name: "result_local_input",
      type: "text",
      label: "Result Local"
    },
    showLabel: false
  });

  const [away, setAway] = useState({
    element: "select",
    value: "",
    config: {
      name: "Select Away",
      type: "select",
      label: "Select away team",
      options: []
    },
    showLabel: false
  });

  const [resultAway, setResultAway] = useState({
    element: "input",
    value: "",
    config: {
      name: "result_away_input",
      type: "text",
      label: "Result awayy"
    },
    showLabel: false
  });

  const [referee, setReferee] = useState({
    element: "input",
    value: "",
    config: {
      name: "referee_input",
      type: "text",
      label: "Referee"
    },
    showLabel: true
  });

  const [stadium, setStadium] = useState({
    element: "input",
    value: "",
    config: {
      name: "stadium_input",
      type: "text",
      label: "Stadium"
    },
    showLabel: true
  });

  const [result, setResult] = useState({
    element: "select",
    value: "",
    config: {
      name: "select_result",
      type: "select",
      label: "Team Result",
      options: [
        { key: "W", value: "W" },
        { key: "D", value: "D" },
        { key: "L", value: "L" },
        { key: "n/a", value: "n/a" }
      ]
    },
    showLabel: true
  });

  const [final, setFinal] = useState({
    element: "select",
    value: "",
    config: {
      name: "select_playyed",
      type: "select",
      label: "Game Played?",
      options: [{ key: "Yes", value: "Yes" }, { key: "No", value: "No" }]
    },
    showLabel: true
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");
  const [teams, setTeams] = useState([]);

  const successForm = message => {
    setSuccess(message);

    setTimeout(() => {
      setSuccess("");
    }, 2000);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const formdata = {
      date,
      local,
      resultLocal,
      away,
      resultAway,
      referee,
      stadium,
      result,
      final
    };

    let dataToSubmit = {};
    let formIsValid = true;

    
    for (let key in formdata) {
        dataToSubmit[key] = formdata[key].value;

        
        let [valid, message] = validate(formdata[key].value, validation);
      [formdata[key].valid, formdata[key].message] = [valid, message];
      
        formIsValid = formdata[key].valid &&  formIsValid;
    }

    teams.forEach(team => {
      if (team.shortName === dataToSubmit.local) {
        dataToSubmit["localThmb"] = team.thmb;
      }

      if (team.shortName === dataToSubmit.away) {
        dataToSubmit["awayThmb"] = team.thmb;
      }
    });
    console.log(formIsValid);
    console.log(formdata);
    if (formIsValid) {
      if (formType === "Edit Match") {
        firebaseDB
          .ref(`matches/${matchId}`)
          .update(dataToSubmit)
          .then(() => {
            successForm("Updated Form successfully");
          })
          .catch(err => setError(true));
      } else {
        firebaseMatches.push(dataToSubmit).then(() => history.push('/admin_matches')).catch(e => setError(true))
      }
    } else {
      setError(true);
    }
  };

  const updateFields = (match, teamOptions, teams, type, matchId) => {
    
    const newFormdata = {
      date,
      local,
      resultLocal,
      away,
      resultAway,
      referee,
      stadium,
      result,
      final
    };

    for (let key in newFormdata) {
      if (match) {
        newFormdata[key].value = match[key];
        newFormdata[key].valid = true;
      }
      if (key === "local" || key === "away") {
        newFormdata[key].config.options = teamOptions;
      }
    }

    setMatchId(matchId);
    setFormType(type);
    setTeams(teams);
    setLoading(false);
    setError(false)
  };

  const updateFieldsCB = useCallback(updateFields, []);

  useEffect(() => {
    console.log("edit atch effect ran")
    const matchId = match.params.id;
    setLoading(true);
    const getTeams = (match, type) => {
      firebaseTeams.once("value").then(snapshot => {
        const teams = firebaseArrayLoop(snapshot);
        const teamOptions = [];

        snapshot.forEach(childSnapshot => {
          teamOptions.push({
            key: childSnapshot.val().shortName,
            value: childSnapshot.val().shortName
          });
        });

        updateFieldsCB(match, teamOptions, teams, type, matchId);
      });
    };

    if (!matchId) {
      getTeams(false, "Add Match");
      setLoading(false);
    } else {
      firebaseDB
        .ref(`matches/${matchId}`)
        .once("value")
        .then(res => {
          const match = res.val();

          getTeams(match, "Edit Match");
        });
    }

    return () => firebaseDB.ref(`matches/${matchId}`).off()
  }, [match.params.id, updateFieldsCB]);

  return (
    <AdminLayout>
      <div className="editmatch_dialog_wrapper">
        <h2>{formType}</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <FormField
              id="date"
              formdata={date}
              
              handleChange={e => setDate({ ...date, value: e.target.value })}
            />

            <div className="select_team_layout">
              <div className="label_inputs">Local</div>
              <div className="wrapper">
                <div className="left">
                  <FormField
                    id="local"
                    formdata={local}
                    
                    handleChange={e =>
                      setLocal({ ...local, value: e.target.value })
                    }
                  />
                </div>

                <div>
                  <FormField
                    id="resultLocal"
                    formdata={resultLocal}
                    
                    handleChange={e =>
                      setResultLocal({ ...resultLocal, value: e.target.value })
                    }
                  /><span style={{color: 'rgba(0,0,0,0.4)', fontSize: '0.8rem'}}>Put a ' - ' (dash) if there are no results</span>
                </div>
              </div>
            </div>
            <div className="select_team_layout">
              <div className="label_inputs">Away</div>
              <div className="wrapper">
                <div className="left">
                  <FormField
                    id="away"
                    formdata={away}
                    
                    handleChange={e =>
                      setAway({ ...away, value: e.target.value })
                    }
                  />
                </div>

                <div>
                  <FormField
                    id="resultAway"
                    formdata={resultAway}
                    
                    handleChange={e =>
                      setResultAway({ ...resultAway, value: e.target.value })
                    }
                  /><span style={{color: 'rgba(0,0,0,0.4)', fontSize: '0.8rem'}}>Put a ' - ' (dash) if there are no results</span>
                </div>
              </div>
            </div>

            <div className="split_fields">
              <FormField
                id="referee"
                formdata={referee}
                
                handleChange={e =>
                  setReferee({ ...referee, value: e.target.value })
                }
              />
              <FormField
                id="stadium"
                formdata={stadium}
                
                handleChange={e =>
                  setStadium({ ...stadium, value: e.target.value })
                }
              />
            </div>
            <div className="split_fields">
              <FormField
                id="result"
                formdata={result}
                
                handleChange={e =>
                  setResult({ ...result, value: e.target.value })
                }
              />
              <FormField
                id="final"
                formdata={final}
                
                handleChange={e =>
                  setFinal({ ...final, value: e.target.value })
                }
              />
            </div>

            <div className="success_label" >{success}</div>
            {error ? (
              <div className="error_label">
                Something went wrong. Try again later.
              </div>
            ) : (
              ""
            )}

            <div className="admin_submit">
              <button disabled={loading} onClick={() => handleSubmit}>{formType}</button>
            </div>
          </form>
        </div>
      </div>
      <div className="admin_progress">
        {loading ? (
          <CircularProgress thickness={6} style={{ color: "#98c5e9" }} />
        ) : (
          ""
        )}
      </div>
    </AdminLayout>
  );
};

export default AddEditMatches;

import React, { useState, useEffect, useCallback } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import { firebasePlayers, firebaseDB, firebase } from "../../firebase";
import FormField from "../UI/FormField";
import FileUploader from "../UI/FileUploader";
import { validate } from "../UI/misc";
import AdminLayout from "../../HOC/AdminLayout";

const AddEditPlayer = ({ match, history }) => {
  const [playerId, setPlayerId] = useState("");
  const [formType, setFormType] = useState("Edit Player");
  const [loading, setLoading] = useState(false);

  const validation = {
    required: true,
    valid: false,
    message: ""
  };

  const [name, setName] = useState({
    element: "input",
    value: "",
    config: {
      name: "name_input",
      type: "text",
      label: "Player First Name"
    },
    showLabel: true
  });

  const [lastname, setLastName] = useState({
    element: "input",
    value: "",
    config: {
      name: "lastname_input",
      type: "text",
      label: "Player Last Name"
    },
    showLabel: true
  });

  const [number, setNumber] = useState({
    element: "input",
    value: "",
    config: {
      name: "number_input",
      type: "text",
      label: "Player Number"
    },
    showLabel: true
  });

  const [position, setPosition] = useState({
    element: "select",
    value: "",
    config: {
      name: "select_position",
      type: "select",
      label: "Select a position",
      options: [
        { key: "Keeper", value: "Keeper" },
        { key: "Defence", value: "Defence" },
        { key: "Midfield", value: "Midfield" },
        { key: "Striker", value: "Striker" }
      ]
    },
    showLabel: true
  });

  const [image, setImage] = useState({
    value: ""
  });

  const [defaultImg, setDefaultImg] = useState("");

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");

  const resetImage = () => {
    setImage({ value: "", valid: false });
    setDefaultImg("");
  };

  const storeFilename = filename => {
    setImage({ ...image, value: filename });
    
  };

  const successForm = message => {
    setSuccess(message);

    setTimeout(() => {
      setSuccess("");
    }, 2000);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const formdata = {
      name,
      lastname,
      number,
      position,
      image
    };

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in formdata) {
      dataToSubmit[key] = formdata[key].value;

      let [valid, message] = validate(formdata[key].value, validation);

      [formdata[key].valid, formdata[key].message] = [valid, message];

      formIsValid = formdata[key].valid && formIsValid;
    }

    if (formIsValid) {
      
      if (formType === "Edit Player") {
        firebaseDB
          .ref(`players/${playerId}`)
          .update(dataToSubmit)
          .then(() => {
            successForm("Updated successfully");
          })
          .catch(e => {
            setError(true);
          });
      } else {
        firebasePlayers
          .push(dataToSubmit)
          .then(() => {
            history.push("/admin_players");
          })
          .catch(() => {
            setError(true);
          });
      }
    } else {
      setError(true);
    }
  };

  const updateFields = (player, playerId, formType, defaultImg) => {
    const newFormdata = { name, lastname, number, position };
    for (let key in newFormdata) {
      newFormdata[key].value = player[key];
      newFormdata[key].valid = true;
    }
    setPlayerId(playerId);
    setDefaultImg(defaultImg);
    setFormType(formType);
  };

  const updateFieldsCB = useCallback(updateFields, []);
  
  useEffect(() => {
    const playerId = match.params.id;
    setLoading(true);

    if (!playerId) {
      setFormType("Add player");
      setLoading(false);
    } else {
      firebaseDB
        .ref(`players/${playerId}`)
        .once("value")
        .then(snapshot => {
          const playerData = snapshot.val();

          firebase
            .storage()
            .ref("players")
            .child(playerData.image)
            .getDownloadURL()
            .then(url => {
              updateFieldsCB(
                playerData,
                playerId,
                "Edit Player",
                url
              );
              setLoading(false);
            })
            .catch(() => {
              updateFieldsCB(
                {
                  ...playerData,
                  image: ""
                },
                playerId,
                "Edit Player",
                ""
              );
              setLoading(false);
              
            });
        }).catch(() => {setLoading(false) });
    }

    return () => firebaseDB.ref(`players/${playerId}`).off()
  }, [match.params.id, updateFieldsCB]);

  return (
    <AdminLayout>
      <div className="editplayers_dialog_wrapper">
        <h2>{formType}</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <FileUploader
              dir="players"
              tag={"Player Image"}
              defaultImg={defaultImg}
              defaultImgName={image.value}
              resetImage={() => resetImage()}
              filename={filename => storeFilename(filename)}
              setError={setError}
            />
            <FormField
              id="name"
              formdata={name}
              handleChange={e => setName({ ...name, value: e.target.value })}
            />
            <FormField
              id="lastname"
              formdata={lastname}
              handleChange={e =>
                setLastName({ ...lastname, value: e.target.value })
              }
            />
            <FormField
              id="number"
              formdata={number}
              handleChange={e =>
                setNumber({ ...number, value: e.target.value })
              }
            />
            <FormField
              id="position"
              formdata={position}
              handleChange={e =>
                setPosition({ ...position, value: e.target.value })
              }
            />

            <div className="success_label">{success}</div>
            {error && (
              <div className="error_label">
                Something went wrong. Try again later.
              </div>
            )}

            <div className="admin_submit">
              <button disabled={loading} onClick={() => handleSubmit}>
                {formType}
              </button>
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

export default AddEditPlayer;

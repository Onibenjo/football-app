import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase";
import FileUploader from "react-firebase-file-uploader";
import CircularProgress from "@material-ui/core/CircularProgress";

const FileUpload = ({
  defaultImg,
  defaultImgName,
  resetImage,
  tag,
  dir,
  filename,
  setError
}) => {
  const [name, setName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [fileURL, setFileURL] = useState("");

  const handleUploadSuccess = file_name => {
    setName(file_name);
    setIsUploading(false);

    firebase
      .storage()
      .ref(dir)
      .child(file_name)
      .getDownloadURL()
      .then(url => setFileURL(url));

    filename(file_name);
  };

  useEffect(() => {
    if (defaultImg) {
      setName(defaultImgName);
      setFileURL(defaultImg);
    }
  }, [defaultImgName, defaultImg]);

  const uploadAgain = () => {
    setName("");
    setIsUploading(false);
    setFileURL("");
    resetImage();
  };

  const handleUploadError = () => {
    setError(true);
    setIsUploading(false);
  };

  return (
    <div>
      {!fileURL ? (
        <div>
          <div className="label_inputs">{tag}</div>
          <FileUploader
            accept="image/*"
            name="image"
            randomizeFilename
            storageRef={firebase.storage().ref(dir)}
            onUploadStart={() => setIsUploading(true)}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
          />
        </div>
      ) : null}
      {isUploading && (
        <div
          className="progress"
          style={{ textAlign: "center", margin: "30px 0" }}>
          <CircularProgress style={{ color: "#98c6e9" }} thickness={7} />
        </div>
      )}
      {fileURL && (
        <div className="image_upload_container">
          <img
            style={
              {
                // width: "100%",
              }
            }
            src={fileURL}
            alt={name}
          />
          <div className="remove" onClick={() => uploadAgain()}>
            Remove
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

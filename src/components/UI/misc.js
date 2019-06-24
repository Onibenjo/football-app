import React from "react";
import { Link } from "react-router-dom";

export const Tag = ({ children, link, linkTo, bck, color, size, add }) => {
  const template = (
    <div
      style={{
        background: bck,
        fontSize: size,
        color: color,
        padding: "5px 10px",
        display: "inline-block",
        fontFamily: "Righteous",
        ...add
      }}
    >
      {children}
    </div>
  );
  return link ? <Link to={linkTo}>{template}</Link> : template;
};

export const firebaseArrayLoop = snapshot => {
  const data = [];
  snapshot.forEach(snapshotChild => {
    data.push({
      ...snapshotChild.val(),
      id: snapshotChild.key
    });
  });
  return data;
};

export const reverseArray = array => {
  return array.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const validate = (data, validation) => {
  let error = [true, ""];

  if (validation.email) {
    const valid = /\S+@\S+\.\S+/.test(data);
    const message = valid ? "" : "Must be a valid email";
    error = valid ? error : [valid, message];
  }

  if (validation.required) {
    const valid = data.trim() !== "";
    const message = valid ? "" : "This field is required";

    error = valid ? error : [valid, message];
  }

  return error;
};

import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const FullPageLoader = () => (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
    <CircularProgress thickness={6} style={{ color: "#98c5e9" }} />
  </div>
);

export default FullPageLoader;

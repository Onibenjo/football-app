import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default Layout;

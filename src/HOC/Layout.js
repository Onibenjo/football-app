import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

import React from "react";
import { CityLogo } from "../UI/icons";
const Footer = () => {
  let date = new Date().getFullYear();

  return (
    <footer className="bck_blue">
      <div className="footer_logo">
        <CityLogo width="60px" height="60px" link={true} linkTo="/" />
      </div>
      <div className="footer_discl">
        By Onibenjo, Manchester City Copyright {date}. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;

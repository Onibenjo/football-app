import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../Resources/images/logos/manchester_city_logo.png";

export const CityLogo = ({ link, linkTo, width, height }) => {
  const template = (
    <div
      className="img_cover"
      style={{ width, height, background: `url(${Logo}) no-repeat` }}
    />
  );

  return link ? (
    <Link to={linkTo} className="link_logo">
      {template}
    </Link>
  ) : (
    template
  );
};

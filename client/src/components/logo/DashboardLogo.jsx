import React from "react";
import { Link } from "react-router-dom";
import LogoText from "./LogoText";
import logoImage from "../../assets/logo.png";

const DashboardLogo = () => {
  return (
    <Link to="/dashboard" className="flex items-center gap-3">
      <img src={logoImage} className="w-[2rem]" />
      <LogoText />
    </Link>
  );
};

export default DashboardLogo;

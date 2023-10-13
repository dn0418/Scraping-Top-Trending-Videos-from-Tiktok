import React from "react";
import LogoText from "../logo/LogoText";
import { Link } from "react-router-dom";

const AuthHeader = () => {
  return (
    <div className="bg-white font-[inherit] z-50 sticky top-0 w-full shadow ">
      <div className="flex text-sm font-[inherit] max-w-[65rem] py-3 px-6 mx-auto items-center justify-between">
        <LogoText />
        <Link to="/" className="font-[inherit] font-medium text-xs text-[#8314dd]">
          Go back to AI Agent
        </Link>
      </div>
    </div>
  );
};

export default AuthHeader;

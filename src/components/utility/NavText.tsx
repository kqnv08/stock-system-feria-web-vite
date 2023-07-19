import { EnterOutlined } from "@ant-design/icons";
import React from "react";
import "./NavText.css";

type NavTextProps = {
  text: string;
  onClick?: () => void;
};

const NavText: React.FC<NavTextProps> = ({ text, onClick = () => {} }) => {
  return (
    <div onClick={onClick}>
      {text}
      <div role="button" className="navStyle ant-typography-edit" aria-label="Navegar">
        <EnterOutlined />
      </div>
    </div>
  );
};

export default NavText;

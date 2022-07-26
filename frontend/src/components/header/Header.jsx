import React from "react";

import { AppBar, Toolbar, styled } from "@mui/material";
import { Link } from "react-router-dom";

const AppbarComponent = styled(AppBar)`
  background: #d61c4e;
`;

const ToolbarComponent = styled(Toolbar)`
  display: flex;
  justify-content: right;
  & > a {
    padding: 0px 10px 0px 10px;
    text-decoration: none;
    color: white;
    &:hover {
      font-size: 1.2rem;
      color: #293462;
    }
  }
`;

const Header = () => {
  return (
    <AppbarComponent>
      <ToolbarComponent>
        <Link to="/">HOME</Link>
        <Link to="/login">LOGOUT</Link>
      </ToolbarComponent>
    </AppbarComponent>
  );
};

export default Header;

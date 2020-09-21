import React from "react";
import styled from "styled-components";
import logo from "./../../images/logo512.png";

const Menu = styled.header`
  display: flex;
  justify-content: space-evenly;
  color: grey;
  background-color: ;
  height: 100px;
`;

const Logo = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

class Header extends React.Component {
  render() {
    return (
      // links to pages

      <Menu className="menu">
        <div>
          <Logo src={logo} />
        </div>
        <div>
          <h5>Contracts</h5>
        </div>
        <div>
          <h5>Create Contracts</h5>
        </div>
        <div>
          <h5>UserSide</h5>
        </div>
      </Menu>
    );
  }
}

export default Header;

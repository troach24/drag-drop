import React from "react";
import logo from './mh-logo.jpg';
import styled from "styled-components";

const HeaderStyle = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`
function Header () {
  return (
    <HeaderStyle>
      <a rel="stylesheet" href="https://morninghuddle.beehiiv.com/">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
        />
      </a>
    </HeaderStyle>
  )
}

export default Header;

import React from "react";
import styled from "styled-components";
import Header from "./Header";

const ErrorStyle = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`
function ErrorPage () {
  return (
    <ErrorStyle>
      <Header />
      <h1>This isn't where you parked your car...Page does not exist.</h1>
    </ErrorStyle>
  )
}

export default ErrorPage;

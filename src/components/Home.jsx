import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = ({ numCookies }) => {
  return (
    <Wrapper>
      <Title>Cookie game</Title>
      <Counter>You currently have {numCookies} cookies!</Counter>
      <Link to="/game">Go to game</Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  place-content: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 32px;
`;

const Counter = styled.h1`
  font-size: 28px;
  margin-bottom: 32px;
`;

export default Home;

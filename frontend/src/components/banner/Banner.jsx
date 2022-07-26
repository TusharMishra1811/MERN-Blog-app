import React from "react";

import { Box, Typography, styled } from "@mui/material";

const BoxComponent = styled(Box)`
  height: 70vh;
  width: 100vw;
  background: url("https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1806&q=80")
    no-repeat center center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  opacity: 0.9;
`;

const MainHeadingComponent = styled(Typography)(({ theme }) => ({
  fontFamily: "cursive",
  fontWeight: "600",
  color: "black",
  fontSize: "4.5rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "2.5rem",
  },
}));

const SubHeadingComponent = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  fontFamily: "cursive",
  textDecoration: "underline",
  fontWeight: "400",
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
}));

const Banner = () => {
  return (
    <BoxComponent>
      <MainHeadingComponent>BLOG TYRANT</MainHeadingComponent>
      <SubHeadingComponent>Home of fine hypertext products</SubHeadingComponent>
    </BoxComponent>
  );
};

export default Banner;

import React from "react";
import Banner from "../banner/Banner";
import { styled, Box, Typography, Grid } from "@mui/material";
import Posts from "./post/Posts";
import Categories from "./Categories";

const Component = styled(Box)`
  margin-top: 64px;
  overflow-x: hidden;
`;

const Home = () => {
  return (
    <Component>
      <Banner />
      <Grid container>
        <Grid item lg={2} sm={2} xs={12}>
          <Categories />
        </Grid>
        <Grid container item xs={12} sm={10} lg={10}>
          <Posts />
        </Grid>
      </Grid>
    </Component>
  );
};

export default Home;

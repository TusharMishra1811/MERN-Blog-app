import React from "react";

import { Box, Typography, styled } from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { API } from "../../service/api.js";
import { Edit, Delete } from "@mui/icons-material";
import { DataContext } from "../../context/DataProvider";
import Comments from "./comments/Comments";

const Component = styled(Box)(({ theme }) => ({
  marginTop: "64px",
  marginLeft: "100px",
  marginRight: "100px",
  overflowX: "hidden",
  marginBottom: "100px",
  [theme.breakpoints.down("md")]: {
    margin: 10,
  },
}));

const Image = styled("img")({
  width: "100vw",
  height: "70vh",
  objectFit: "cover",
});

const Heading = styled(Typography)`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin: 50px 0px 10px 0px;
  word-break: break-word;
`;

const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const Author = styled(Box)`
  color: #878787;
  display: flex;
  margin: 20px 0;
`;
const Description = styled(Box)`
  word-break: break-word;
`;

const DetailView = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();

  const navigate = useNavigate();
  const { account } = useContext(DataContext);
  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);

  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80";

  const deleteBlog = async () => {
    let response = await API.deletePost(post._id);
    if (response.isSuccess) {
      navigate("/");
    }
  };

  return (
    <Component>
      <Image src={url} />
      <Box style={{ float: "right" }}>
        {account.username === post.username && (
          <>
            <Link to={`/update/${post._id}`}>
              <EditIcon color="primary" />
            </Link>
            <DeleteIcon onClick={() => deleteBlog()} color="error" />
          </>
        )}
      </Box>
      <Heading>{post.title}</Heading>

      <Author>
        <Typography>
          Author:{" "}
          <Box component="span" style={{ fontWeight: 600 }}>
            {post.username}
          </Box>
        </Typography>
        <Typography style={{ marginLeft: "auto" }}>
          {new Date(post.createdDate).toDateString()}
        </Typography>
      </Author>
      <Description> {post.description}</Description>
      <Comments post = {post}/>
    </Component>
  );
};

export default DetailView;

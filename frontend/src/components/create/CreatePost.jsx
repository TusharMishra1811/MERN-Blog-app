import { React, useState, useEffect, useContext } from "react";
import {
  styled,
  Box,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";

import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

const Component = styled(Box)(({ theme }) => ({
  marginTop: "64px",
  marginLeft: "100px",
  marginRight: "100px",
  height: "120vh",
  [theme.breakpoints.down("md")]: {
    margin: 10,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "60vh",
  objectFit: "cover",
});

const FromControlComponent = styled(FormControl)`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;
const InputTextComponent = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 1.5rem;
`;

const TextAreaComponent = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 20px;
  font-size: 20px;
  border: 1px solid rgba(224, 224, 224, 1);
  &:focus-visible {
    outline: none;
  }
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const CreatePost = () => {
  const [post, setPost] = useState(initialPost);

  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);
  const location = useLocation();
  const navigate = useNavigate();

  const URL = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await API.uploadFile(data);
        post.picture = response.data;
      }
    };

    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = account.username;
  }, [file]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const savePost = async () => {
    let response = await API.createPost(post);
    if (response.isSuccess) {
      navigate("/");
    }
  };

  return (
    <Component>
      <Image src={URL} alt="banner" />
      <FromControlComponent>
        <label htmlFor="fileInput">
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputTextComponent
          placeholder="Title"
          onChange={(e) => handleChange(e)}
          name="title"
        />
        <Button variant="contained" onClick={() => savePost()}>
          Publish
        </Button>
      </FromControlComponent>

      <TextAreaComponent
        minRows={5}
        placeholder="Tell Your Story Here....."
        onChange={(e) => handleChange(e)}
        name="description"
      />
    </Component>
  );
};

export default CreatePost;

export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: "Loading...",
    message: "Your data is loading, Please wait....",
  },
  success: {
    title: "Success",
    message: "Data Successfully Loaded",
  },
  responseFailure: {
    title: "Failure",
    message: "An error occured while fetching response from server",
  },
  requestFailure: {
    title: "Failure",
    message: "An error occured while parsing data",
  },
  networkError: {
    title: "Error",
    message: "Unable to connect with the server",
  },
};

export const SERVICE_URLS = {
  userSignup: { url: "/signup", method: "POST" },
  userLogin: { url: "/login", method: "POST" },
  uploadFile: { url: "/file/upload", method: "POST" },
  createPost: { url: "create", method: "POST" },
  getAllPosts: { url: "/posts", method: "GET", params: true },
  getPostById: { url: "post", method: "GET", query: true },
  updatePost: { url: "update", method: "PUT", query: true },
  deletePost: { url: "delete", method: "DELETE", query: true },
  newComment: { url: "/comment/new", method: "POST" },
  getAllComments: { url: "comments", method: "GET", query: true },
  deleteComment: { url: "comment/delete", method: "DELETE", query: true },
};

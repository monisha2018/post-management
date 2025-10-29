import axios from "axios";

// ✅ Remove extra semicolon
const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchPostById = async (id) => {
  // ✅ Use backticks for template literal
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPost = async (post) => {
  const response = await axios.post(API_URL, post);
  return response.data;
};

export const updatePost = async (id, post) => {
  const response = await axios.put(`${API_URL}/${id}`, post); // ✅ backticks
  return response.data;
};

export const deletePost = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`); // ✅ backticks
  return response.data;
};

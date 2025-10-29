import { useNavigate } from "react-router-dom";
import PostForm from "../Components/PostForm"; // ensure folder & file case matches
import { createPost } from "../Utils/Api"; // ensure folder & file case matches

export default function PostCreate() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    if (!data.title || !data.body) {
      alert("Both title and body are required!");
      return;
    }

    try {
      // Create post via API (simulated)
      const newPost = await createPost({ ...data, userId: 1 });
      console.log("Created post:", newPost);

      // Add to localStorage so PostList can fetch it
      const posts = JSON.parse(localStorage.getItem("posts") || "[]");
      posts.unshift(newPost);
      localStorage.setItem("posts", JSON.stringify(posts));

      alert("Post created successfully!");
      navigate("/"); // go back to PostList
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };
  // PostList.js
const [posts, setPosts] = useState([]);

const handleAddPost = (newPost) => {
  setPosts([newPost, ...posts]); // update state so UI shows new post immediately
};


  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Create New Post</h2>
      <PostForm onSubmit={handleSubmit} submitLabel="Create Post" />
    </div>
  );
}
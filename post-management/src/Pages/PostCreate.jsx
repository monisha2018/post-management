import { useNavigate } from "react-router-dom";
import PostForm from "../Components/PostForm";

export default function PostCreate() {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    if (!data.title || !data.body) {
      alert("Both title and body are required!");
      return;
    }

    const newPost = {
      id: Date.now(),
      userId: 1,
      ...data,
    };

    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    posts.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    alert("Post created successfully!");
    navigate("/");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">
        Create New Post
      </h2>

      <PostForm
        initialData={{}}
        onSubmit={handleSubmit}
        submitLabel="Create Post"
      />
    </div>
  );
}
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "../Components/PostForm"; // Ensure the path matches your folder
import { fetchPostById, updatePost } from "../Utils/Api"; // Ensure the path matches

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch post data on mount
  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const data = await fetchPostById(id);
        if (!data) throw new Error("Post not found");
        setPost({ title: data.title, body: data.body, userId: data.userId });
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to fetch post.");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  // Handle form submit
  const handleSubmit = async (formData) => {
    if (!formData.title.trim() || !formData.body.trim()) {
      alert("Title and content cannot be empty!");
      return;
    }

    try {
      const updatedPost = await updatePost(id, {
        title: formData.title,
        body: formData.body,
        userId: post.userId,
      });

      alert("Post updated successfully!");
      navigate("/"); // Redirect to post list after update
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Failed to update post. Please try again.");
    }
  };

  if (loading)
    return <p className="p-4 text-center text-gray-500">Loading post...</p>;
  if (error)
    return <p className="p-4 text-center text-red-500">{error}</p>;

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Edit Post
      </h2>
      <PostForm
        initialData={post}
        onSubmit={handleSubmit}
        submitLabel="Update Post"
      />
    </div>
  );
}
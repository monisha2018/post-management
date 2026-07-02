import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostById } from "../Utils/Api";

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        // First check localStorage
        const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");

        const localPost = savedPosts.find(
          (p) => String(p.id) === String(id)
        );

        if (localPost) {
          setPost(localPost);
          return;
        }

        // If not found locally, fetch from API
        const data = await fetchPostById(id);
        setPost(data);
      } catch (error) {
        console.error("Error loading post:", error);
      }
    };

    loadPost();
  }, [id]);

  if (!post) {
    return (
      <div className="flex justify-center items-center h-64 text-xl font-bold">
        Post not found.
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          {post.title}
        </h1>

        <p className="text-gray-500 mb-4">
          User ID: {post.userId}
        </p>

        <hr className="mb-6" />

        <p className="text-gray-700 leading-8">
          {post.body}
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          ← Back to Home
        </Link>

      </div>
    </div>
  );
}
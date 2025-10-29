import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostById } from "../Utils/Api";

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      const data = await fetchPostById(id);
      setPost(data);
    };
    loadPost();
  }, [id]);

  if (!post)
    return (
      <div className="flex justify-center items-center h-64 text-white font-bold">
        Loading...
      </div>
    );

  return (
    <div className="p-4 flex justify-center">
      <div className="p-6 bg-gradient-to-r from-purple-400 to-blue-300 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300 max-w-xl w-full">
        <h2 className="text-3xl font-extrabold text-white">{post.title}</h2>
        <p className="text-sm text-gray-200 mt-1">By User {post.userId}</p>
        <p className="mt-4 text-white">{post.body}</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-white text-blue-500 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition"
        >
          Back to List
        </Link>
      </div>
    </div>
  );
}

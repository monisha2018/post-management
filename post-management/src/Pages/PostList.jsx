import { useState, useEffect } from "react";
import PostForm from "../Components/PostForm";
import PostCard from "../Components/PostCard";
import Pagination from "../Components/Pagination";
import { fetchPosts } from "../Utils/Api";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // -------------------------
  // Load posts from API or localStorage
  // -------------------------
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
      if (savedPosts.length) {
        setPosts(savedPosts);
        setLoading(false);
        return;
      }

      const data = await fetchPosts();
      const limitedPosts = data.slice(0, 30);
      setPosts(limitedPosts);
      localStorage.setItem("posts", JSON.stringify(limitedPosts));
      setLoading(false);
    };
    loadPosts();
  }, []);

  // -------------------------
  // Create / Update post
  // -------------------------
  const handleSubmit = (data) => {
    if (editingPost) {
      const updatedPosts = posts.map((p) =>
        p.id === editingPost.id ? { ...p, ...data } : p
      );
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      setEditingPost(null);
    } else {
      const newPost = { id: Date.now(), userId: 1, ...data };
      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    }
  };

  // -------------------------
  // Delete post
  // -------------------------
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      const updatedPosts = posts.filter((p) => p.id !== id);
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    }
  };

  // -------------------------
  // Edit post
  // -------------------------
  const handleEdit = (post) => {
    setEditingPost(post);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // -------------------------
  // Search & Pagination
  // -------------------------
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Create / Edit Form + Search */}
      <div className="bg-gradient-to-r from-purple-400 to-blue-300 p-6 rounded-2xl shadow-2xl mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 transform hover:scale-[1.01] transition-transform duration-300">
        <PostForm
          initialData={editingPost || {}}
          onSubmit={handleSubmit}
          submitLabel={editingPost ? "Update Post" : "Create Post"}
        />
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="p-2 rounded-lg border w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Posts List */}
      {loading ? (
        <p className="text-center text-gray-600 mt-6 font-semibold">Loading posts...</p>
      ) : currentPosts.length ? (
        <div className="flex flex-col gap-6">
          {currentPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6 font-semibold">No posts found</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}

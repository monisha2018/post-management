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

  const handleSubmit = (data) => {
    if (editingPost) {
      const updatedPosts = posts.map((post) =>
        post.id === editingPost.id ? { ...post, ...data } : post
      );

      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      setEditingPost(null);
    } else {
      const newPost = {
        id: Date.now(),
        userId: 1,
        ...data,
      };

      const updatedPosts = [newPost, ...posts];

      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      const updatedPosts = posts.filter((post) => post.id !== id);

      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">

      {/* Form Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">

        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          {editingPost ? "Edit Post" : "Create New Post"}
        </h2>

        <PostForm
          initialData={editingPost || {}}
          onSubmit={handleSubmit}
          submitLabel={editingPost ? "Update Post" : "Create Post"}
        />

        {/* Search */}
        <div className="mt-6">
  <input
    type="text"
    placeholder="🔍 Search posts..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setCurrentPage(1);
    }}
    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
  />
</div>

      </div>

      {/* Posts */}

      {loading ? (
        <p className="text-center font-semibold">
          Loading posts...
        </p>
      ) : currentPosts.length ? (
        <div className="space-y-6">
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
        <p className="text-center text-lg font-semibold">
          No posts found.
        </p>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
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
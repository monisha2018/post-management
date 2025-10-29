import { Link } from "react-router-dom";
export default function PostCard({ post, onDelete, onEdit }) {
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p className="text-sm text-gray-500 mb-2">By User {post.userId}</p>
      <p>{post.body?.substring(0, 150)}...</p>
      <div className="flex items-center gap-3 mt-4">
        {/* View Button */}
        <Link className="btn btn-blue" to={`/posts/${post.id}`}>
          View
        </Link>
        {/* Edit Button */}
        <button onClick={() => onEdit(post)} className="btn btn-green">
          Edit
        </button>
        {/* Delete Button */}
        <button onClick={() => onDelete(post.id)} className="btn btn-red">
          Delete
        </button>
      </div>
    </div>
  );
}
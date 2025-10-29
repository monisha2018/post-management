import { Link } from "react-router-dom"; 

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-700 to-blue-700 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold drop-shadow-lg">Post Management</h1>
      <nav className="flex gap-4">
        <Link
          to="/"
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transform hover:-translate-y-1 transition duration-200"
        >
          Home
        </Link>
        <Link
          to="/posts/new"
          className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded-lg shadow-md transform hover:-translate-y-1 transition duration-200"
        >
          Create Post
        </Link>
      </nav>
    </header>
  );
}

import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <header className="bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-5 flex flex-col md:flex-row items-center justify-between">

        {/* Left Side */}
        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
            <span className="text-4xl">📝</span>
          </div>

          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-wide">
              Post Management
            </h1>

            <p className="text-blue-100 mt-1 text-sm">
              Create • Edit • Delete • Manage Posts
            </p>
          </div>

        </div>

        {/* Right Side */}
        <nav className="flex items-center gap-5 mt-6 md:mt-0">

          <Link
            to="/"
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              location.pathname === "/"
                ? "bg-white text-indigo-700 shadow-xl scale-105"
                : "text-white hover:bg-white/20 hover:scale-105"
            }`}
          >
            🏠 Home
          </Link>

          <Link
            to="/posts/new"
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              location.pathname === "/posts/new"
                ? "bg-emerald-500 text-white shadow-xl scale-105"
                : "bg-emerald-500 hover:bg-emerald-600 hover:scale-105 text-white"
            }`}
          >
            ➕ Create Post
          </Link>

        </nav>
      </div>
    </header>
  );
}
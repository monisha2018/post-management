// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "./Pages/PostList";
import PostEdit from "./Pages/PostEdit";
import NotFound from "./Pages/NotFound"; // optional 404 page

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-400 p-4">
        <Routes>
          {/* Main page: list posts and create form */}
          <Route path="/" element={<PostList />} />

          {/* Edit post page */}
          <Route path="/edit/:id" element={<PostEdit />} />

          {/* Optional: 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

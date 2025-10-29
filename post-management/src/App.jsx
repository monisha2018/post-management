// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header"; // Top header
import PostList from "./Pages/PostList";
import PostEdit from "./Pages/PostEdit";
// Optional: Only import if file exists, otherwise comment out
// import NotFound from "./Pages/NotFound"; 

function App() {
  return (
    <Router>
      {/* Full-page container with gradient background */}
      <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-400">
        {/* Top Header */}
        <Header />

        {/* Main Content */}
        <main className="p-4 max-w-5xl mx-auto">
          <Routes>
            {/* Home / Post List */}
            <Route path="/" element={<PostList />} />

            {/* Edit Post */}
            <Route path="/edit/:id" element={<PostEdit />} />

            {/* 404 Not Found (uncomment if NotFound.jsx exists) */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";

import PostList from "./Pages/PostList";
import PostCreate from "./Pages/PostCreate";
import PostEdit from "./Pages/PostEdit";

// Uncomment after creating PostView.jsx
// import PostView from "./Pages/PostView";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-purple-100">

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-8">

          <Routes>

            {/* Home */}
            <Route path="/" element={<PostList />} />

            {/* Create */}
            <Route path="/posts/new" element={<PostCreate />} />

            {/* Edit */}
            <Route path="/edit/:id" element={<PostEdit />} />

            {/* View Post */}
            {/* <Route path="/posts/:id" element={<PostView />} /> */}

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="text-center py-24">
                  <h1 className="text-5xl font-bold text-gray-700">
                    404
                  </h1>

                  <p className="text-gray-500 mt-4 text-lg">
                    Page Not Found
                  </p>
                </div>
              }
            />

          </Routes>

        </main>

      </div>
    </Router>
  );
}

export default App;
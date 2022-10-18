import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Feed/Main";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Compliment from "./pages/Compliment";
import CreatePost from "./pages/CreatePost/CreatePost";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/compliment" element={<Compliment />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

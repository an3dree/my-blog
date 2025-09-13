import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import PostList from './components/PostList';
import AddPost from './components/AddPost';
import Home from './pages/Home';


function App() {
  return (
    <Router basename='/my-blog'>
      <Navigation />
      <div className="App">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/add" element={<AddPost />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;

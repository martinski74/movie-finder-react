import React from "react";
import { Routes, Route } from "react-router-dom";
import { Movies } from "./components/Movies/Movies";

import SelectedMovie from "./components/SelectedMovie/SelectedMovie";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Movies />} />
      <Route path="movie/:id" element={<SelectedMovie />} />
    </Routes>
  );
}

export default App;

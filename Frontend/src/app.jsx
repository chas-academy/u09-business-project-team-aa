import React from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Hello from Vite + React</h1>} />
    </Routes>
  );
}

export default App;
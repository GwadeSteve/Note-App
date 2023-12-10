import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingPage from './pages/LoadingPage';
import LoginPage from './pages/LoginPage';
import NotesList from './pages/NotesList';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notes" element={<NotesList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

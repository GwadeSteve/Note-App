import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingPage from './pages/LoadingPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import NotesList from './pages/NotesList';
import NotePage from './pages/NotePage';
import SearchPage from './pages/SearchPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/notes" element={<NotesList />} />
        <Route path="/notes/:id" element={<NotePage />} />
        <Route path="/notes/search/" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

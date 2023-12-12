import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingPage from './pages/LoadingPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import NotesList from './pages/NotesList';
import NotePage from './pages/NotePage';
import AddButton from './components/AddButton';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/notes" element={<NotesList />} />
        <Route path="/notes/:id" element={<NotePage />} />
      </Routes>
      <AddButton/>
    </BrowserRouter>
  );
};

export default App;

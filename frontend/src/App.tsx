import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import NoteView from './pages/noteview/NoteView';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:id" element={<NoteView/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
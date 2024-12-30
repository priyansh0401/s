// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from './context/ThemeContext';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import Analysis from './pages/Analysis';
import Settings from './pages/Settings';
import Navbar from './components/Navigation/Navbar';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
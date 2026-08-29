/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import LandingPage from '@/src/pages/LandingPage';
import DashboardLayout from '@/src/layouts/DashboardLayout';
import BuilderPage from '@/src/pages/BuilderPage';
import AuthPage from '@/src/pages/AuthPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<div className="p-8"><h1>Dashboard Overview - Start Building</h1></div>} />
            <Route path="builder" element={<BuilderPage />} />
            <Route path="tracker" element={<div className="p-8"><h1>Job Tracker</h1><p className="text-muted-foreground mt-4">Coming soon...</p></div>} />
            <Route path="settings" element={<div className="p-8"><h1>Settings</h1><p className="text-muted-foreground mt-4">Coming soon...</p></div>} />
          </Route>
        </Routes>
      </div>
      <Toaster position="top-right" />
    </Router>
  );
}


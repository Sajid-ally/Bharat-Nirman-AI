import { BrowserRouter, Routes, Route, Navigate }
from "react-router-dom";
import Tracker
from "./pages/Tracker";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AIEngine from "./pages/AIEngine";
import Dashboard from "./pages/Dashboard";
import ReportIssue from "./pages/ReportIssue";
import CommunityFeed from "./pages/CommunityFeed";
import MapPage from "./pages/MapPage";
import Analytics from "./pages/Analytics";

import ProtectedRoute
from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Authentication */}

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Protected */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
    path="/ai"
    element={
        <ProtectedRoute>
            <AIEngine/>
        </ProtectedRoute>
    }
/>
<Route
    path="/tracker"
    element={
        <ProtectedRoute>
            <Tracker/>
        </ProtectedRoute>
    }
/>


        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <ReportIssue />
            </ProtectedRoute>
          }
        />
      
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <CommunityFeed />
            </ProtectedRoute>
          }
        />

        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <MapPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
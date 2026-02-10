import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useContext } from "react";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PasswordRecovery from "./pages/PasswordRecovery";

import { AuthProvider, AuthContext } from "./context/authContext";

/* =====================
   Protected Route
===================== */
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400">
        Loading…
      </div>
    );
  }

 return user ? children : <Navigate to="/" replace />;

};

/* =====================
   Public-only Route
===================== */
const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400">
        Loading…
      </div>
    );
  }

  return user ? <Navigate to="/app" replace /> : children;
};

/* =====================
   Catch-all Redirect
===================== */
const NotFoundRedirect = () => {
  const { user } = useContext(AuthContext);
  return <Navigate to={user ? "/app" : "/"} replace />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ---------- PUBLIC ---------- */}
          <Route
            path="/"
            element={
              <PublicOnlyRoute>
                <Landing />
              </PublicOnlyRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicOnlyRoute>
                <Register />
              </PublicOnlyRoute>
            }
          />

          <Route
            path="/password"
            element={
              <PublicOnlyRoute>
                <PasswordRecovery />
              </PublicOnlyRoute>
            }
          />

          {/* ---------- PROTECTED ---------- */}
          <Route
            path="/app"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/app/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* ---------- UNKNOWN ---------- */}
          <Route path="*" element={<NotFoundRedirect />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

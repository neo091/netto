import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "sonner";

import Functions from "./pages/Functions";
import History from "./pages/History";
import Config from "./pages/Config";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword";
import { useAuth } from "./context/auth/useAuth";
import Loader from "./components/Loader";
import Github from "./components/Github";

function App() {
  const { loading } = useAuth();

  if (loading) return <Loader />;

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Functions" element={<Functions />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/auth/new-password" element={<NewPassword />} />
          <Route
            path="/config"
            element={
              <ProtectedRoute>
                <Config />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <Toaster />
      <Github />
    </>
  );
}

export default App;

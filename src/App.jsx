import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "sonner";

const Functions = lazy(() => import("./pages/Functions"));
const History = lazy(() => import("./pages/History"));
const Config = lazy(() => import("./pages/Config"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const NewPassword = lazy(() => import("./pages/NewPassword"));
const ChangeLogs = lazy(() => import("./pages/ChangeLogs"));
import Loader from "./components/Loader";

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Functions" element={<Functions />} />
            <Route path="/change-logs" element={<ChangeLogs />} />
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
        </Suspense>
      </Router>
      <Toaster />
    </>
  );
}

export default App;

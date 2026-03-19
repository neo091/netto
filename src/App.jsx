import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom"

import ProtectedRoute from "./components/ProtectedRoute"
import { Toaster } from "sonner"

import Functions from "./pages/Functions"
import History from "./pages/History"
import Config from "./pages/Config"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import Login from "./pages/Login"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Functions" element={<Functions />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
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
    </>
  )
}

export default App

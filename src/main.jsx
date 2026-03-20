import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { AuthProvider } from "./context/auth/AuthProvider.jsx"
import { StatusProvider } from "./context/status/StatusProvider.jsx"
import { ConfigProvider } from "./context/config/ConfigProvider.jsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <StatusProvider>
        <ConfigProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ConfigProvider>
      </StatusProvider>
    </AuthProvider>
  </StrictMode>,
)

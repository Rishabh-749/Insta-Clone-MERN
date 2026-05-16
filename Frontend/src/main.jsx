import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from "./features/auth/auth.context";
import { PostContextProvider } from "./features/posts/post.context.jsx";

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <PostContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </PostContextProvider>
  </AuthProvider>
)

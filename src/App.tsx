
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ChatPage from './pages/chat'
import './index.css'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import LandingPage from './pages/landing'

const App = () => {
  return (
    <BrowserRouter >
      <Routes >
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
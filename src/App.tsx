
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ChatPage from './pages/chat'
import './index.css'
import RegisterPage from './pages/register'

const App = () => {
  return (
    <BrowserRouter >
      <Routes >
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chat" element={<ChatPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
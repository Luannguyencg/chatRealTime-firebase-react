
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'

import logo from './logo.svg';
import './App.css';
import Login from './component/login'
import ChatRoom from './component/chatRoom'
import AuthProvider from './context/AuthProvider'
import AppProvider from './context/AppProvider'
import AddRoomModal from './component/Modals/AddRoomModal'
import InviteMemberModal from './component/Modals/InviteMemberModal'
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ChatRoom />} />
          </Routes>
          <AddRoomModal />
          <InviteMemberModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;

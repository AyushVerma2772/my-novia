import React, { useContext } from 'react';
import './styles/App.css';
import './styles/Responsive.css';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';


const App = () => {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };


  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* { <Route path='login' element={currentUser ? <Home /> :<Login />} />} */}
          <Route path='login' element={<Login />} />
          <Route path='/' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
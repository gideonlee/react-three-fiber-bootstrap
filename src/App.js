/** @jsxImportSource @emotion/react */
import './App.css';
import * as React from 'react'
import {Routes, Navigate, Route, BrowserRouter} from 'react-router-dom'
import {DashboardScreen} from './screens/dashboard.js'

function App() {
  return (
    <div 
      className="App"
      css={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}  
    >
      <div>
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
      </div>
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<DashboardScreen/>}/>
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
  )
}

export default App;

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ArtistForm from './components/ArtistForm'
import ArtistList from './components/ArtistList'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ArtistForm />} />
            <Route path="/artists" element={<ArtistList />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

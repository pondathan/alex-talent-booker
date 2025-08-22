import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : ''
  }
  
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-white text-xl font-bold">
            Alex Talent Booker
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 ${isActive('/')}`}
            >
              Add Artist
            </Link>
            <Link
              to="/artists"
              className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 ${isActive('/artists')}`}
            >
              View Artists
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

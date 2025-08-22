import React, { useState, useEffect } from 'react'

const ArtistList = () => {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    fetchArtists()
  }, [])
  
  const fetchArtists = async () => {
    try {
      const response = await fetch('http://localhost:8000/artists/')
      if (!response.ok) {
        throw new Error('Failed to fetch artists')
      }
      const data = await response.json()
      setArtists(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  const exportToCSV = () => {
    if (artists.length === 0) return
    
    const headers = ['Name', 'Spotify ID', 'Genres', 'Created At']
    const csvContent = [
      headers.join(','),
      ...artists.map(artist => [
        `"${artist.name}"`,
        artist.spotify_id,
        `"${artist.genres.join(', ')}"`,
        new Date(artist.created_at).toLocaleDateString()
      ].join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'artists.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading artists...</div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card bg-red-50 border-red-200">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Artists ({artists.length})
        </h1>
        
        {artists.length > 0 && (
          <button
            onClick={exportToCSV}
            className="btn-secondary"
          >
            Export to CSV
          </button>
        )}
      </div>
      
      {artists.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 text-lg">
            No artists found. Add your first artist from the home page!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist) => (
            <div key={artist.id} className="card hover:shadow-lg transition-shadow">
              {artist.image_url && (
                <img
                  src={artist.image_url}
                  alt={artist.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {artist.name}
              </h3>
              
              <p className="text-sm text-gray-600 mb-3 font-mono">
                {artist.spotify_id}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {artist.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              <p className="text-xs text-gray-500">
                Added: {new Date(artist.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ArtistList

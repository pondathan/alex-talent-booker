import React from 'react'

const ArtistPreview = ({ artist, onSave, loading }) => {
  return (
    <div className="card bg-blue-50 border-blue-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Artist Preview
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {artist.image_url && (
          <div className="md:col-span-1">
            <img
              src={artist.image_url}
              alt={artist.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className="md:col-span-2 space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-600">Name</label>
            <p className="text-lg font-semibold text-gray-900">{artist.name}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-600">Spotify ID</label>
            <p className="text-sm text-gray-700 font-mono">{artist.spotify_id}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-600">Genres</label>
            <div className="flex flex-wrap gap-2">
              {artist.genres.map((genre, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
          
          {artist.exists && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-yellow-800 text-sm">
                ⚠️ This artist already exists in the database
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          onClick={onSave}
          disabled={loading || artist.exists}
          className={`btn-primary ${artist.exists ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Saving...' : 'Save Artist'}
        </button>
      </div>
    </div>
  )
}

export default ArtistPreview

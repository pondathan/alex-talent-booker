import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ArtistPreview from './ArtistPreview'

const ArtistForm = () => {
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const onSubmit = async (data) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('http://localhost:8000/artists/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ spotify_url: data.spotify_url }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to preview artist')
      }
      
      const previewData = await response.json()
      setPreview(previewData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  const handleSave = async () => {
    if (!preview) return
    
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/artists/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          spotify_id: preview.spotify_id,
          name: preview.name,
          spotify_url: `https://open.spotify.com/artist/${preview.spotify_id}`,
          image_url: preview.image_url,
          genres: preview.genres,
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to save artist')
      }
      
      // Reset form and show success
      setPreview(null)
      alert('Artist saved successfully!')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Add New Artist
        </h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="form-label">
              Spotify Artist URL
            </label>
            <input
              type="url"
              {...register('spotify_url', { 
                required: 'Spotify URL is required',
                pattern: {
                  value: /^https:\/\/open\.spotify\.com\/artist\/[a-zA-Z0-9]+$/,
                  message: 'Please enter a valid Spotify artist URL'
                }
              })}
              placeholder="https://open.spotify.com/artist/..."
              className="form-input"
            />
            {errors.spotify_url && (
              <p className="text-red-600 text-sm mt-1">
                {errors.spotify_url.message}
              </p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Preview Artist'}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        
        {preview && (
          <div className="mt-6">
            <ArtistPreview 
              artist={preview} 
              onSave={handleSave}
              loading={loading}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ArtistForm

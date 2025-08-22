from fastapi import APIRouter, HTTPException, Depends
from typing import List
from ..models.artist import ArtistCreate, ArtistResponse, ArtistPreview
from ..services.spotify import SpotifyService
from ..database import get_supabase
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/artists", tags=["artists"])


@router.post("/preview", response_model=ArtistPreview)
async def preview_artist(spotify_url: str):
    """
    Preview artist profile from Spotify URL
    """
    try:
        # Validate Spotify URL
        if not SpotifyService.validate_spotify_url(spotify_url):
            raise HTTPException(
                status_code=400, 
                detail="Invalid Spotify artist URL"
            )
        
        # Extract artist ID
        spotify_id = SpotifyService.parse_spotify_url(spotify_url)
        if not spotify_id:
            raise HTTPException(
                status_code=400, 
                detail="Could not extract artist ID from URL"
            )
        
        # Check if artist already exists
        supabase = get_supabase()
        existing_artist = supabase.table("artists").select("*").eq("spotify_id", spotify_id).execute()
        
        # Get artist profile from Spotify
        artist_profile = await SpotifyService.get_artist_profile(spotify_id)
        if not artist_profile:
            raise HTTPException(
                status_code=404, 
                detail="Could not fetch artist profile from Spotify"
            )
        
        # Mark if artist already exists
        artist_profile.exists = len(existing_artist.data) > 0
        
        return artist_profile
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error previewing artist: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/", response_model=ArtistResponse)
async def create_artist(artist: ArtistCreate):
    """
    Create new artist profile
    """
    try:
        supabase = get_supabase()
        
        # Check if artist already exists
        existing = supabase.table("artists").select("*").eq("spotify_id", artist.spotify_id).execute()
        if existing.data:
            raise HTTPException(
                status_code=409, 
                detail="Artist already exists"
            )
        
        # Insert new artist
        result = supabase.table("artists").insert(artist.dict()).execute()
        
        if not result.data:
            raise HTTPException(status_code=500, detail="Failed to create artist")
        
        created_artist = result.data[0]
        return ArtistResponse(**created_artist)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating artist: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/", response_model=List[ArtistResponse])
async def list_artists(skip: int = 0, limit: int = 100):
    """
    List all artists with pagination
    """
    try:
        supabase = get_supabase()
        result = supabase.table("artists").select("*").range(skip, skip + limit - 1).execute()
        
        return [ArtistResponse(**artist) for artist in result.data]
        
    except Exception as e:
        logger.error(f"Error listing artists: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/{artist_id}", response_model=ArtistResponse)
async def get_artist(artist_id: str):
    """
    Get artist by ID
    """
    try:
        supabase = get_supabase()
        result = supabase.table("artists").select("*").eq("id", artist_id).execute()
        
        if not result.data:
            raise HTTPException(status_code=404, detail="Artist not found")
        
        return ArtistResponse(**result.data[0])
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting artist: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

import re
from typing import Optional, Dict, Any
from ..models.artist import ArtistPreview
import logging

logger = logging.getLogger(__name__)


class SpotifyService:
    """Service for Spotify integration"""
    
    @staticmethod
    def parse_spotify_url(url: str) -> Optional[str]:
        """
        Parse Spotify artist URL to extract artist ID
        
        Supports formats:
        - https://open.spotify.com/artist/1234567890abcdef
        - spotify:artist:1234567890abcdef
        """
        try:
            # Pattern for Spotify artist URLs
            patterns = [
                r'https://open\.spotify\.com/artist/([a-zA-Z0-9]+)',
                r'spotify:artist:([a-zA-Z0-9]+)'
            ]
            
            for pattern in patterns:
                match = re.search(pattern, url)
                if match:
                    return match.group(1)
            
            return None
            
        except Exception as e:
            logger.error(f"Error parsing Spotify URL: {e}")
            return None
    
    @staticmethod
    async def get_artist_profile(spotify_id: str) -> Optional[ArtistPreview]:
        """
        Get artist profile from Spotify (stub implementation)
        
        In production, this would call the Spotify Web API
        """
        try:
            # Stub data - replace with actual Spotify API call
            mock_artist_data = {
                "spotify_id": spotify_id,
                "name": f"Artist {spotify_id[:8]}",
                "image_url": "https://via.placeholder.com/300x300?text=Artist",
                "genres": ["Pop", "Rock", "Electronic"],
                "exists": False
            }
            
            return ArtistPreview(**mock_artist_data)
            
        except Exception as e:
            logger.error(f"Error fetching artist profile: {e}")
            return None
    
    @staticmethod
    def validate_spotify_url(url: str) -> bool:
        """Validate if URL is a valid Spotify artist URL"""
        artist_id = SpotifyService.parse_spotify_url(url)
        return artist_id is not None

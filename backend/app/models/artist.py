from sqlmodel import SQLModel, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID, uuid4


class ArtistBase(SQLModel):
    """Base Artist model"""
    spotify_id: str = Field(unique=True, index=True)
    name: str = Field(max_length=255)
    spotify_url: str = Field(max_length=500)
    image_url: Optional[str] = Field(max_length=500, default=None)
    genres: Optional[List[str]] = Field(default=[])


class Artist(ArtistBase, table=True):
    """Artist database model"""
    __tablename__ = "artists"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class ArtistCreate(ArtistBase):
    """Artist creation model"""
    pass


class ArtistUpdate(SQLModel):
    """Artist update model"""
    name: Optional[str] = None
    spotify_url: Optional[str] = None
    image_url: Optional[str] = None
    genres: Optional[List[str]] = None


class ArtistResponse(ArtistBase):
    """Artist response model"""
    id: UUID
    created_at: datetime
    updated_at: datetime


class ArtistPreview(SQLModel):
    """Artist preview for frontend"""
    spotify_id: str
    name: str
    image_url: Optional[str] = None
    genres: List[str] = []
    exists: bool = False

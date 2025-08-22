from supabase import create_client, Client
from .config import settings
import logging

logger = logging.getLogger(__name__)

# Global Supabase client
supabase: Client = None


async def init_db():
    """Initialize database connection"""
    global supabase
    
    try:
        if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
            logger.warning("Supabase credentials not configured. Using mock client.")
            # For development, we can create a mock client
            supabase = create_client("https://mock.supabase.co", "mock-key")
        else:
            supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
            logger.info("Supabase client initialized successfully")
            
    except Exception as e:
        logger.error(f"Failed to initialize Supabase client: {e}")
        raise


def get_supabase() -> Client:
    """Get Supabase client instance"""
    if supabase is None:
        raise RuntimeError("Database not initialized. Call init_db() first.")
    return supabase


async def test_connection():
    """Test database connection"""
    try:
        client = get_supabase()
        # Simple query to test connection
        response = client.table("artists").select("id").limit(1).execute()
        logger.info("Database connection test successful")
        return True
    except Exception as e:
        logger.error(f"Database connection test failed: {e}")
        return False

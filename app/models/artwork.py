from ..database import Base
from . import Boolean, Column, ForeignKey, Integer, String, relationship
from sqlalchemy.sql.sqltypes import DATETIME
import artist
class Artwork(Base):
    __tablename__ = "artwork"

    id = Column(Integer, primary_key=True ,autoincrement=True)
    artist_id = Column(Integer, nullable=True, ForeignKey(artist.Artist.id))
    title = Column(String)
    created_at = Column(DATETIME,nullable= True)
    img_url = Column(String(256), nullable= True)

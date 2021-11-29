from . import Base,db
from . import Boolean, Column, ForeignKey, Integer, String, relationship
from sqlalchemy.sql.sqltypes import DATETIME

class Artwork(Base):
    __tablename__ = "artwork"

    id = Column(Integer, primary_key=True)
    artist_id = Column(Integer, nullable=True, ForeignKey("artist.id"))
    title = Column(String)
    created_at = Column(DATETIME,nullable= True)
    img_url = Column(String(256), nullable= True)

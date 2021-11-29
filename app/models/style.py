from . import Base,db
from. import Boolean, Column, ForeignKey, Integer, String, relationship,Float
from sqlalchemy.sql.sqltypes import DATETIME
class Style(Base):
    __tablename__ = "style"

    id = Column(Integer, primary_key=True)
    painting_id = Column(Integer, nullable=True, ForeignKey("painting.id"))
    artist_id1 = Column(Integer,nullable=True, ForeignKey("artist.id") ) 
    artist_id2 = Column(Integer,nullable=True, ForeignKey("artist.id")) 
    artist_id3 = Column(Integer,nullable=True, ForeignKey("artist.id")) 
    artist_id4 = Column(Integer,nullable=True, ForeignKey("artist.id")) 
    artist_id5 = Column(Integer,nullable=True, ForeignKey("artist.id")) 
    score1 = Column(Float,nullable=True)
    score2 = Column(Float,nullable=True)
    score3 = Column(Float,nullable=True)
    score4 = Column(Float,nullable=True)
    score5 = Column(Float,nullable=True)
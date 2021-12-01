from ..database import Base
from . import Boolean, Column, ForeignKey, Integer, String, relationship
from sqlalchemy.sql.sqltypes import DATETIME, Float


class Style(Base):
    __tablename__ = "style"
    id = Column(Integer, primary_key=True,nullable=False)
    painting_id = Column(Integer, nullable=False)
    artist_id1 = Column(Integer, nullable=False)
    score1 = Column(Float,nullable=False)

    def __init__(self,painting_id,artist_id,score1):
        self.painting_id = painting_id
        self.artist_id = artist_id
        self.score = score1
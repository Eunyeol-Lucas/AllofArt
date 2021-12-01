from ..database import Base
from . import Boolean, Column, ForeignKey, Integer, String, relationship
from sqlalchemy.sql.sqltypes import DATETIME, Float


class AnalyzePainting(Base):
    __tablename__ = "analyze_painting"

    painting_id = Column(Integer, primary_key=True,nullable=False)
    artist_id1 = Column(Integer, primary_key=True,nullable=False)
    score1 = Column(Float,nullable=False)

    def __init__(self,painting_id,artist_id1,score1):
        self.painting_id = painting_id
        self.artist_id1 = artist_id1
        self.score1 = score1
from app.database import Base
from app.models import Boolean, Column, ForeignKey, Integer, String, relationship
from sqlalchemy.sql.sqltypes import Float


class Style(Base):
    __tablename__ = "style"
    id = Column(Integer, primary_key=True,nullable=False,autoincrement=True)
    painting_id = Column(Integer, nullable=False)
    artist_id0 = Column(Integer, nullable=False)
    score0 = Column(Float,nullable=False)
    artist_id1 = Column(Integer, nullable=False)
    score1 = Column(Float,nullable=False)
    artist_id2 = Column(Integer, nullable=False)
    score2 = Column(Float,nullable=False)
    artist_id3 = Column(Integer, nullable=False)
    score3 = Column(Float,nullable=False)
    artist_id4 = Column(Integer, nullable=False)
    score4 = Column(Float,nullable=False)

    def __init__(
        self,painting_id,
        artist_id0,score0,
        artist_id1,score1,
        artist_id2,score2,
        artist_id3,score3,
        artist_id4,score4):

        self.painting_id = painting_id
        self.artist_id0 = artist_id0
        self.score0 = score0
        self.artist_id1 = artist_id1
        self.score1 = score1
        self.artist_id2 = artist_id2
        self.score2 = score2
        self.artist_id3 = artist_id3
        self.score3 = score3
        self.artist_id4 = artist_id4
        self.score4 = score4

from typing import Mapping
from sqlalchemy.sql.expression import null

from app.models.artist import Artist
from app.models.painting import Painting
from ..database import Base
from . import Boolean, Column, ForeignKey, Integer, String, relationship
from sqlalchemy.sql.sqltypes import DATETIME, Float

class TransferPainting(Base):
    __tablename__ = "transfer_painting"

    id = Column(Integer,primary_key=True,nullable=False,autoincrement=True)
    painting_id = Column(Integer,nullable=False,ForeignKey(Painting.id))
    artist_id = Column(Integer, nullable=False,ForeignKey(Artist.id))

    
from typing import Mapping
from sqlalchemy.sql.expression import null

from app.models.artist import Artist
from app.models.painting import Painting
from ..database import Base
from . import Boolean, Column, ForeignKey, Integer, String, relationship
from sqlalchemy.sql.sqltypes import DATETIME, Float
import .painting 
class TransferPainting(Base):
    __tablename__ = "transfer_painting"

    id = Column(Integer,primary_key=True,nullable=False,autoincrement=True)
    style = Column(Integer, nullable=False, ForeignKey(painting.id))
    content = Column(Integer, nullable=False, ForeignKey(painting.id))
    result = Column(Integer, nullable=False, ForeignKey(painting.id))

    def __init__(self, style, content,result):
        self.style= style
        self.conten = content
        self.result = result

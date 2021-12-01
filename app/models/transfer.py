from typing import Mapping
from sqlalchemy.sql.expression import null

from app.models.artist import Artist
from app.models.painting import Painting
from ..database import Base
from . import Boolean, Column, ForeignKey, Integer, String, relationship
from sqlalchemy.sql.sqltypes import DATETIME, Float
from .painting import Painting

class Transfer(Base):
    __tablename__ = "transfer"

    id = Column(Integer,primary_key=True,nullable=False,autoincrement=True)
    style = Column(String(255), nullable=False)
    content = Column(String(255), nullable=False)
    result = Column(String(255), nullable=False)

    def __init__(self, style, content,result):
        self.style= style
        self.conten = content
        self.result = result

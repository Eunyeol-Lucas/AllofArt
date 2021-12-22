from typing import Mapping

from sqlalchemy.sql.expression import null
from sqlalchemy.sql.sqltypes import DATETIME, Float

from app.models.artist import Artist
from app.models.painting import Painting

from app.database import Base
from app.models import Boolean, Column, ForeignKey, Integer, String, relationship


class Transfer(Base):
    __tablename__ = "transfer"

    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    style_id = Column(String(255), nullable=False)
    content_id = Column(String(255), nullable=False)
    result_id = Column(String(255), nullable=False)

    def __init__(self, style_id, content_id, result_id):
        self.style_id = style_id
        self.content_id = content_id
        self.result_id = result_id

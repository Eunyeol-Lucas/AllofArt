from enum import auto

from sqlalchemy.sql.sqltypes import DATETIME

from ..database import Base
from . import Boolean, Column, ForeignKey, Integer, String, relationship


class Painting(Base):
    __tablename__ = "painting"

    id = Column(Integer, primary_key=True, autoincrement=True)
    img_url = Column(String(512), nullable=False)
    painting_type = Column(Integer, nullable=False)
    download = Column(Integer, nullable=False)


def __init__(self, img_url, painting_type, download):
    self.img_url = img_url
    self.painting_type = painting_type
    self.download = download

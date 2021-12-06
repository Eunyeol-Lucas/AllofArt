from re import S

from sqlalchemy.sql.sqltypes import DATETIME

from ..database import Base
from . import Boolean, Column, ForeignKey, Integer, String, relationship


class Artist(Base):
    __tablename__ = "artist"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(245), nullable=False, unique=True)
    genre = Column(String(256), nullable=False, unique=True)
    year = Column(String(256), nullable=False, unique=True)
    nation = Column(String(256), nullable=False, unique=True)
    desc_simple = Column(String(256), nullable=False, unique=True)
    desc_detail = Column(String(512), nullable=False, unique=True)

    def __init__(self, name, genre, year, nation, desc_simple, desc_detail):
        self.name = name
        self.genre = genre
        self.year = year
        self.nation = nation
        self.desc_simple = desc_simple
        self.desc_detail = desc_detail

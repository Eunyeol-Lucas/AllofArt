from re import S
from ..database import Base
from. import Boolean, Column, ForeignKey, Integer, String, relationship
from sqlalchemy.sql.sqltypes import DATETIME



class Artist(Base):
    __tablename__ = "artist"

    id = Column(Integer, primary_key=True,autoincrement=True)
    name = Column(String(245), nullable=False, unique=True)
    genre = Column(String(256), nullable=False, unique=True)
    year = Column(String(256), nullable=False, unique=True)
    nation = Column(String(256), nullable=False, unique=True)
    description = Column(String(256), nullable=False, unique=True)
    
    def __init__(self, name, genre, year, nation, description):
        self.name = name
        self.genre = genre
        self.year = year
        self.nation = nation
        self.description = description

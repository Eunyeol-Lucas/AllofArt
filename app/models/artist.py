from . import Base,db
from. import Boolean, Column, ForeignKey, Integer, String, relationship
from sqlalchemy.sql.sqltypes import DATETIME



class Artist(Base):
    __tablename__ = "artist"

    id = Column(Integer, primary_key=True)
    title = Column(String(256), nullable=False, unique=True)
    created_at = Column(DATETIME)

    children = relationship("Artwork", back_populates="parent")
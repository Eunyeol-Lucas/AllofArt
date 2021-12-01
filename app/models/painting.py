from enum import auto
from ..database import Base
from. import Boolean, Column, ForeignKey, Integer, String, relationship
from sqlalchemy.sql.sqltypes import DATETIME
class Painting(Base):
    __tablename__ = "painting"

id = Column(Integer, primary_key=True,autoincrement=True)
img_url = Column(String(256),nullable=False)
painting_type = Column(Integer, nullable=False)
created_at = Column(DATETIME, nullable= False)

def __init__(self, image_name, img_url,created_at):
    self.image_name = image_name
    self.img_url = img_url
    self.created_at = created_at
from enum import auto
from ..database import Base
from. import Boolean, Column, ForeignKey, Integer, String, relationship
from sqlalchemy.sql.sqltypes import DATETIME
class Painting(Base):
    __tablename__ = "painting"

id = Column(Integer, primary_key=True,autoincrement=True)
img_url = Column(String(256),nullable=False)
painting_type = Column(Integer, nullable=False)
down_cnt = Column(Integer, nullable= False)

def __init__(self, img_url,painting_type, down_cnt):
    self.img_url = img_url
    self.painting_type = painting_type
    self.down_cnt = down_cnt
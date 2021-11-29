from . import Base,db
from. import Boolean, Column, ForeignKey, Integer, String, relationship
from sqlalchemy.sql.sqltypes import DATETIME
class Painting(Base):
    __tablename__ = "painting"

id = Column(Integer, primary_key=True)
user_id = Column(Integer, nullable=False, unique=True)
artist_id = Column(Integer, nullable=False, unique=True)
group_id = Column(Integer, nullable=False, unique=True)
img_url = Column(String(256),nullable=False)
like = Column(Integer, default=0)
created_at = Column(DATETIME, nullable= False)

def __init__(self, id, user_id, artist_id, group_id,img_url,like,created_at):
    self.id = id
    self.user_id = user_id
    self.artist_id = artist_id
    self.group_id = group_id
    self.img_url = img_url
    self.like = like
    self.created_at = created_at
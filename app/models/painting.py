from app.database import Base
from . import Boolean, Column, Integer, String


class Painting(Base):
    __tablename__ = "painting"

    id = Column(Integer, primary_key=True, autoincrement=True)
    img_url = Column(String(512), nullable=False)
    painting_type = Column(Integer, nullable=False)
    download_cnt = Column(Integer, nullable=False, default = 0)
    saved = Column(Boolean, default=False)


def __init__(self, img_url, painting_type, download_cnt, saved):
    self.img_url = img_url
    self.painting_type = painting_type
    self.download_cnt = download_cnt
    self.saved = saved

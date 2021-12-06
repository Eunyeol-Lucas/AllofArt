from ..database import Base
from . import Boolean, Column, Integer, String


class Painting(Base):
    __tablename__ = "painting"

    id = Column(Integer, primary_key=True, autoincrement=True)
    img_url = Column(String(512), nullable=False)
    painting_type = Column(Integer, nullable=False)
    download = Column(Integer, nullable=False)
    saved = Column(Boolean, default=False)


def __init__(self, img_url, painting_type, download, saved):
    self.img_url = img_url
    self.painting_type = painting_type
    self.download = download
    self.saved = saved

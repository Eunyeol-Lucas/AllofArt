from ..database import Base
from . import Boolean, Column, DateTime, Integer, String


class Download(Base):
    __tablename__ = "download"

    id = Column(Integer, primary_key=True, autoincrement=True)
    painting_id = Column(Integer, nullable=False)
    downloaded_at = Column(DateTime, nullable=False)


def __init__(self, painting_id, downloaded_at):
    self.painting_id = painting_id
    self.downloaded_at = downloaded_at

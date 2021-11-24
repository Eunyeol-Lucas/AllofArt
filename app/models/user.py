#from sqlalchemy.orm import relationship

from app.database import Base

from . import Column, Integer, String  # , Boolean, ForeignKey


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    email = Column(String(256), nullable=False, unique=True)
    pw = Column(String(256), nullable=False, unique=True)
    nickname = Column(String(256), nullable=False, unique=True)

    def __init__(self, id, email, pw, nickname):
        self.id = id
        self.email = email
        self.pw = pw
        self.nickname = nickname

    def to_dict(self):
        return {x.name: getattr(self, x.name) for x in self.__table__.columns}

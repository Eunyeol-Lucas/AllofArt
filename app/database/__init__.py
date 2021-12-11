from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from ..config import SQLALCHEMY_DATABASE_URL

# 다른 곳에서 쓰일 엔진
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# sessionlocal 자체로는 아직 세션이 아님, 인스터스 생성해야 세션
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

db = SessionLocal()

# ORM모델을 만들기 위해
Base = declarative_base()

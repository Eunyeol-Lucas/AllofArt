from pydantic import BaseModel


class ArtistCreate(BaseModel):
    id: int = 1
    name: str = "Henri Matisse"
    genre: str = "expression"
    year: str = "1860-1924"
    nation: str = "France"
    description: str = "이 화가는 어쩌고 저쩌고"


class Artist(ArtistCreate):
    class Config:
        orm_mode = True

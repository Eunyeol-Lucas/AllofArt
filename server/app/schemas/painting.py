from pydantic import AnyUrl, BaseModel


class PaintingBase(BaseModel):
    type: int = 53


class PaintingCreate(PaintingBase):
    id: int = 3
    img_url: AnyUrl = "/static/images/1.jpg"
    download_cnt: int = 0


class Painting(PaintingCreate):
    class Config:
        orm_mode = True

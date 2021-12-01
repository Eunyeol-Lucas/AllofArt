from pydantic import AnyUrl, BaseModel


class StyleBase(BaseModel):
    painting_id: int = 3


class StyleCreate(StyleBase):
    id: int


class Style(StyleCreate):

    artist_id_1: int
    score_1: float
    artist_id_2: int
    score_2: float
    artist_id_3: int
    score_3: float
    artist_id_4: int
    score_4: float
    artist_id_5: int
    score_5: float

    class Config:
        orm_mode = True


class StylePostRequest(BaseModel):
    file: bytes


class StylePostResponse(StyleBase):
    style_result: Dict = {
        "Andy Warhol": 94.77,
        "Rene Magritte": 5.16,
        "Henri Matisse": 0.07,
        "Albrecht Du rer": 0.0,
        "Alfred Sisley": 0.0,
    }
    image_url: AnyUrl = "/static/images/1.jpg"

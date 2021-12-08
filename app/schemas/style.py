from pydantic import BaseModel


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


class StylePostResponse(BaseModel):

    painting_id: int = 3
    style_result: dict = {
        "AndyWarhol": 95.56,
        "FranciscoGoya": 2.35,
        "ReneMagritte": 1.93,
        "VasiliyKandinskiy": 0.14,
        "SalvadorDali": 0.01,
    }
    image_url: str = "/static/images/1.jpg"
    artist_bio: str = "앤드루 워홀라 주니어(영어: Andrew Warhola Jr., 1928년 8월 6일 ~ 1987년 2월 22일)는 앤디 워홀(영어: Andy Warhol )이라는 예명으로 활동했던 미국의 미술가이자, 출력물 제작자, 그리고 영화 제작자다. 시각주의 예술 운동의 선구자로, 팝 아트로 잘 알려진 인물이다. 산업 일러스트로 성공적인 경력을 쌓은 후에 화가, 아방가르드 영화, 레코드 프로듀서, 작가로서 세계적으로 유명해졌다."
    artist_images: list = [
        "/static/images/artist/Andy_Warhol_137.jpg",
        "/static/images/artist/Andy_Warhol_95.jpg",
        "/static/images/artist/Andy_Warhol_68.jpg",
    ]
    artist_name: str = "Andy Warhol"
    artist_id: int = 5

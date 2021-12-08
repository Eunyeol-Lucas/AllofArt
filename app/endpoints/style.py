import os
from random import sample

from fastapi import APIRouter, File, HTTPException, UploadFile
from fastapi.responses import RedirectResponse

from app.ai.style_cls.main import classify_style
from app.ai.utils import read_imagefile
from app.database import SessionLocal
from app.models import artist as artist_model
from app.models import painting as painting_model
from app.models import style as style_model
from app.schemas import style as style_schema

router = APIRouter()


def get_artist_id(db, artist_name):
    artist = (
        db.query(artist_model.Artist)
        .filter(artist_model.Artist.name == artist_name.replace(" ", "_"))
        .first()
    )
    if not artist:
        raise HTTPException(
            status_code=404, detail="'화풍 분석에서 db에 화가 이름이 잘못 들어가고 있습니다' 라고 말씀해주세요"
        )
    return artist.id


def get_artist_name(db, artist_id):
    artist = (
        db.query(artist_model.Artist)
        .filter(artist_model.Artist.id == artist_id)
        .one_or_none()
    )
    if not artist:
        raise HTTPException(
            status_code=404, detail="'화풍 분석에서 db에 화가 id가 잘못 들어가고 있습니다' 라고 말씀해주세요"
        )
    return artist.name


@router.get(
    "/{painting_id}", summary="공유하기 기능", response_model=style_schema.StylePostResponse
)
async def trs_test(painting_id: int = None):
    """
    id 받으면 id에 해당하는 그림 url,
    그림 id로 style에서 꺼내서 합쳐서 리턴
    """

    with SessionLocal() as db:
        query_result_image = (
            db.query(painting_model.Painting)
            .filter(painting_model.Painting.id == painting_id)
            .one_or_none()
        )
        query_result_style = (
            db.query(style_model.Style)
            .filter(style_model.Style.painting_id == painting_id)
            .one_or_none()
        )

        if (not query_result_image) or (not query_result_style):
            raise HTTPException(status_code=404, detail="요청하신 그림이 존재하지 않습니다!")

        query_result_artist = (
            db.query(artist_model.Artist)
            .filter(artist_model.Artist.id == query_result_style.artist_id0)
            .one_or_none()
        )

        artist_images = (
            db.query(painting_model.Painting).filter(
                painting_model.Painting.painting_type == query_result_artist.id
            )
        ).all()

        artist_images = [p.img_url for p in sample(artist_images, 3)]

        result = {
            "image_url": query_result_image.img_url,
            "painting_id": painting_id,
            "style_result": {
                get_artist_name(db, query_result_style.artist_id0).replace(
                    "_", " "
                ): query_result_style.score0,
                get_artist_name(db, query_result_style.artist_id1).replace(
                    "_", " "
                ): query_result_style.score1,
                get_artist_name(db, query_result_style.artist_id2).replace(
                    "_", " "
                ): query_result_style.score2,
                get_artist_name(db, query_result_style.artist_id3).replace(
                    "_", " "
                ): query_result_style.score3,
                get_artist_name(db, query_result_style.artist_id4).replace(
                    "_", " "
                ): query_result_style.score4,
            },
            # name으로 다 바꾸고
            "artist_bio": query_result_artist.desc_simple,
            "artist_images": artist_images,
            "artist_name": query_result_artist.name.replace("_", " "),
            "artist_id": query_result_style.artist_id0,
        }

    return result


@router.post(
    "/",
    response_class=RedirectResponse,
    summary="Post image and get result",
)
async def classify_uploaded_painting(
    file: UploadFile = File(...),
):  # key == file
    """
    form-data에서 file를 key로 이미지파일을 POST하면,
    저장된 이미지의 id, url, 분석결과를 return합니다.

    - **file**: 이미지 파일
    """

    extension = file.filename.split(".")[-1].lower()
    if extension not in ("jpg", "jpeg", "png"):
        return "Image must be jpg or png format!"

    uploaded_Image = read_imagefile(await file.read())
    style_result = classify_style(uploaded_Image, extension=extension)

    BASE_URL = os.path.join(os.getcwd(), "app", "static", "images")
    USER_IMAGE_DIR = os.path.join(BASE_URL, "user")

    with SessionLocal() as db:
        # painting 에 저장
        num_of_paintings = db.query(painting_model.Painting).count()
        num_of_paintings += 1
        image_file_path = os.path.join(USER_IMAGE_DIR, f"{num_of_paintings}.jpg")

        image_want_to_save = painting_model.Painting(
            img_url=image_file_path.replace("/code/app", ""),
            painting_type=200,
            download=0,
            saved=False,
        )
        db.add(image_want_to_save)
        db.commit()
        image_id = image_want_to_save.id

    uploaded_Image = uploaded_Image.convert("RGB")
    uploaded_Image.save(image_file_path)

    # 소수점 제거
    style_result = {k: round(v, 2) for k, v in style_result.items()}

    # top 5만 추출
    top_5 = sorted(style_result.items(), key=lambda x: -x[1])[:5]

    # top_5 변수를 style db에 저장

    with SessionLocal() as db:
        new_style = style_model.Style(
            painting_id=image_id,
            artist_id0=get_artist_id(db, top_5[0][0]),
            score0=top_5[0][1],
            artist_id1=get_artist_id(db, top_5[1][0]),
            score1=top_5[1][1],
            artist_id2=get_artist_id(db, top_5[2][0]),
            score2=top_5[2][1],
            artist_id3=get_artist_id(db, top_5[3][0]),
            score3=top_5[3][1],
            artist_id4=get_artist_id(db, top_5[4][0]),
            score4=top_5[4][1],
        )
        db.add(new_style)
        db.commit()
        return RedirectResponse(f"/api/style/{image_id}", status_code=302)

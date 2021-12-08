from fastapi import APIRouter, File, HTTPException, UploadFile

from app.ai.style_cls.main import classify_style
from app.ai.utils import read_imagefile
from app import schemas, models

router = APIRouter()

def get_artist_id(db, artist_name):
    artist = db.query(models.artist.Artist).filter(
            models.artist.Artist.name == artist_name.replace(' ','_')
        ).first()
    if not query_result:
        raise HTTPException(status_code=404, detail="'화풍 분석에서 db에 화가 이름이 잘못 들어가고 있습니다' 라고 말씀해주세요")
    return artist.id

def get_artist_name(db, artist_id):
    artist = db.query(models.artist.Artist).filter(
            models.artist.Artist.id == artist_id).one_or_none()
    if not query_result:
        raise HTTPException(status_code=404, detail="'화풍 분석에서 db에 화가 id가 잘못 들어가고 있습니다' 라고 말씀해주세요")
    return artist.id

@router.get("/{painting_id}", summary="공유하기 기능")
async def trs_test(painting_id: int = None):
    '''
    id 받으면 id에 해당하는 그림 url,
    그림 id로 style에서 꺼내서 합쳐서 리턴
    '''

    with SessionLocal() as db:
        query_result_image = db.query(models.painting.Painting).filter(models.painting.Painting.id == painting_id).one_or_none()
        query_result_style = db.query(models.style.Style).filter(models.style.Style.painting_id == painting_id).one_or_none()

        if (not query_result_image) or (not query_result_style):
            raise HTTPException(status_code=404, detail="요청하신 그림이 존재하지 않습니다!")

        result = 
            "image_url" : query_result_image.img_url,
            "artist_id_0" : query_result_style.artist_id0 ,
            "score_0" : query_result_style.score0 ,
            "artist_id_1" : query_result_style.artist_id1 ,
            "score_1" : query_result_style.score1 ,
            "artist_id_2" : query_result_style.artist_id2 ,
            "score_2" : query_result_style.score2 ,
            "artist_id_3" : query_result_style.artist_id3 ,
            "score_3" : query_result_style.score3 ,
            "artist_id_4" : query_result_style.artist_id4 ,
            "score_4" : query_result_style.score4 ,
        )

    return result


@router.post(
    "/", response_model=schemas.style.StylePostResponse, summary="Post image and get result"
)
async def classify_uploaded_painting(
    file: UploadFile = File(...),
):  # key == file
    """
    form-data에서 file를 key로 이미지파일을 POST하면,
    저장된 이미지의 id, 분석결과, 저장된 이미지 url을 return합니다.

    - **file**: 이미지 파일
    """

    extension = file.filename.split(".")[-1].lower()
    if extension not in ("jpg", "jpeg", "png"):
        return "Image must be jpg or png format!"

    image = read_imagefile(await file.read())
    style_result = classify_style(image, extension=extension)

    BASE_URL = os.path.join(os.getcwd(), "app", "static", "images")
    USER_IMAGE_DIR = os.path.join(BASE_URL, "user")

    with SessionLocal() as db:
        # painting 에 저장
        num_of_paintings = db.query(painting.Painting).count()
        num_of_paintings += 1
        image_file_path = os.path.join(USER_IMAGE_DIR, f"{num_of_paintings}.jpg")

        image_want_to_save = models.painting.Painting(
            img_url = image_file_path,
            painting_type = 200,
            download = 0,
            saved = False
        )
        db.add(image_want_to_save)
        db.commit()
        image_id = image_want_to_save.id

    with open(image_file_path, "wb+") as file_object:
        file_object.write(file.file.read())

    # 소수점 제거
    style_result = {k: round(v, 2) for k, v in style_result.items()}

    # top 5만 추출
    top_5 = sorted(style_result.items(), key=lambda x: -x[1])[:5]

    # top_5 변수를 style db에 저장



    with SessionLocal() as db:
        top_5_list = list(top_5.items())
        new_style = models.style.Style(
            painting_id = image_id,
            artist_id0 = get_artist_id(db, top_5_list[0][0]),
            score0 = top_5_list[0][1],
            artist_id1 = get_artist_id(db, top_5_list[1][0]),
            score1 = top_5_list[1][1],
            artist_id2 = get_artist_id(db, top_5_list[2][0]),
            score2 = top_5_list[2][1],
            artist_id3 = get_artist_id(db, top_5_list[3][0]),
            score3 = top_5_list[3][1],
            artist_id4 = get_artist_id(db, top_5_list[4][0]),
            score4 = top_5_list[4][1]
        )
        db.add(new_style)
        db.commit()
    # 언더바 제거
    style_result = {k.replace("_", " "): v for (k, v) in top_5}

    

    return {
        "painting_id": image_id,
        "style_result": style_result,
        "image_url": image_file_path,
    }
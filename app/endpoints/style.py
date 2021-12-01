from fastapi import APIRouter, File, UploadFile

from app.ai.style_cls.main import classify_style
from app.ai.utils import read_imagefile
from app.schemas import style

router = APIRouter()


# @router.get("/")
# async def submit_form(id:int = None):

#     return {
#         "style_result": {
#                             "Andy Warhol": 94.77,
#                             "Rene Magritte": 5.16,
#                             "Henri Matisse": 0.07,
#                             "Albrecht Du rer": 0.0,
#                             "Alfred Sisley": 0.0
#                         },
#         ""


#     }


@router.post("/", response_model=style.StylePostResponse)
async def classify_uploaded_painting(
    file: UploadFile = File(...),
):  # key == file

    extension = file.filename.split(".")[-1].lower()
    if extension not in ("jpg", "jpeg", "png"):
        return "Image must be jpg or png format!"

    image = read_imagefile(await file.read())
    style_result = classify_style(image, extension=extension)

    # 소수점 제거
    style_result = {k: round(v, 2) for k, v in style_result.items()}

    # top 5만 추출
    top_5 = sorted(style_result.items(), key=lambda x: -x[1])[:5]

    # top_5 변수를 style db에 저장하는 로직 추가
    # crud

    # 언더바 제거
    style_result = {k.replace("_", " "): v for (k, v) in top_5}

    return {
        "painting_id": 23,
        "style_result": style_result,
        "image_url": r"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg/800px-Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg",
    }


# async def classify_uploaded_painting(files:List[UploadFile] = File(...)):

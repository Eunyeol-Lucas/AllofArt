from fastapi import APIRouter, File, UploadFile
from fastapi.responses import HTMLResponse

from app.ai.style_cls.main import classify_style
from app.ai.utils import read_imagefile

router = APIRouter()


@router.get("/", response_class=HTMLResponse)
async def submit_form():
    return """
<html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <form action="http://localhost/api/style" method="post" enctype="multipart/form-data">
            <input type="file" name="profile">
            <input type="submit">
        </form>
    </body>
</html>

"""


@router.post("/")
async def classify_uploaded_painting(file: UploadFile = File(...)):  # key == file

    extension = file.filename.split(".")[-1].lower()
    if extension not in ("jpg", "jpeg", "png"):
        return "Image must be jpg or png format!"

    image = read_imagefile(await file.read())
    result = classify_style(image, extension=extension)  # -> dict

    # 소수점 제거
    result = {k: round(v, 2) for k, v in result.items()}

    # top 5만 추출
    top_5 = sorted(result.items(), key=lambda x: -x[1])[:5]

    # top_5 변수를 style db에 저장하는 로직 추가

    # 언더바 제거
    top_5_return = {k.replace("_", " "): v for (k, v) in top_5}  # api리턴을 위한 데이터

    return top_5_return


# async def classify_uploaded_painting(files:List[UploadFile] = File(...)):

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
    result = classify_style(image, extension=extension)

    return result


# async def classify_uploaded_painting(files:List[UploadFile] = File(...)):

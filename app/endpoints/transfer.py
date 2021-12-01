from fastapi import APIRouter, File

from app.ai.style_trs.main import save_transfer_image
from app.schemas import transfer

# import os
# import shutil

router = APIRouter()


@router.get("/")
async def trs_test():
    return """
<html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <form action="http://localhost:8000/api/style" method="post" enctype="multipart/form-data">
            <input type="file" name="content_file">
            <input type="file" name="style_file">
            <input type="submit">
        </form>
    </body>
</html>

"""


@router.post("/", response_model=transfer.TransferPostResponse)
async def transfer_style(
    content_file: transfer.TransferPostRequest = File(...),
    style_file: transfer.TransferPostRequest = File(...),
):

    USER_IMAGE_DIR = "/code/app/static/images/user"
    PAINTING_ID = "test"

    # 확장자 check
    extensions = [
        file.filename.split(".")[-1].lower() for file in [content_file, style_file]
    ]
    for extension in extensions:
        if extension not in ("jpg", "jpeg", "png"):
            return "Image must be jpg or png format!"

    content_file_path = f"{USER_IMAGE_DIR}/{PAINTING_ID}_0.jpg"
    style_file_path = f"{USER_IMAGE_DIR}/{PAINTING_ID}_1.jpg"
    save_file_path = f"{USER_IMAGE_DIR}/{PAINTING_ID}_2.jpg"

    # 업로드된 파일 저장
    with open(content_file_path, "wb+") as file_object:
        file_object.write(content_file.file.read())

    with open(style_file_path, "wb+") as file_object:
        file_object.write(style_file.file.read())

    result = save_transfer_image(content_file_path, style_file_path, save_file_path)

    if result["status"] == "failed":
        return "error!"

    result = result["image_path"]

    # 임시 더미 데이터
    return {
        "transfer_image_path": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Eo_circle_blue_number-1.svg/2048px-Eo_circle_blue_number-1.svg.png",
        "content_image_path": "https://e7.pngegg.com/pngimages/1012/998/png-clipart-white-number-2-social-media-logo-computer-icons-number-2-infographic-blue.png",
        "style_image_path": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Eo_circle_blue_white_number-3.svg/1200px-Eo_circle_blue_white_number-3.svg.png",
    }

    # 컨테이너와 VM 상의 경로가 달라서 전처리
    # result = {k:v.replace('/code/app','') for k, v in result.items()}
    # return result


@router.get("/style")
async def get_style_image(limit: int = 8, page: int = 1):

    url = r"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Cat_paw_%28cloudzilla%29.jpg/200px-Cat_paw_%28cloudzilla%29.jpg"

    return [url for i in range(limit)]


@router.get("/content")
async def get_content_image(limit: int = 8, page: int = 1):

    url = r"http://thumbnail.egloos.net/600x0/http://pds20.egloos.com/pds/201008/17/02/a0007402_4c6a1097c7b37.jpg"

    return [url for i in range(limit)]

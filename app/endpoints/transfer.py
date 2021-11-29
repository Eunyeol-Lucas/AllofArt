from fastapi import APIRouter, File, UploadFile
from fastapi.responses import HTMLResponse

from app.ai.style_trs.main import transfer_style

import os
import pathlib

router = APIRouter()


@router.get("/", response_class=HTMLResponse)
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


@router.post("/")
async def trs_style(
    content_file: UploadFile = File(...), style_file: UploadFile = File(...)
):

    USER_IMAGE_DIR = "/static/images/user"

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

    result = transfer_style(content_file_path, style_file_path, save_file_path)

    if result["status"] == "failed":
        return "error!"

    return result["image_path"]

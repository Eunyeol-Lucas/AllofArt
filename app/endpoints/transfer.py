import os
from random import choice

from fastapi import APIRouter, File, Form, UploadFile

from app.ai.style_trs.main import save_transfer_image
from app.database import SessionLocal
from app.models import painting, transfer
from app.schemas import transfer

router = APIRouter()


@router.post("/", response_model=transfer.TransferPostResponse)
async def transfer_style(
    content_file: UploadFile = File(...),
    style_file: UploadFile = File(...),
    is_style_upload: bool = Form(...),
    is_content_upload: bool = Form(...),
):

    # 확장자 check
    extensions = [
        file.filename.split(".")[-1].lower() for file in [content_file, style_file]
    ]
    for extension in extensions:
        if extension not in ("jpg", "jpeg", "png"):
            return "Image must be jpg or png format!"

    BASE_URL = "/code/app/static/images/"

    USER_IMAGE_DIR = BASE_URL + "user"
    CONTENT_IMAGE_DIR = BASE_URL + "conpic"
    STYLE_IMAGE_DIR = BASE_URL + "artist"

    # 이미지가 유저 업로드인 경우
    with SessionLocal() as db:

        if is_content_upload:
            num_of_paintings = db.query(painting.Painting).count()
            num_of_paintings += 1
            content_file_path = os.path.join(USER_IMAGE_DIR, f"{num_of_paintings}.jpg")
            p = painting.Painting(
                img_url=content_file_path, painting_type=300, download=0, saved=False
            )
            db.add(p)
            db.commit()
            with open(content_file_path, "wb+") as file_object:
                file_object.write(content_file.file.read())
        if is_style_upload:
            num_of_paintings = db.query(painting.Painting).count()
            num_of_paintings += 1
            style_file_path = os.path.join(USER_IMAGE_DIR, f"{num_of_paintings}.jpg")
            p = painting.Painting(
                img_url=style_file_path, painting_type=300, download=0, saved=False
            )
            db.add(p)
            db.commit()
            with open(style_file_path, "wb+") as file_object:
                file_object.write(style_file.file.read())

    # 이미지가 upload가 아닌 경우~
    if is_content_upload is False:
        content_file_path = os.path.join(CONTENT_IMAGE_DIR, content_file.filename)

    if is_style_upload is False:
        style_file_path = os.path.join(STYLE_IMAGE_DIR, style_file.filename)

    # save file 경로 생성
    with SessionLocal() as db:
        num_of_paintings = db.query(painting.Painting).count()
        num_of_paintings += 1
        save_file_path = os.path.join(USER_IMAGE_DIR, f"{num_of_paintings}.jpg")
        p = painting.Painting(
            img_url=save_file_path, painting_type=100, download=0, saved=False
        )
        db.add(p)
        db.commit()
        result_img = (
            db.query(painting.Painting)
            .filter(painting.Painting.img_url == save_file_path)
            .one_or_none()
        )
        style_img = (
            db.query(painting.Painting)
            .filter(painting.Painting.img_url == style_file_path)
            .one_or_none()
        )
        content_img = (
            db.query(painting.Painting)
            .filter(painting.Painting.img_url == content_file_path)
            .one_or_none()
        )

        trs = transfer.Transfer(
            style_id=style_img.id,
            content_id=content_img.id,
            result_id=result_img.id,
        )
        db.add(trs)
        db.commit()

    result = save_transfer_image(content_file_path, style_file_path, save_file_path)

    if result["status"] == "failed":
        return "error!"

    result = result["image_path"]

    # 컨테이너와 VM 상의 경로가 달라서 전처리
    result = {k: v.replace("/code/app", "") for k, v in result.items()}
    return {**result, "painting_id": result_img.id}


@router.get("/style")
async def get_random_style_image():
    CONTENT_IMAGE_DIR = "/code/app/static/images/artist"
    images = os.listdir(CONTENT_IMAGE_DIR)
    random_image = choice(images)
    url = os.path.join(CONTENT_IMAGE_DIR, random_image)

    return url.replace("/code/app", "")


@router.get("/content")
async def get_random_content_image():

    STYLE_IMAGE_DIR = "/code/app/static/images/conpic"
    images = os.listdir(STYLE_IMAGE_DIR)
    random_image = choice(images)
    url = os.path.join(STYLE_IMAGE_DIR, random_image)

    return url.replace("/code/app", "")


@router.put("/create")
def create_result_image(painting_id: int):

    return "create success"

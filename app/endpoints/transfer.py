import os
from random import choice
from typing import Optional

from fastapi import APIRouter, File, Form, UploadFile

from app.ai.style_trs.main import save_transfer_image
from app.database import SessionLocal
from app.models import artist, painting, transfer
from app.schemas import transfer as transfer_schema
from ..constant import DOCKER_CONTENT_IMAGE_DIR, DOCKER_STYLE_IMAGE_DIR, DOCKER_USER_IMAGE_DIR, DOCKER_WORK_DIR

router = APIRouter()


@router.post("/")  # , response_model=transfer_schema.TransferPostResponse)
async def transfer_style(
    content_file: Optional[UploadFile] = File(None),
    style_file: Optional[UploadFile] = File(None),
    is_random_style: bool = Form(...),
    is_random_content: bool = Form(...),
    random_content_name: Optional[str] = Form(None),
    random_style_name: Optional[str] = Form(None),
):
    # return [
    #     is_random_style,
    #     is_random_content,
    #     random_content_name,
    #     random_style_name,
    # ]

    # 업로드 파일이면 확장자 check
    extensions = []
    if not is_random_style:
        extensions.append(style_file.filename.split(".")[-1].lower())
    else:
        random_style_name = random_style_name.split("/")[-1]
    if not is_random_content:
        extensions.append(content_file.filename.split(".")[-1].lower())
    else:
        random_content_name = random_content_name.split("/")[-1]

    for extension in extensions:
        if extension not in ("jpg", "jpeg", "png"):
            return "Image must be jpg or png format!"

    # 이미지가 유저 업로드인 경우
    with SessionLocal() as db:

        if not is_random_content:
            num_of_paintings = db.query(painting.Painting).count()
            num_of_paintings += 1
            content_file_path = os.path.join(DOCKER_USER_IMAGE_DIR, f"{num_of_paintings}.jpg")
            p = painting.Painting(
                img_url=content_file_path.replace(DOCKER_WORK_DIR, ""),
                painting_type=300,
                download=0,
                saved=False,
            )
            db.add(p)
            db.commit()
            with open(content_file_path, "wb+") as file_object:
                file_object.write(content_file.file.read())

        if not is_random_style:
            num_of_paintings = db.query(painting.Painting).count()
            num_of_paintings += 1
            style_file_path = os.path.join(DOCKER_USER_IMAGE_DIR, f"{num_of_paintings}.jpg")
            p = painting.Painting(
                img_url=style_file_path.replace(DOCKER_WORK_DIR, ""),
                painting_type=300,
                download=0,
                saved=False,
            )
            db.add(p)
            db.commit()
            with open(style_file_path, "wb+") as file_object:
                file_object.write(style_file.file.read())

    # 이미지가 upload가 아닌 경우~
    if is_random_content:
        content_file_path = os.path.join(DOCKER_CONTENT_IMAGE_DIR, random_content_name)

    if is_random_style:
        style_file_path = os.path.join(DOCKER_STYLE_IMAGE_DIR, random_style_name)

    # save file 경로 생성
    with SessionLocal() as db:
        num_of_paintings = db.query(painting.Painting).count()
        num_of_paintings += 1
        save_file_path = os.path.join(DOCKER_USER_IMAGE_DIR, f"{num_of_paintings}.jpg")
        p = painting.Painting(
            img_url=save_file_path.replace(DOCKER_WORK_DIR, ""),
            painting_type=100,
            download=0,
            saved=False,
        )
        db.add(p)
        db.commit()
        result_img = (
            db.query(painting.Painting)
            .filter(
                painting.Painting.img_url == save_file_path.replace(DOCKER_WORK_DIR, "")
            )
            .one_or_none()
        )
        style_img = (
            db.query(painting.Painting)
            .filter(
                painting.Painting.img_url == style_file_path.replace(DOCKER_WORK_DIR, "")
            )
            .one_or_none()
        )
        content_img = (
            db.query(painting.Painting)
            .filter(
                painting.Painting.img_url == content_file_path.replace(DOCKER_WORK_DIR, "")
            )
            .one_or_none()
        )
    if result_img is None:
        print("save_file_path", save_file_path.replace(DOCKER_WORK_DIR, ""))
    if style_img is None:
        print("style_file_path", style_file_path.replace(DOCKER_WORK_DIR, ""))
    if content_img is None:
        print("content_file_path", content_file_path.replace(DOCKER_WORK_DIR, ""))

    with SessionLocal() as db:
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

    result = {k: v.replace(DOCKER_WORK_DIR, "") for k, v in result.items()}
    result = {**result, "painting_id": result_img.id}

    return result


@router.get("/style")
async def get_random_style_image():
    images = os.listdir(DOCKER_CONTENT_IMAGE_DIR)
    random_image = choice(images)
    url = os.path.join(DOCKER_CONTENT_IMAGE_DIR, random_image)

    return url.replace(DOCKER_WORK_DIR, "")


@router.get("/content")
async def get_random_content_image():

    images = os.listdir(DOCKER_STYLE_IMAGE_DIR)
    random_image = choice(images)
    url = os.path.join(DOCKER_STYLE_IMAGE_DIR, random_image)

    return url.replace(DOCKER_WORK_DIR, "")


@router.put("/create")
def create_result_image(painting_id: int):
    try:
        with SessionLocal() as db:
            image_want_to_save = (
                db.query(painting.Painting)
                .filter(painting.Painting.id == painting_id)
                .one_or_none()
            )
            image_want_to_save.saved = True
            db.commit()
        return "create success"
    except:
        return "create fail"


@router.get("/asd")
def add_paintings():
    BASE_DIR = DOCKER_CONTENT_IMAGE_DIR
    files = os.listdir(BASE_DIR)
    with SessionLocal() as db:
        ids = [1, 26, 42, 50]
        for id_ in ids:
            artists = db.query(artist.Artist.id == id_).first()
            for a in artists:
                id_ = a.id
                name_ = a.name.replace(" ", "_")
                files = [i for i in os.listdir(BASE_DIR) if name_ in i]
                if len(files) < 1:
                    print(name_)
            for file in files:
                img_url = os.path.join(BASE_DIR.replace(DOCKER_WORK_DIR, ""), file)
                print(img_url)
                p = painting.Painting(
                    img_url=img_url, painting_type=id_, download=0, saved=False
                )
                db.add(p)
            # db.commit()


@router.get("/reset")
def reset_url():
    
    with SessionLocal() as db:

        paintings = db.query(painting.Painting).all()
        for p in paintings:
            p.img_url = p.img_url.replace(DOCKER_WORK_DIR, "")
        db.commit()

from fastapi import APIRouter
from fastapi.responses import HTMLResponse
import os
from ..database import SessionLocal
from ..models import artist
from ..constant import DOCKER_CONTENT_IMAGE_DIR, DOCKER_STYLE_IMAGE_DIR, DOCKER_USER_IMAGE_DIR, DOCKER_WORK_DIR, UPLOAD_IMG,TRASFER_IMG
from app.models import artist, painting, transfer


router = APIRouter()


@router.get("/")
async def submit_form(response_class: HTMLResponse):
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


@router.get("/dbtest")
def dbtest():
    db = SessionLocal()
    print("db connection!!")
    add_arttist = artist.Artist(name="Picasso",genre="abstraction",year="1880",nation="Spain",description="genius")
    # artists = db.query(artist.Artist).filter_by(name="picasso").all()
    db.add(add_arttist)


    # for ar in artists:
        # print(ar)

    db.commit()
    db.close()
    return "success!!"


@router.get("/artistdbtest")
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
                    img_url=img_url, painting_type=id_, download_cnt=0, saved=False
                )
                db.add(p)
            # db.commit()
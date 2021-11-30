from fastapi import APIRouter
from fastapi.responses import HTMLResponse

from ..database import SessionLocal
from ..models import artist
router = APIRouter()


@router.get("/")
async def submit_form(response_class=HTMLResponse):
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
    arrr = artist.Artist(artist_name="kiwon",genre="1",year="1",nation="korea",description="backend")
    artists = db.query(artist.Artist).filter_by(artist_name="picasso").all()
    db.add(arrr)

    for ar in artists:
        print(ar)

    db.commit()
    db.close()
    return "success!!"
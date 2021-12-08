from fastapi import APIRouter, HTTPException

from ..constant import LAST_ARTIST_ID
from ..database import SessionLocal
from ..models import artist, painting

router = APIRouter()


@router.get("/", summary="Get artists information")
def get_all_artist():
    # 화가 사진이랑 이름
    with SessionLocal() as db:
        all_artists = db.query(artist.Artist).all()
    result = []
    for each_artist in all_artists:
        result.append(
            {
                "id": each_artist.id,
                "profile": f"/static/images/profile/{each_artist.name.replace(' ','_')}.jpeg",
                "name": each_artist.name.replace("_", " "),
            }
        )

    return result


@router.get("/detail/{artist_id}")
def get_artist_detail(artist_id: int = 1):
    with SessionLocal() as db:
        some_artist = (
            db.query(artist.Artist).filter(artist.Artist.id == artist_id).one_or_none()
        )
        if (some_artist is None) or (artist_id > LAST_ARTIST_ID):
            raise HTTPException(status_code=404, detail="요청하신 화가가 없습니다!")
        number_of_paintings = (
            db.query(painting.Painting)
            .filter(painting.Painting.painting_type == artist_id)
            .count()
        )
        if number_of_paintings > 6:
            number_of_paintings = 6
    images = [
        f"/static/images/artist/{some_artist.name.replace(' ','_')}_{i}.jpg"
        for i in range(1, number_of_paintings + 1)
    ]
    images.insert(0, f"/static/images/profile/{some_artist.name.replace(' ','_')}.jpeg")
    some_artist.images = images
    some_artist.name = some_artist.name.replace("_", " ")
    return some_artist

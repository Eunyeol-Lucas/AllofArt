from fastapi import APIRouter

from app.schemas import gallery

# from ..database import SessionLocal
# from ..models import artist
router = APIRouter()

# 정렬 함수
def gallery_sort(total, duration, sort_by):
    from datetime import datetime, timedelta

    today = datetime.now()
    if duration == "month":
        axis = today - timedelta(days=30)
        total = [r for r in total if r["created_at"] > axis]
    elif duration == "week":
        axis = today - timedelta(days=7)
        total = [r for r in total if r["created_at"] > axis]
    elif duration == "day":
        axis = today - timedelta(days=1)
        total = [r for r in total if r["created_at"] > axis]
    else:
        pass

    if sort_by == "download":
        total = sorted(total, key=lambda x: -x["download"])
    elif sort_by == "date":
        total = sorted(total, key=lambda x: x["created_at"], reverse=True)

    for r in total:
        r["created_at"] = r["created_at"].isoformat()
    return total


# dummydata 생성을 위한 함수
def get_dummy(n: int, days: int) -> dict:

    from datetime import datetime, timedelta
    from random import randint

    dummy = {
        "painting_id": n,
        "download": randint(1, 100),
        "created_at": (datetime.now() - timedelta(days=days)),
        "result": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Eo_circle_blue_number-1.svg/2048px-Eo_circle_blue_number-1.svg.png",
        "style": "https://e7.pngegg.com/pngimages/1012/998/png-clipart-white-number-2-social-media-logo-computer-icons-number-2-infographic-blue.png",
        "content": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Eo_circle_blue_white_number-3.svg/1200px-Eo_circle_blue_white_number-3.svg.png",
    }
    return dummy


@router.get("/", summary="Get transfer, style, content images")
# 모든 사진 가져오기
def get_all_transfer_image(
    duration: str = "all",
    sort_by: str = "download",
    page: int = 1,
):
    """
    요청일 기준으로 duration동안 sort_by에 따라 정렬한 transfer image item을 return해줍니다.
    ### query parameters
    - **duration** : all, month, week, day
    - **sort_by** : download, date
    - **page**: N(>=1)
    """
    # 원래는 db transfer, painting 테이블 참조하여 모든 이미지 정보 불러옴
    LIMIT = 9

    # 더미로 transfer이미지가 총 100개 있다고 가정
    total = [get_dummy(i, i) for i in range(100)]

    # 정렬
    total = gallery_sort(total, duration, sort_by)

    start = (page - 1) * LIMIT
    end = (page) * LIMIT
    result = total[start:end]

    return result


@router.get(
    "/download/{painting_id}",
    response_model=gallery.GalleryDownloadResponse,
    summary="Get image url",
)  # 다운로드 받기
def download_image(painting_id: int):
    """
    painting_id에 해당하는 그림의 url과 Get 요청 후의 download 수를 return해 줍니다.
    ### query parameters
    - **painting_id** : 1, 2, ...
    """

    return {
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Eo_circle_blue_number-1.svg/2048px-Eo_circle_blue_number-1.svg.png",
        "download": 999,
    }

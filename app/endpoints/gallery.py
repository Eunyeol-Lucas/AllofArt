from typing import List

from fastapi import APIRouter
from fastapi.responses import FileResponse

from app.schemas import artist

# from ..database import SessionLocal
# from ..models import artist
router = APIRouter()

# dummydata 생성을 위한 함수
def get_dummy(n: int) -> dict:

    from datetime import datetime
    from random import randint

    dummy = {
        "painting_id": n,
        "download": randint(1, 100),
        "created_at": datetime.now().isoformat(),
        "result": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Eo_circle_blue_number-1.svg/2048px-Eo_circle_blue_number-1.svg.png",
        "style": "https://e7.pngegg.com/pngimages/1012/998/png-clipart-white-number-2-social-media-logo-computer-icons-number-2-infographic-blue.png",
        "content": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Eo_circle_blue_white_number-3.svg/1200px-Eo_circle_blue_white_number-3.svg.png",
    }
    return dummy


@router.get("/")  # 모든 사진 가져오기
def get_all_transfer_image(page: int = 1):
    # 원래는 db transfer, painting 테이블 참조하여 모든 이미지 정보 불러옴
    LIMIT = 9

    # 더미로 transfer이미지가 총 100개 있다고 가정
    total = [get_dummy(i) for i in range(100)]

    start = (page - 1) * LIMIT
    end = (page) * LIMIT
    result = total[start:end]

    return result


@router.get("/download/{painting_id}", response_model=bytes)  # 다운로드 받기
def download_image(painting_id: int):

    return FileResponse("/code/app/static/images/user/test_2.jpg")

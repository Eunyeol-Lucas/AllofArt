from datetime import datetime, timedelta

from fastapi import APIRouter, HTTPException
from sqlalchemy import func

from app.constant import TRASFER_IMG
from app.database import SessionLocal, db
from app.models import download, painting, transfer
from app.schemas import gallery as gallery_schema

router = APIRouter()

# 정렬 함수
def gallery_sort_by(total, sort_by):
    if sort_by == "download":
        total = sorted(total, key=lambda x: -x["download"])
    elif sort_by == "date":
        total = sorted(total, key=lambda x: x["transfer_id"], reverse=True)

    return total


# download 다운로드 수 계산
def cal_axis(duration):
    today = datetime.today()
    if duration == "day":
        axis = today - timedelta(days=1)
    elif duration == "week":
        axis = today - timedelta(days=7)
    elif duration == "month":
        axis = today - timedelta(days=30)
    else:
        axis = today - timedelta(days=365)

    return datetime(year=axis.year, month=axis.month, day=axis.day)


@router.get("", summary="Get transfer, style, content images")
# 모든 사진 가져오기
def get_all_transfer_image(
    duration: str = "day",
    sort_by: str = "date",
    page: int = 1,
):
    """
    요청일 기준으로 duration동안 sort_by에 따라 정렬한 transfer image item을 return해줍니다.
    ### query parameters
    - **duration** : all, month, week, day
    - **sort_by** : download, date
    - **page**: N(>=1)
    """

    LIMIT = 2

    AXIS = cal_axis(duration)

    visibible_paintings = (
        db.query(
            painting.Painting,
            transfer.Transfer,
        )
        .filter(
            (painting.Painting.saved == True)
            & (painting.Painting.painting_type == TRASFER_IMG)
        )
        .filter(transfer.Transfer.result_id == painting.Painting.id)
        .all()
    )

    results_with_result_url = []

    for visibible_painting in visibible_paintings:
        results_with_result_url.append(
            {
                "transfer_id": visibible_painting.Transfer.id,
                "result_img_url": visibible_painting.Painting.img_url,
                "result_img_id": visibible_painting.Painting.id,
                "style_img_id": visibible_painting.Transfer.style_id,
                "content_img_id": visibible_painting.Transfer.content_id,
            }
        )

    all_download_history = (
        db.query(download.Download.painting_id, func.count(download.Download.id))
        .filter(AXIS < download.Download.downloaded_at)
        .group_by(download.Download.painting_id)
        .all()
    )

    # transfer_id에 대해 download 수를 넣어줌
    for result in results_with_result_url:
        result["download"] = 0
        for history in all_download_history:
            if history[0] == result["result_img_id"]:
                result["download"] = history[1]

    # 이제 history를 정렬하고
    sorted_result = gallery_sort_by(results_with_result_url, sort_by)

    for result in sorted_result:
        result["style_img_url"] = (
            db.query(painting.Painting)
            .filter(painting.Painting.id == result["style_img_id"])
            .one()
            .img_url
        )
        result["content_img_url"] = (
            db.query(painting.Painting)
            .filter(painting.Painting.id == result["content_img_id"])
            .one()
            .img_url
        )

        del result["style_img_id"]
        del result["content_img_id"]

    start = (page - 1) * LIMIT
    end = (page) * LIMIT
    final_result = sorted_result[start:end]

    if not final_result:
        return "no content"

    return final_result


@router.get(
    "/download/{painting_id}",
    response_model=gallery_schema.GalleryDownloadResponse,
    summary="Get image url",
)  # 다운로드 받기
def download_image(painting_id: int):
    """
    painting_id에 해당하는 그림의 url과 Get 요청 후의 download 수를 return해 줍니다.
    ### query parameters
    - **painting_id** : 1, 2, ...
    """
    # 다운로드 + 1 처리
    image_want_to_dowload = (
        db.query(painting.Painting)
        .filter(
            (painting.Painting.id == painting_id)
            & (painting.Painting.painting_type == TRASFER_IMG)
        )
        .one_or_none()
    )
    if not image_want_to_dowload:
        raise HTTPException(status_code=404, detail="요청하신 그림이 없습니다!")
    image_want_to_dowload.download_cnt += 1
    log = download.Download(painting_id=painting_id, downloaded_at=datetime.now())
    db.add(log)
    db.commit()

    return {
        "image_url": image_want_to_dowload.img_url,
        "download": image_want_to_dowload.download_cnt,
    }


# 더미데이터용 endpoint입니다 나중에 통째로 삭제하면 됩니다.


@router.get("/para", summary="파라미터 확인용")
def return_parameters(
    duration: str = "all",
    sort_by: str = "download",
    page: int = 1,
):

    return {
        duration: str(type(duration)),
        sort_by: str(type(sort_by)),
        page: str(type(page)),
    }

from typing import Final

# DB 관련 상수
LAST_ARTIST_ID:Final = 50

## Painting테이블 painting_type 컬럼 숫자 의미
TRASFER_IMG:Final = 100
ANALYZE_IMG:Final = 200
UPLOAD_IMG:Final = 300
SOURCE_IMG:Final = 400



# host static 경로 상수
CONTENT_IMAGE_DIR:Final = "/static/images/conpic"

STYLE_IMAGE_DIR:Final = "/static/images/artist"

PROFILE_IMAGE_DIR:Final = "/static/images/profile"

USER_IMAGE_DIR:Final = "/static/images/user"



# docker container static 경로 상수
DOCKER_WORK_DIR:Final = "/code/app"

DOCKER_CONTENT_IMAGE_DIR:Final = f"{DOCKER_WORK_DIR}/static/images/conpic"

DOCKER_STYLE_IMAGE_DIR:Final = f"{DOCKER_WORK_DIR}/static/images/artist"

DOCKER_PROFILE_IMAGE_DIR:Final = f"{DOCKER_WORK_DIR}/static/images/profile"

DOCKER_USER_IMAGE_DIR:Final = f"{DOCKER_WORK_DIR}/static/images/user"



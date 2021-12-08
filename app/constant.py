from typing import Final

# DB 관련 상수
LAST_ARTIST_ID:Final = 50


# host static 경로 상수
CONTENT_IMAGE_DIR:Final = "/static/images/artist"

STYLE_IMAGE_DIR:Final = "/static/images/conpic"

PROFILE_IMAGE_DIR:Final = "/static/images/profile"

USER_IMAGE_DIR:Final = "/static/images/user"


# docker container static 경로 상수
DOCKER_WORK_DIR:Final = "/code/app"

DOCKER_CONTENT_IMAGE_DIR:Final = f"{DOCKER_WORK_DIR}/static/images/artist"

DOCKER_STYLE_IMAGE_DIR:Final = f"{DOCKER_WORK_DIR}/static/images/conpic"

DOCKER_PROFILE_IMAGE_DIR:Final = f"{DOCKER_WORK_DIR}/static/images/profile"

DOCKER_USER_IMAGE_DIR:Final = f"{DOCKER_WORK_DIR}/static/images/user"



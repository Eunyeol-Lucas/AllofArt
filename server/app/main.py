from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

from app.constant import DOCKER_WORK_DIR
from app.endpoints import artist, check, gallery, style, transfer

tags_metadata = [
    {
        "name": "style",
        "description": "스타일 분석 API",
    },
    {
        "name": "transfer",
        "description": "스타일 전이 API",
    },
    {
        "name": "gallery",
        "description": "갤러리 페이지 API ",
    },
    {
        "name": "artist",
        "description": "artist 인포 페이지 API",
    },
    {
        "name": "check",
        "description": "front test(삭제예정)",
    },
]

origins = ["*"]
origins = [
    "http://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com",
    "https://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com",
    "http://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com:5000",
    "https://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com:5000",
    "http://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com:8000",
    "https://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com:8000",
    "https://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com:80",
    "http://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com:80",
    "http://localhost:3000",
]

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
]

app = FastAPI(
    title="All of Art",
    description="All of Art팀의 API docs입니다.",
    openapi_tags=tags_metadata,
    middleware=middleware,
)
# app.router.redirect_slashes = False

app.include_router(style.router, prefix="/api/style", tags=["style"])
app.include_router(transfer.router, prefix="/api/transfer", tags=["transfer"])
app.include_router(gallery.router, prefix="/api/gallery", tags=["gallery"])
app.include_router(artist.router, prefix="/api/artist", tags=["artist"])
app.include_router(check.router, prefix="/api/check",tags=["check"])

app.mount("/static", StaticFiles(directory=f"{DOCKER_WORK_DIR}/static"), name="static")
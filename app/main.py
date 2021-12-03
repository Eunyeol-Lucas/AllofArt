from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.endpoints import gallery, register, style, transfer, users

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
        "name": "painter info",
        "description": "페인터 인포 페이지 API(개발 예정)",
    },
    {
        "name": "users",
        "description": "(삭제 예정)",
    },
    {
        "name": "register",
        "description": "CRUD test 중(삭제 예정)",
    },
]

app = FastAPI(
    title="All of Art",
    description="All of Art팀의 API docs입니다.",
    openapi_tags=tags_metadata,
)

# origins = [
#     "http://localhost",
#     "https://localhost",
# ]

app.add_middleware(
    CORSMiddleware,
    # allow_origins=origins,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(style.router, prefix="/api/style", tags=["style"])
app.include_router(transfer.router, prefix="/api/transfer", tags=["transfer"])
app.include_router(register.router, prefix="/api/register", tags=["register"])
app.include_router(gallery.router, prefix="/api/gallery", tags=["gallery"])

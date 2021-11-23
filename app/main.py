from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.endpoints import style, users

app = FastAPI()

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


@app.get("/")
def test_root():
    return {"Hello": "Main"}


@app.get("/api")
def test_api_prefix():
    return {"Hello": "api"}


app.include_router(users.router, prefix="/api/users")
app.include_router(style.router, prefix="/api/style")
# app.include_router(user.user, prefix="/api")
# app.include_router(user.user, prefix="/api")

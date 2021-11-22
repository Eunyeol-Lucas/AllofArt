from fastapi import FastAPI

from app.endpoints import style, users

app = FastAPI()


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

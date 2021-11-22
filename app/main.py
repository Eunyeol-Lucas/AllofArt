from endpoints import users
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def test_root():
    return {"Hello": "Main"}


@app.get("/api")
def test_api_prefix():
    return {"Hello": "api"}


# app.mount("/api", user.user)
app.include_router(users.router, prefix="/api/users")
# app.include_router(user.user, prefix="/api")
# app.include_router(user.user, prefix="/api")
# app.include_router(user.user, prefix="/api")

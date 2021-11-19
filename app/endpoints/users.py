from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def read_user():
    return {"get": "user"}

@router.post("/")
def read_user():
    return {"post": "user"}
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def check():
    return "check"

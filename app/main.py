from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

<<<<<<< HEAD
from app.endpoints import style, transfer, users
=======
from app.endpoints import register, style, users
>>>>>>> feat/#4

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
<<<<<<< HEAD
app.include_router(transfer.router, prefix="/api/transfer")
=======
app.include_router(register.router, prefix="/api/register")
# app.include_router(user.user, prefix="/api")
>>>>>>> feat/#4
# app.include_router(user.user, prefix="/api")

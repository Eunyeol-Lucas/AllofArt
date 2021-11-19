from fastapi import FastAPI
from endpoints import users

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "Main"}

@app.get("/api")
def read_root():
    return {"Hello": "api"}

# app.mount("/api", user.user)
app.include_router(users.router, prefix="/api/users")
# app.include_router(user.user, prefix="/api")
# app.include_router(user.user, prefix="/api")
# app.include_router(user.user, prefix="/api")


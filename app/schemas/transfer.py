from pydantic import AnyUrl, BaseModel


class TransferBase(BaseModel):
    painting_id: int = 3


class TransferCreate(TransferBase):
    id: int


class Transfer(TransferCreate):

    style: int = 3
    content: int = 5
    result: int = 7

    class Config:
        orm_mode = True


class TransferPostRequest(BaseModel):
    style_file: bytes
    content_file: bytes


class TransferPostResponse(BaseModel):
    transfer_image_path: AnyUrl = "/static/images/1.jpg"
    content_image_path: AnyUrl = "/static/images/2.jpg"
    style_image_path: AnyUrl = "/static/images/3.jpg"

from pydantic import BaseModel


class TransferBase(BaseModel):
    id: int = 3


class Transfer(TransferBase):

    style_id: int = 3
    content_id: int = 5
    result_id: int = 7

    class Config:
        orm_mode = True


class TransferPostRequest(BaseModel):
    style_file: bytes
    content_file: bytes
    is_style_upload: bool
    is_content_upload: bool


class TransferPostResponse(BaseModel):
    painting_id: int = 3
    transfer_image_path: str = "/static/images/1.jpg"
    content_image_path: str = "/static/images/2.jpg"
    style_image_path: str = "/static/images/3.jpg"

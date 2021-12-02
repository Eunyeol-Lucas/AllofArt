from pydantic import BaseModel


class GalleryDownloadResponse(BaseModel):
    image_url: str = "/static/images/user/test_2.jpg"
    download: int = 999

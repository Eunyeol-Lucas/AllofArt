from db_connect import db

class Book(db.Model):
    __tablename__ = 'book'
    book_id = db.Column(db.Integer,  primary_key=True,
                   nullable=False, autoincrement=True)
    book_name = db.Column(db.String(256),nullable=False)
    publisher = db.Column(db.String(256),nullable=False)
    author = db.Column(db.String(256),nullable=False)
    publication_date = db.Column(db.Date, nullable = False)
    pages = db.Column(db.String(256), nullable = False)
    isbn = db.Column(db.String(256), nullable = False)
    description = db.Column(db.Text)
    link = db.Column(db.String(256))
    remaining = db.Column(db.Integer)
    rating = db.Column(db.Integer, default=5)

    def __init__(self, book_name, publisher, author):
        self.book_name = book_name
        self.publisher = publisher
        self.author = author
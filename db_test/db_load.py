import pymysql
import csv

conn = pymysql.connect(host='localhost', user='root', password='1234', db='book', charset='utf8') 
cursor = conn.cursor() 

with open("book.csv",'r',encoding='utf-8') as file:
    csv_reader = csv.DictReader(file)
    for line in csv_reader:
        print(line)
        try:
            book_name = line['book_name']
            publisher = line['publisher']
            author = line['author']
            publication_date = line['publication_date']
            pages = line['pages']
            isbn = line['isbn']
            description = line['description']
            link = line['link']
            remaining = 10
            rating = 5
            sql = '''
                INSERT INTO BOOK(book_name, publisher, author, publication_date, pages, isbn, description, link)
                VALUES (''' + "'" +book_name + "', '" + publisher +"', '" + author +"', "+ '"' + publication_date + '"' +", '"+ pages+"', '" + isbn +"', '" + description+"', '"+ link+"')"
            cursor.execute(sql)
            conn.commit()
        except:
            continue
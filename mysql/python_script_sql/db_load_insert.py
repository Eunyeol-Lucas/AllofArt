import pymysql
import csv

conn = pymysql.connect(host='localhost',user='root',password='1234',db='imagetest',charset='utf8')
cursor = conn.cursor() 
print("success")
with open("artists_bio.csv",'r',encoding="utf-8") as file:
    csv_reader = csv.DictReader(file)
    for line in csv_reader:
        print(line)
        print()
        name = line['name']
        genre = line['genre']
        nationality = line['nationality']
        years = line['years']
        bio = line['bio']
        print(bio)
        print(name,genre,nationality)
        sql = f'''
            INSERT INTO artist(name, genre, nation,year)
            VALUES("{name}", "{genre}", "{nationality}","{years}")
            '''
        sql = f'''
            INSERT INTO artist(description)
            VALUES("{bio}");
        '''
        print(sql)
        cursor.execute(sql)
        conn.commit()



## id 값 변경 코드
# for i in range(106,155): #106 ->2
#     sql = f'''
#         update artist
#         set id = {i-104}
#         where id = '{i}'; 
#     '''
#     cursor.execute(sql)
#     conn.commit()
# update artist set id = 1 where id = '105';

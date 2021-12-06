import pymysql
import csv

conn = pymysql.connect(host='localhost',user='root',password='1234',db='image',charset='utf8')
cursor = conn.cursor() 
print("success")
with open("painter_Info.csv",'r',encoding="utf-8") as file:
    csv_reader = csv.DictReader(file)
    for line in csv_reader:
        print()
        try:
            name = line['name']
            genre = line['genre']
            nationality = line['nationality']
            years = line['years']
            bio1 = line['bio1']
            bio2 = line['bio2']
            
            # sql = f'''
            #     INSERT INTO artist(name, genre, nation,year)
            #     VALUES("{name}", "{genre}", "{nationality}","{years}")
            #     '''
            sql = f'''
                UPDATE artist
                SET desc_simple= "{bio1}",
                    desc_detail = "{bio2}"
                where name = "{name}";
            '''
            cursor.execute(sql)
        except:
            print("fail")
            continue
    else:
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

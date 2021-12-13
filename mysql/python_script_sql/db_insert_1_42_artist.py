import os
import pymysql

conn = pymysql.connect(host='localhost',user='root',password='Joan_Miro_1023',db='image',port = 443, charset='utf8')
cursor = conn.cursor()
print("success")

BASE_DIR = "/static/images/artist"
files = os.listdir(BASE_DIR)
for file in files:
    if "Albrecht_Du_rer" in file:
        url = os.path.join(BASE_DIR, file)
        sql = f'''
                INSERT INTO painting(img_url, painting_type,download)
                VALUES('{url}',1,0)
        '''
        # print(sql)
        cursor.execute(sql)
    if "Pieter_Bruegel" in file:
        url = os.path.join(BASE_DIR, file)
        sql = f'''
                INSERT INTO painting(img_url, painting_type,download)
                VALUES('{url}',42,0)
        '''
        cursor.execute(sql)
else:
    conn.commit()




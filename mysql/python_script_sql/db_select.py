import pymysql
import csv

conn = pymysql.connect(host='localhost',user='root',password='1234',db='image',charset='utf8')
cursor = conn.cursor() 
print("success")
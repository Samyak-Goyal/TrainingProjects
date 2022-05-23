import sqlite3

conn=sqlite3.connect('db.sqlite3')

cur=conn.cursor()

cur.execute("insert into blog_post(title,content,date,slug,status,author_id) values('pets','just a content','2022-01-01','pets',1,1)")
conn.commit()
conn.close()
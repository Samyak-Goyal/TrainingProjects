import sqlite3

con = sqlite3.connect('employee.db')
print('Databse Connected')
cur = con.cursor()
cur.execute(
    'CREATE TABLE Employees(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, address TEXT)')
con.commit()
con.close()

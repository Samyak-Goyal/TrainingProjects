from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, redirect, url_for, request
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.sqlite3'

db = SQLAlchemy(app)


class students(db.Model):  # classname (here, students) is the name of the table
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    city = db.Column(db.String(50))

    def __init__(self, name, city):
        self.name = name
        self.city = city


@app.route('/')
def show_all():
    return render_template('show.html', student= students.query.all())


@app.route('/createdb')
def create():
    db.create_all()  # creating the database, equivalent to Base.metadata.create_all(engine) which we did in alchemy
    return redirect(url_for('show_all'))

@app.route('/new', methods=['POST', 'GET'])
def new_student():
    if request.method == 'POST':
        name= request.form['name']
        city=request.form['city']
        newstudent= students(name, city)
        db.session.add(newstudent)
        db.session.commit()
        return redirect(url_for('show_all'))
    return render_template('new.html')

@app.route('/edit/<int:sid>', methods=['POST', 'GET'])
def edit_student(sid):
    # if request.method=='POST':
    # item = students.query.filter_by(id = sid)
    
    # name=db.session.query(students.name).filter_by(id=sid).first()
    # city= db.session.query(students.city).filter_by(id=sid).first()
    if request.method =='POST':
        stud=students.query.get(sid)
        name=request.form['name']
        city=request.form['city']
        stud.name=name
        stud.city=city
        db.session.commit()
        return redirect(url_for('show_all'))
    return render_template('edit.html', s=students.query.filter_by(id=sid).first())

@app.route('/update/<int:id>', methods=['POST'])
def update_students(sid):
    name=db.session.query(students.name).filter_by(id=sid).first()
    city= db.session.query(students.city).filter_by(id=sid).first()

    return redirect(url_for('show_all'))

@app.route('/delete/<int:sid>')
def delete_student(sid):
    students.query.filter_by(id=sid).delete()
    db.session.commit()
    return redirect(url_for('show_all'))

if __name__ == '__main__':
    # db.create_all() --> can be done here too
    app.run(debug=True)

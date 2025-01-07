from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import Enum

db = SQLAlchemy()
class User(db.Model):
    __tablename__ = 'users'
    userID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    timeCreated = db.Column(db.DateTime)

    role = db.Column(db.String(80), unique=False, nullable=False)

    sessions = relationship('Session', backref='user')
    logs = relationship('Log', backref='user')
    alerts = relationship('Alert', backref='user')
    access_token = db.Column(db.String(1024))

class Session(db.Model):
    __tablename__ = 'sessions'
    sessionID = db.Column(db.Integer, primary_key=True)
    userID = db.Column(db.Integer, db.ForeignKey('users.userID'))
    timeCreated = db.Column(db.DateTime)
    timeEnded = db.Column(db.DateTime)

    logs = relationship('Log', backref='session')
    alerts = relationship('Alert', backref='session')

class Log(db.Model):
    __tablename__ = 'logs'
    logID = db.Column(db.Integer, primary_key=True)
    userID = db.Column(db.Integer, db.ForeignKey('users.userID'))
    xCoor = db.Column(db.Integer)
    yCoor = db.Column(db.Integer)

    sessionID = db.Column(db.Integer, db.ForeignKey('sessions.sessionID'))

class Alert(db.Model):
    __tablename__ = 'alerts'
    alertID = db.Column(db.Integer, primary_key=True)
    sessionID = db.Column(db.Integer, db.ForeignKey('sessions.sessionID'))
    userID = db.Column(db.Integer, db.ForeignKey('users.userID'))
    type = db.Column(Enum('TYPE_1', 'TYPE_2', name='alert_types'))
    timeCreated = db.Column(db.DateTime)
from flask import render_template, Markup, g, request, jsonify, redirect, Response, flash, url_for

app = Flask(__name__)

@app.route('/')
def home():
    """
    Home Page for the RattleBus website
    """
    return render_template("index.html")

from flask import Flask, render_template, g, request, jsonify, abort, make_response
from pymongo import MongoClient

app = Flask(__name__)


@app.before_request
def before_request():
    g.conn = MongoClient()
    g.rattlebus_db = g.conn.test.rattlebus


@app.teardown_request
def teardown_request(exception):
    g.conn.close()


@app.route('/')
def home():
    """
    Home Page for the RattleBus website
    """
    return make_response(open('rattlebus.html').read())  # TOOD replace with send_file() in production


@app.route('/record/<int:record_id>/segment', methods=['POST'])
def upload_segment(record_id=1):
    data = request.json
    data.update({"record_id": record_id})
    g.rattlebus_db.insert(data)
    del data["_id"]
    return make_response(("ok", 200, []))


@app.route('/record/<int:record_id>', methods=['GET'])
def view_segments(record_id=1):
    segments = g.rattlebus_db.find({"record_id": record_id})
    return render_template("segments.html", segments=segments)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

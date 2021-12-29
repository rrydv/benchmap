from flask import Flask, jsonify, render_template
from db import fetch_benches

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/benches')
def all_benches():
    resp = jsonify(fetch_benches())
    #resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


if __name__ == "__main__":
    app.run()
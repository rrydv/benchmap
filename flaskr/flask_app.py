from flask import Flask, jsonify, render_template, request
from db import fetch_benches
from img_processor import process_img
import uuid
from dataclasses import dataclass

app = Flask(__name__, static_folder="build/static", template_folder="build")

@app.route('/', methods = ["GET"])
def home():
    print("served main page")
    return render_template('index.html')

@app.route('/add_bench', methods = ["POST"])
def handle_bench_form():
    str_uuid = str(uuid.uuid4())
    form=request.form

    form_content={
        "area":form["area"],
        "lat":form["lat"],
        "lng":form["lng"],
        "rating":form["rating"],
        "uuid":str_uuid
    }
    for key in request.files:
        img_result = process_img(img_input = request.files[key], 
                    uuid = str_uuid, name = key)
        if type(img_result) == str:
            form_content[key] = img_result
        else:
            return img_result
    
    
    print(request.files)
    print(form_content)
        
    return render_template('index.html')

@app.route('/benches')
def all_benches():
    resp = jsonify(fetch_benches())
    #resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


@dataclass
class BenchForm:
    area:str
    lat:float
    lng:float
    rating:float
    bench_photo:str
    view_photo:str
    str_uuid:str(uuid)


if __name__ == "__main__":
    app.run(debug=True, port=8000, host="0.0.0.0")
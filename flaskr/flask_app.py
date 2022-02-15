from flask import Flask, jsonify, render_template, request, abort
from db import fetch_benches, add_record
from img_processor import process_img, InappropriateImageError
import uuid
from dataclasses import dataclass
from werkzeug.exceptions import BadRequestKeyError


app = Flask(__name__, static_folder="../build/static", template_folder="../build")

#from flask_cors import CORS
#CORS(app)

@app.route('/', methods = ["GET"])
def home():
    print("served main page")
    return render_template('index.html')

@app.route('/add_bench', methods = ["POST"])
def handle_bench_form():
    str_uuid = str(uuid.uuid4())
    form=request.form
    print(form)
    print(request.files)
    try:
        form_content={
            "area":form["area"],
            "lat":form["lat"],
            "lng":form["lng"],
            "rating":form["benchRating"],
            "uuid":str_uuid
        }
    except BadRequestKeyError:
        return "Couldn't process your request, form is missing required fields!", 400
    

    try:
        for key in request.files:
            img_result = process_img(img_input = request.files[key], 
                        uuid = str_uuid, name = key)
            if type(img_result) == str:
                form_content[key] = img_result
    except InappropriateImageError as e:
        return str(e), 400
    
        """try:
        add_record(form_content)
    except ValueError:
        abort(400, "Empty form was provided, can't add data!") """
    return "Your bench was successfully added!", 200

        

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
    app.run(debug=True, host='0.0.0.0', port=5000)
    #app.run()
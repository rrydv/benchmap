from typing import OrderedDict
from pymongo import MongoClient
from bson import json_util
import json
from datetime import datetime
import os
import ssl

URI = os.environ.get("MONGO_DB")


def connect_DB():
    client = MongoClient(URI) #change this 
    db = client['benchmap']
    collection = db['benches']
    return collection

def add_record(bench_params:dict) -> None:
    if bench_params is None:
        raise ValueError
    
    dt_obj = datetime.now()
    epoch_sec = int(dt_obj.timestamp())
    bench_params["date_created"] = epoch_sec
    
    collection = connect_DB()
    collection.insert_one(bench_params)
    
    return 200
    
def fetch_benches() -> list:
    with MongoClient(URI) as client:
        db = client["benchmap"]
        collection = db["benches"]
        result = json.loads(json_util.dumps(collection.find()))
    return result





if __name__ == "__main__":
    """
    client = connectDB(uri)
    db = client['benchmap']
    collection = db["benches"]
    query = [('collMod', 'benches'),('validator',{"author":{"$type":"string"}}),('validationLevel','strict')]
    query = OrderedDict(query)
    db.command(query)
    
    bench_params = {
        "name":"Lighthouse Park Bench 2",
        "lat": 49.336678,
        "long": -123.256117,
        "area":"Lighthouse Park",
        "rating": 3,
        "photo_urls":["https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-james-wheeler-414612.jpg","https://images.pexels.com/photos/1574181/pexels-photo-1574181.jpeg?cs=srgb&dl=pexels-james-wheeler-1574181.jpg","https://images.pexels.com/photos/3882499/pexels-photo-3882499.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"],
        "author":"Ruslan"
    }
    addRecord(collection,bench_params)
    
    cur = db['benches'].find({})

for item in cur:
    print(item)
"""
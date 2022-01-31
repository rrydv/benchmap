from typing import OrderedDict
from pymongo import MongoClient
from bson import json_util
import json
from datetime import datetime
import os
import ssl
uri = os.environ.get("MONGO_DB")


def connect_DB(uri):
    client = MongoClient(uri,ssl_cert_reqs=ssl.CERT_NONE) #change this 
    return client

def add_record(collection, bench_params:dict) -> None:
    dt_obj = datetime.now()
    epoch_sec = int(dt_obj.timestamp())
    bench_params["date_created"] = epoch_sec
    collection.insert_one(bench_params)
    print("success")
    
def fetch_benches() -> list:
    with MongoClient(uri) as client:
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
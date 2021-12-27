from pymongo import MongoClient
uri = "mongodb+srv://cluster0.6ub77.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority"
cert = r"C:\Users\Ruslan\Downloads\X509-cert-157417327393581356.pem"

client = MongoClient(uri,
                     tls=True,
                     tlsCertificateKeyFile=cert)


def connectDB(uri):
    client = MongoClient(uri,tls=True,tlsCertificateKeyFile = cert)
    return client

def add_record():
    pass






if __name__ == "__main__":
    client = connectDB(uri)
    db = client['benchmap']
    collection = db.create_collection("benches")
    cur = db['benches'].find({})

for item in cur:
    print(item)
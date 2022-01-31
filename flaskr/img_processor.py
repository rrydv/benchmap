import boto3
from io import BytesIO
from PIL import Image
import os

AWS_ACCESS_KEY = os.environ.get("AWS_ACCESS_KEY")
AWS_SECRET = os.environ.get("AWS_SECRET")

def resize_image(image, height = 1080):
    """
    resizes image while maintaining aspect ratio.
    params:
    image: 
        type: file
    height:
        type: int
    outputs:
    bytes representation of the image to be used in processing/AWS.
    """
    FIXED_HEIGHT = height
    image = Image.open(image)
    if image.size[0] > FIXED_HEIGHT or image.size[1] > FIXED_HEIGHT:
        height_percent = (FIXED_HEIGHT / float(image.size[1]))
        width_size = int((float(image.size[0]) * float(height_percent)))
        image = image.resize((width_size, FIXED_HEIGHT), Image.NEAREST)
    image = image.convert('RGB')
    #saving into bytes object to upload straight to S3
    image_bytes = BytesIO()
    image.save(image_bytes,"JPEG",optimize=True,quality=85)
    return image_bytes.getvalue()

class AWS:
    
    def __init__(self,AWS_ACCESS_KEY,AWS_SECRET):
        session = boto3.Session(aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET)
        
        REGION_NAME = 'us-west-2'
        
        s3 = session.resource(service_name='s3',region_name=REGION_NAME)
        self.bucket = s3.Bucket('mapbench-photos')
        
        self.rekognition = session.client(service_name='rekognition', region_name=REGION_NAME)
    
    def moderate(self, image_binary):
        response = self.rekognition.detect_moderation_labels(
                    Image={
                    'Bytes':image_binary
                    })

        if not response['ModerationLabels']:
            return True

        else: #need to handle the cases with outputs to propagate error to user
            return False 

    def upload(self, input:BytesIO, uuid:str, name:str) -> str:
        file_path = "photos/" + uuid + "_" + name + ".jpg"
        self.bucket.put_object(Body = input, Key = file_path)
        full_path = f"https://mapbench-photos.s3.us-west-2.amazonaws.com/{file_path}"
        return full_path
        

def process_img(img_input, uuid:str, name:str):
    
    aws = AWS(AWS_ACCESS_KEY=AWS_ACCESS_KEY, AWS_SECRET=AWS_SECRET) # need to handle possible errors here
    
    resized_img = resize_image(img_input)
    if aws.moderate(resized_img):
        result_path = aws.upload(resized_img, uuid, name)
        return result_path
    else:
        return "error!", 403


if __name__ == "__main__":
    print(AWS_SECRET, AWS_ACCESS_KEY)
    import uuid
    str_uuid = str(uuid.uuid4())
    name = "testimage"
    img_input = r"C:\Users\Ruslan\Pictures\Screenshots\2021-12-16 11_36_30-Kamloops Desktop – Geospatial - Desktop Viewer.png"
    process_img(img_input, str_uuid, name)
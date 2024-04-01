import os
import glob
from labelme2yolo import convert

def convert_folder(folder_path):
    json_files = glob.glob(os.path.join(folder_path, "*.json"))
    for file in json_files:
        print(file)
        convert(file)

convert_folder("./dataset")
import sys
import os
import glob
from PIL import Image

def change_image_quality(original_path, change_path, quality):

    # 변환한 결과를 저장할 폴더가 없다면 폴더 만들기
    if not os.path.exists(change_path):
        os.mkdir(change_path)
    
    # 용량을 줄일 파일을 읽어옴
    all_image_list = glob.glob(original_path + "/*.jpg")
    count = 0

    # 파일 용량 줄이기
    for file in all_image_list:
        image = Image.open(file)
        try:
            image.save(change_path + file[8:], quality = quality)
            count += 1
        except:
            print("용량 줄이기 실패")
            sys.exit(0)

    success = False
    if(count == len(all_image_list)):
        success = True

    return success    


original_path = "./before"
change_path = "./after"
isSuccess = change_image_quality(original_path, change_path, 75)

if(isSuccess):
    print("성공")
    

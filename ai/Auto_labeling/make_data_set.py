import os
import shutil
import random
import glob

after_folder_path = "./after/train/images/*.jpg"
after_file_list = glob.glob(after_folder_path)

train_ratio = int(len(after_file_list) * 0.6) # 학습 데이터 비율
valid_ratio = int(len(after_file_list) * 0.2) # 검증 데이터 비율
test_ratio = int(len(after_file_list) * 0.2) # 테스트 데이터 비율

# 정해준 비율 만큼 랜덤으로 파일 리스트 가져오기
valid_file_list = random.sample(after_file_list, valid_ratio)

# 폴더 생성하기
if not os.path.exists("./after/valid") or not os.path.exists("./after/test"):
    os.makedirs("./after/valid")
    os.makedirs("./after/valid/images")
    os.makedirs("./after/valid/labels")

    os.makedirs("./after/test")
    os.makedirs("./after/test/images")
    os.makedirs("./after/test/labels")

# 파일 옮기기
for file in valid_file_list :
    file_name = file[21:-4]
    label_txt_path = "./after/train/labels/" + file_name + ".txt"

    shutil.move(file,"./after/valid/images/")
    shutil.move(label_txt_path,"./after/valid/labels/")


after_file_list = glob.glob(after_folder_path)

# 정해준 비율 만큼 랜덤으로 파일 리스트 가져오기
test_file_list = random.sample(after_file_list, test_ratio)

# 파일 옮기기
for file in test_file_list :
    file_name = file[21:-4]
    label_txt_path = "./after/train/labels/" + file_name + ".txt"

    shutil.move(file,"./after/test/images/")
    shutil.move(label_txt_path,"./after/test/labels/")
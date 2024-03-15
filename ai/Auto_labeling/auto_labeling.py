import os
import glob
import shutil
import time
from ultralytics import YOLO

# 오토 라벨링
def generate_lables(model, file_list):
    
    # YOLO 모델로 예측, 예측 결과를 results에 담기
    results = model(file_list)

    for result in results:

        # 개체가 2개 이상일 경우 오작동을 고려하여 결과 제외 
        if(len(result.boxes) > 1):
            continue
        
        # 개체가 인식되지 않았을 경우 결과 제외
        elif(len(result.boxes) == 0):
            continue

        # 텍스트 파일을 저장할 경로
        label_txt_path = "./train/labels/" + result.path[10:-4] + ".txt"

        # 텍스트 파일 생성
        label_file = open(label_txt_path,"w")
        
        # 분류가 된 이미지 파일 옮기기
        shutil.move(result.path,"./train/images/")

        # 텍스트 파일에 바운딩 박스 정보 넣기
        result.save_txt(label_txt_path)
        label_file.close()

start = time.time() # 시간 측정
img_folder_path = "./pre_img/*.jpg" # 이미지가 있는 폴더 위치
all_file_list = glob.glob(img_folder_path) # 폴더 안에 있는 모든 파일 불러오기

model = YOLO("yolov8s.pt") # YOLO 모델 불러오기

# 폴더 생성하기
if not os.path.exists("train"):
    os.mkdir("train")
    os.makedirs("./train/images")
    os.makedirs("./train/labels")

# 한번에 처리할 이미지 갯수
batch_size = 100

# 배치 사이즈 만큼 오토 라벨링 실시
for i in range(0, len(all_file_list), batch_size):
    batch_files = all_file_list[i : i + batch_size]
    generate_lables(model, batch_files)

end = time.time() # 시간 측정
print(f"{end - start:.2f} sec")


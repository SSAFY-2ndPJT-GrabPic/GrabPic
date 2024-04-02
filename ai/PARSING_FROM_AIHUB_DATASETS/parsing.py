import shutil
import json

# YOLO 좌표 형식에 맞게 계산하기
def convert(img_width, img_height, bbox):
    x_tl, y_tl, w, h = bbox

    dw = 1.0 / img_width
    dh = 1.0 / img_height

    x_center = x_tl + w / 2.0
    y_center = y_tl + h / 2.0

    x = x_center * dw
    y = y_center * dh
    w = w * dw
    h = h * dh

    return x, y, w, h

# 파싱할 json 파일 이름
file = "./labels/gbt_fish_dtset1.json"
# 이미지가 담긴 폴더 이름
image_folder = "./dtset1"

fish_info = {1 : "감성돔", 2 : "조피볼락", 3 : "넙치", 4 : "돌돔", 5 : "참돔"}
fish_labeling_info = {1 : 20, 2 : 21, 3 : 22, 4 : 23, 5 : 24}

# json 파일 열기
with open(file, "r", encoding="UTF8") as f :
    
    # json 파일 로드
    json_data = json.load(f)
    
    # 이미지 파일 이름 정보를 딕셔너리에 저장
    image_dict = dict()
    
    # 이미지 파일 정보 리스트를 json으로 부터 파싱
    image_list = json_data["images"]
    for image in image_list:
        # 파싱한 정보를 딕셔너리에 id - file_name 식으로 파싱
        image_dict[image["id"]] = image["file_name"]

    # annotation 정보를 리스트에 담기
    annotation_list = json_data["annotations"]

    # annotation 정보를 하나씩 꺼내서 yolo txt 파일로 전환
    for annotation in annotation_list:
        
        file_name = image_dict[annotation["image_id"]]
        category_id = annotation["category_id"]
        bbox = annotation["bbox"]
        image_path = image_folder + "/" + file_name[2:]
        txt_file_name = "./" + fish_info[category_id] + "/labels/" + file_name[2:-4] + ".txt"
        after_image_path = "./"+ fish_info[category_id] + "/images/" + file_name[2:]

        with open(txt_file_name, "a") as txt_file:
            
            width = 2704
            height = 1520

            # bbox의 형태를 yolo 방식으로 변환
            x, y, w, h = convert(width, height, bbox)

            # 물고기 종류에 맞는 라벨링 숫자
            new_label_number = fish_labeling_info[category_id]
            new_line = f"{new_label_number} {x} {y} {w} {h} \n"

            # 텍스트 파일에 작성
            txt_file.write(new_line)
        
        txt_file.close()

        shutil.move(image_path, after_image_path)

import json
import glob

# YOLO 좌표 형식에 맞게 계산하기
def convert(width, height, bbox):
    dw = 1. / width
    dh = 1. / height

    x = ((bbox[0][0] + bbox[1][0]) / 2.0) * dw
    y = ((bbox[0][1] + bbox[1][1]) / 2.0) * dh

    w = (bbox[1][0] - bbox[0][0]) * dw
    h = (bbox[1][1] - bbox[0][1]) * dh

    return x, y, w, h


# 모든 json 파일 불러오기
all_json_list = glob.glob(".\labels\*.json")

for file in all_json_list:

    # txt 파일 저장 위치
    label_txt_path = file[:-4] + "txt"

    # txt YOLO 라벨링 파일 만들기
    with open(label_txt_path, 'w') as txt_file:

        with open(file, 'r', encoding='UTF8') as f :
            json_data = json.load(f)

            # width와 height 가져오기
            width = json_data["images"][0]["width"]
            height = json_data["images"][0]["height"]
            new_lines = []

            for annotation in json_data["annotations"]:
            
                # bbox 정보 가져오기
                bbox = annotation["bbox"]

                x, y, w, h = convert(width, height, bbox)
                new_label_number = 3
                new_line = f"{new_label_number} {x} {y} {w} {h} \n"
                new_lines.append(new_line)
        
        # 텍스트 파일 작성
        txt_file.writelines(new_lines)
    
    txt_file.close()
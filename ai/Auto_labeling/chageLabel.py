import glob

label = glob.glob("./after/valid/labels/*.txt")

for label_txt_path in label:

    # 파일을 열기       
    with open(label_txt_path, 'r') as file:
        lines = file.readlines()

    new_lines = []
    new_number = 2
    for line in lines:

        # 각 줄의 처음 등장하는 공백을 기준으로 분리
        parts = line.split(' ', 1)
        
        # 공백이 있다면
        if len(parts) == 2:
            new_line = f"{new_number} {parts[1]}"
            new_lines.append(new_line)
        
        # 공백이 없다면
        else:
            new_lines.append(line)

    with open(label_txt_path, 'w') as file:
        file.writelines(new_lines)


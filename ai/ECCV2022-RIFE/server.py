from flask import Flask, render_template, request
import os
import subprocess
import time
from datetime import datetime

app = Flask(__name__)


@app.route('/')
def page():
    return 'hello'


@app.route('/upload')
def hello_world():
    return render_template('upload.html')


@app.route('/uploader', methods=['POST'])
def uploader_file():
    if request.method == 'POST':
        print(request)
        print(request.form)
        print(request.files)
        # 비디오 아웃풋명 및 디렉토리 네이밍을 위한 파라미터
        pk = request.form['pk']
        # 현재는 현재 시간과 유저네임으로 디렉토리 특정화
        # pk = pk+datetime.now().strftime("%Y%m%d%H%M%S")
        # 디렉토리 생성
        if not os.path.exists(pk):
            os.makedirs(pk)
        # form-data로 받은 이미지 저장
        files = request.files.getlist("file")
        for f in files:
            f.save('./' + pk + '/' + f.filename)

        isFileExist = True;
        while (isFileExist):
            if os.path.exists(pk):
                isFileExist = False;

        # 프레임 보간을 위하여 10장의 이미지를 1초짜리 mp4 파일로 변환
        arg = 'ffmpeg -r 10 -f image2 -i {}/%d.png -s 1920x1080 -c:v libx264 -pix_fmt yuv420p {}/result.mp4 -q:v 0 -q:a 0'.format(
            pk, pk)
        os.system(arg)

        arg = 'python3 inference_video.py --exp=2 --video={}/result.mp4 --output={}/video.mp4'.format(pk, pk)
        os.system(arg)
        # 생성된 비디오로 프레임보간 진행 해당 과정에 시간이 소요되므로 subprocess로 분리
        # subprocess.Popen(args = ['python3', 'inference_video.py', '--exp=2', '--video={}/result.mp4'.format(username), '--output={}/video.mp4'.format(username)])

        # 프레임 보간 결과물이 나오면 해당 결과물을 s3로 전송하는 프로세스 실행
        subprocess.Popen(args=["python3", "watch_and_upload.py", pk])

    return 'upload'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
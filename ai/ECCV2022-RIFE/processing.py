import os
import sys
import subprocess


def main(argv):
    pk = argv[1]

    # 프레임 보간을 위하여 10장의 이미지를 1초짜리 mp4 파일로 변환
    arg = 'ffmpeg -r 5 -f image2 -i {}/%d.jpeg -s 1920x1080 -c:v libx264 -pix_fmt yuv420p {}/result.mp4 -q:v 0 -q:a 0'.format(
        pk, pk)
    os.system(arg)

    arg = 'python3 inference_video.py --exp=2 --video={}/result.mp4 --output={}/video.mp4'.format(pk, pk)
    os.system(arg)

    # ffmpeg -y -i uploads/1558085172925.avi -strict -2 -c:a aac -c:v libx264 -f mp4 uploads/1558085172925.mp4

    arg = 'ffmpeg -y -i {}/video.mp4 -strict -2 -c:a aac -c:v libx264 -f mp4 {}/video2.mp4'.format(pk, pk)
    os.system(arg)

    # 생성된 비디오로 프레임보간 진행 해당 과정에 시간이 소요되므로 subprocess로 분리
    # subprocess.Popen(args = ['python3', 'inference_video.py', '--exp=3', '--video={}/result.mp4'.format(username), '--output={}/video.mp4'.format(username)])

    # 프레임 보간 결과물이 나오면 해당 결과물을 s3로 전송하는 프로세스 실행
    subprocess.Popen(args=["python3", "watch_and_upload.py", pk])


if __name__ == "__main__":
    main(sys.argv)
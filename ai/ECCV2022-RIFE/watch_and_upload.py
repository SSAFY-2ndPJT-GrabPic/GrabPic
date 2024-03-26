import sys
import os
import time
import boto3
from botocore.client import Config
from botocore.exceptions import ClientError

# client = boto3.client(
#     's3',
#     aws_access_key_id=ACCESS_KEY,
#     aws_secret_access_key=SECRET_KEY,
#     aws_session_token=SESSION_TOKEN
# )
# client.upload_file(file_name, bucket, key)

ACCESS_KEY_ID = 'AKIA6P5OPQQMWSF6TLAF'  # s3 관련 권한을 가진 IAM계정 정보
ACCESS_SECRET_KEY = '6CGvDM6UrZZbudWZlsVETSxxXZt0s9PmBv+mVs0U'
BUCKET_NAME = 'grabpic'


def main(argv):
    # 커멘드라인 파라메터 입력
    PK = argv[1]
    file = PK + '/video.mp4'
    isFileExist = True;

    # 해당 파일이 존재하는지 확인
    while (isFileExist):
        if os.path.exists(file):
            isFileExist = False;
            handle_upload_img(file, PK)
    # 작업이 완료되면 디렉토리 삭제
    os.system('sudo rm -rf ' + USERNAME)


def handle_upload_img(f, PK):  # f = 파일명
    data = open(f, 'rb')
    client = boto3.client(
        's3',
        aws_access_key_id=ACCESS_KEY_ID,
        aws_secret_access_key=ACCESS_SECRET_KEY
    )
    # s3 버킷에 업로드 ('local_file', 'upload_name')
    # client.Bucket(BUCKET_NAME).upload_file(f, 'video.mp4')

    client.put_object(Bucket=BUCKET_NAME, Key='frame/' + PK + '.mp4', Body=data)


if __name__ == "__main__":
    main(sys.argv)
package org.grabpic.grabpic.fileUpload.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileUploadServiceImpl implements FileUploadService{

    private final AmazonS3 amazonS3;
    @Value("${cloud.aws.s3.bucketName}")
    private String bucketName; //버킷 이름

    //이름 중복 방지를 위해 랜덤으로 생성
    private String changedImageName(String originName) {
        String random = UUID.randomUUID().toString();
        return random + originName;
    }


    @Override
    public List<String> uploadObjectToS3Many(List<MultipartFile> files) throws IOException {

        // 허용할 MIME 타입들 설정 (이미지, 동영상 파일만 허용하는 경우)
        List<String> allowedMimeTypes = List.of("image/jpeg", "image/png", "image/gif", "video/mp4", "video/webm", "video/ogg", "video/3gpp", "video/x-msvideo", "video/quicktime");

        // 업로드한 파일의 업로드 경로를 담을 리스트
        List<String> Urls = new ArrayList<>();

        for(MultipartFile file : files) {

            // 허용되지 않는 MIME 타입의 파일은 처리하지 않음
            String fileContentType = file.getContentType();
            if (!allowedMimeTypes.contains(fileContentType)) {
                throw new IllegalArgumentException("Unsupported file type");
            }

            ObjectMetadata metadata = new ObjectMetadata(); //메타데이터

            metadata.setContentLength(file.getSize()); // 파일 크기 명시
            metadata.setContentType(fileContentType);   // 파일 확장자 명시

            String originName = file.getOriginalFilename(); //원본 이미지 이름
            String changedName = changedImageName(originName); //새로 생성된 이미지 이름
//            String ext = originName.substring(originName.lastIndexOf(".")); //확장자

            try {
                PutObjectResult putObjectResult = amazonS3.putObject(new PutObjectRequest(
                        bucketName, changedName, file.getInputStream(), metadata
                ).withCannedAcl(CannedAccessControlList.PublicRead));

            } catch (IOException e) {
                log.error("file upload error " + e.getMessage());
                throw new IOException(); //커스텀 예외 던짐.
            }

            Urls.add(amazonS3.getUrl(bucketName, changedName).toString());

        }

        return Urls;
    }

    // 추후 사용을 위한 파일 삭제 코드
//    @Override
//    public boolean deleteObjectToS3Many(List<String> fileUrlList) {
//        try {
//            for (String fileUrl : fileUrlList) {
//                String fileName = URLDecoder.decode(fileUrl.substring(51), StandardCharsets.UTF_8);
//                amazonS3.deleteObject(bucketName, fileName);
//            }
//            return true;
//        } catch (AmazonS3Exception e) {
//            log.error("file delete error " + e.getErrorMessage());
//            return false;
//        }
//
//    }
}

package org.grabpic.grabpic.fileUpload.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.grabpic.grabpic.encyclopedia.db.entity.EncyclopediaEntity;
import org.grabpic.grabpic.encyclopedia.db.repository.EncyclopediaRepository;
import org.grabpic.grabpic.user.config.JWTUtil;
import org.grabpic.grabpic.user.db.entity.UserEntity;
import org.grabpic.grabpic.user.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileUploadServiceImpl implements FileUploadService{

    private final AmazonS3 amazonS3;
    @Value("${cloud.aws.s3.bucketName}")
    private String bucketName; //버킷 이름
    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;
    private final EncyclopediaRepository encyclopediaRepository;

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

    @Override
    public void makeframe(long encyId, MultipartFile[] files) {
        //기본 경로
        String uploadDir = "/home/ubuntu/dir-BE/frame/" + encyId + "/";

        //폴더가 없으면 생성
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // 모든 파일을 반복하여 저장
        for (MultipartFile file : files) {
            String fileName = file.getOriginalFilename();
            try {
                // 지정된 디렉토리에 파일 저장
                file.transferTo(new File(uploadDir + "/" + fileName));
            } catch (IOException e) {
                e.printStackTrace();
                System.out.println(e.getMessage());
            }
        }
        // AI 서버에 보낼 그릇 생성
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        //그릇에 파일 넣음
        for (MultipartFile file : files) {
            String fileName = file.getOriginalFilename();
            File image = new File(uploadDir + "/" + fileName);
            body.add("file", new FileSystemResource(image));
            //boolean result = test.delete();
        }
        //닉네임 전달 내용 포함
        body.add("PK", encyId);
        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        // 요청 엔터티 생성
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        // RestTemplate을 사용하여 POST 요청 전송
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://180.64.174.78:5001/uploader"; // 업로드할 URL
        String response = restTemplate.postForObject(url, requestEntity, String.class);

        // 보간된 파일의 url
        String uploadUrl = "tmp";
        // 파일 URL 저장
        EncyclopediaEntity encyclopedia = encyclopediaRepository.findByEncyclopediaId(encyId);
        encyclopedia.setShortsVideoUrl(uploadUrl);
        encyclopediaRepository.save(encyclopedia);

        //사용한 파일 지우기
        for (MultipartFile file : files) {
            String fileName = file.getOriginalFilename();
            File image = new File(uploadDir + "/" + fileName);
            boolean result = image.delete();
        }
        //사용한 디렉토리 지우기
        File dir = new File(uploadDir);
        boolean dirDel = dir.delete();
    }

    @Override
    public void uploadprofileImage(MultipartFile file, String token) throws IOException {
        // 허용할 MIME 타입들 설정 (이미지, 동영상 파일만 허용하는 경우)
        List<String> allowedMimeTypes = List.of("image/jpg", "image/jpeg", "image/png");

        // 허용되지 않는 MIME 타입의 파일은 처리하지 않음
        String fileContentType = file.getContentType();
        if (!allowedMimeTypes.contains(fileContentType)) {
            throw new IllegalArgumentException("Unsupported file type");
        }

        ObjectMetadata metadata = new ObjectMetadata(); //메타데이터

        metadata.setContentLength(file.getSize()); // 파일 크기 명시
        metadata.setContentType(fileContentType);   // 파일 확장자 명시

        long userId = jwtUtil.getUserId(token);
        String originName = file.getOriginalFilename(); //원본 이미지 이름
        String ext = originName.substring(originName.lastIndexOf(".")); //확장자
        String changedName = "ProfileImage/" + userId + ext;

        try {
            PutObjectResult putObjectResult = amazonS3.putObject(new PutObjectRequest(
                    bucketName, changedName, file.getInputStream(), metadata
            ).withCannedAcl(CannedAccessControlList.PublicRead));

        } catch (IOException e) {
            log.error("file upload error " + e.getMessage());
            throw new IOException(); //커스텀 예외 던짐.
        }

        UserEntity user = userRepository.findByUserId(userId);
        user.setProfileImage(amazonS3.getUrl(bucketName, changedName).toString());
        userRepository.save(user);


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

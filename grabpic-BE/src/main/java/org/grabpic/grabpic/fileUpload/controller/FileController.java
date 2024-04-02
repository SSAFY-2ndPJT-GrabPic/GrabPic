package org.grabpic.grabpic.fileUpload.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.grabpic.grabpic.fileUpload.service.FileUploadService;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/fileupload")
public class FileController {

    private final FileUploadService fileUploadService;

    @PostMapping(value = "/uploads", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> postObjectMany (@RequestParam("file") List<MultipartFile> file) {

        List<String> urlList = new ArrayList<>();
        try {
            urlList = fileUploadService.uploadObjectToS3Many(file);
        } catch (IOException e) {
            log.error("fileUploads Controller error" + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if(urlList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("업로드된 파일이 없습니다.");
        }

        // 성공적인 응답
        return ResponseEntity.status(HttpStatus.OK).body(urlList);

    }

    @PostMapping("/makeframe/{encyId}")
    public ResponseEntity<?> makeframe(@PathVariable long encyId, @RequestBody MultipartFile[] files) {
        fileUploadService.makeframe(encyId, files);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/profileimage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> setprofileimage (@RequestParam("image") MultipartFile file, HttpServletRequest request) {
        try {
            fileUploadService.uploadprofileImage(file, request.getHeader("access"));
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            log.error("profileImageUploads error" + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //나중에 쓸 파일 삭제용 메소드
//    @PostMapping("/deletes")
//    public ResponseEntity<?> deleteObjectMany (@RequestBody List<String> fileList) {
//        try {
//            boolean tmp = fileUploadService.deleteObjectToS3Many(fileList);
//            return ResponseEntity.status(200).body(tmp);
//        } catch (Exception e) {
//            log.error("fileDeletes Controller error" + e.getMessage());
//            return ResponseEntity.status(503).body(e.getMessage());
//        }
//    }

}

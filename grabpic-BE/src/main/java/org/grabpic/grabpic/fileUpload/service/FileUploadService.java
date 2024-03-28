package org.grabpic.grabpic.fileUpload.service;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FileUploadService {

    public List<String> uploadObjectToS3Many(List<MultipartFile> files) throws IOException;
    public void makeframe(long encyId, MultipartFile[] files);

    public void uploadprofileImage(MultipartFile file, String token) throws IOException;

    //파일삭제
//    public boolean deleteObjectToS3Many(List<String> fileUrlList);

}
